import express from 'express';
import fetch from 'node-fetch';
import Podcast from '../models/Podcast.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { term } = req.query;

  if (!term || term.trim() === '') {
    return res.status(400).json({ error: 'Search term is required and cannot be empty' });
  }

  try {
    const url = `https://itunes.apple.com/search?media=podcast&term=${encodeURIComponent(term)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`iTunes API responded with status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      return res.status(404).json({ error: 'No podcast results found', term });
    }

    console.log(` Found ${data.results.length} podcasts from iTunes API`);

    const savedPodcasts = await Promise.all(
      data.results.map(async (podcast) => {
        console.log(` Processing podcast: ${podcast.collectionName}`);
        
        const podcastData = {
          wrapperType: podcast.wrapperType,
          kind: podcast.kind,
          artistId: podcast.artistId,
          collectionId: podcast.collectionId,
          trackId: podcast.trackId,
          artistName: podcast.artistName,
          collectionName: podcast.collectionName,
          trackName: podcast.trackName,
          collectionCensoredName: podcast.collectionCensoredName,
          trackCensoredName: podcast.trackCensoredName,
          description: podcast.description || podcast.collectionName,
          artistViewUrl: podcast.artistViewUrl,
          collectionViewUrl: podcast.collectionViewUrl,
          feedUrl: podcast.feedUrl,
          trackViewUrl: podcast.trackViewUrl,
          artworkUrl30: podcast.artworkUrl30,
          artworkUrl60: podcast.artworkUrl60,
          artworkUrl100: podcast.artworkUrl100,
          artworkUrl600: podcast.artworkUrl600,
          collectionPrice: podcast.collectionPrice,
          trackPrice: podcast.trackPrice,
          collectionHdPrice: podcast.collectionHdPrice,
          releaseDate: podcast.releaseDate,
          collectionExplicitness: podcast.collectionExplicitness,
          trackExplicitness: podcast.trackExplicitness,
          trackCount: podcast.trackCount,
          trackTimeMillis: podcast.trackTimeMillis,
          country: podcast.country,
          currency: podcast.currency,
          primaryGenreName: podcast.primaryGenreName,
          contentAdvisoryRating: podcast.contentAdvisoryRating,
          genreIds: podcast.genreIds,
          genres: podcast.genres
        };

        try {
          console.log(` Attempting to save podcast: ${podcast.collectionName} (ID: ${podcast.collectionId})`);
          const saved = await Podcast.findOneAndUpdate(
            { collectionId: podcast.collectionId },
            podcastData,
            {
              new: true,
              upsert: true,
              setDefaultsOnInsert: true
            }
          );
          console.log(` Successfully saved podcast: ${podcast.collectionName}`);
          return saved;
        } catch (saveError) {
          console.error(` Error saving podcast ${podcast.collectionName}:`, saveError);
          throw saveError;
        }
      })
    );

    console.log(` Successfully saved ${savedPodcasts.length} podcasts to MongoDB`);

    res.json({
      count: savedPodcasts.length,
      term,
      results: savedPodcasts
    });

  } catch (error) {
    console.error(' Search error:', error);

    if (error.name === 'MongoError') {
      return res.status(500).json({ error: 'Database error', details: error.message });
    }

    if (error.message.includes('iTunes API')) {
      return res.status(502).json({ error: 'Failed to fetch from iTunes API', details: error.message });
    }

    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

export default router;
