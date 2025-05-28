import express from 'express';
import fetch from 'node-fetch';
import Podcast from '../models/Podcast.js';

const router = express.Router();

// Get trending podcasts
router.get('/', async (req, res) => {
  try {
    // Fetch trending podcasts from iTunes API
    const url = 'https://itunes.apple.com/us/rss/toppodcasts/limit=20/json';
    console.log('📡 Fetching trending podcasts from iTunes API...');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`iTunes API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(' Received response from iTunes API');
    
    // Check if we have valid data
    if (!data.feed || !data.feed.entry || !Array.isArray(data.feed.entry)) {
      console.error(' Invalid response format from iTunes API:', data);
      return res.status(404).json({ 
        error: 'No trending podcasts found',
        details: 'Invalid response format from iTunes API'
      });
    }

    console.log(` Found ${data.feed.entry.length} trending podcasts`);

    // Process and store each podcast
    const savedPodcasts = await Promise.all(
      data.feed.entry.map(async (podcast) => {
        try {
          // Safely extract data with fallbacks
          const podcastData = {
            collectionId: podcast.id?.attributes?.['im:id'] || String(Math.random()),
            collectionName: podcast['im:name']?.label || 'Unknown Podcast',
            artistName: podcast['im:artist']?.label || 'Unknown Artist',
            artworkUrl100: podcast['im:image']?.[2]?.label || '/placeholder.svg?height=100&width=100',
            feedUrl: podcast.link?.[1]?.attributes?.href || '',
            genres: podcast.category?.attributes?.term || 'Unknown',
            primaryGenreName: podcast.category?.attributes?.label || 'Unknown',
            description: podcast.summary?.label || podcast['im:name']?.label || 'No description available',
            releaseDate: podcast['im:releaseDate']?.label || new Date().toISOString()
          };

          console.log(` Processing podcast: ${podcastData.collectionName}`);

          // Update if exists, insert if not (upsert)
          const savedPodcast = await Podcast.findOneAndUpdate(
            { collectionId: podcastData.collectionId },
            podcastData,
            { 
              new: true,
              upsert: true,
              setDefaultsOnInsert: true
            }
          );

          console.log(` Saved podcast: ${podcastData.collectionName}`);
          return savedPodcast;
        } catch (podcastError) {
          console.error(' Error processing podcast:', podcastError);
          // Return a minimal valid podcast object to prevent the entire request from failing
          return {
            collectionId: String(Math.random()),
            collectionName: 'Error Processing Podcast',
            artistName: 'Unknown',
            artworkUrl100: '/placeholder.svg?height=100&width=100',
            feedUrl: '',
            genres: 'Unknown',
            primaryGenreName: 'Unknown',
            description: 'Error processing this podcast',
            releaseDate: new Date().toISOString()
          };
        }
      })
    );

    // Filter out any error placeholders
    const validPodcasts = savedPodcasts.filter(podcast => 
      podcast.collectionName !== 'Error Processing Podcast'
    );

    console.log(`✨ Successfully processed ${validPodcasts.length} podcasts`);

    // Return the trending podcasts
    res.json({
      count: validPodcasts.length,
      results: validPodcasts
    });

  } catch (error) {
    console.error(' Trending podcasts error:', error);
    
    if (error.name === 'MongoError') {
      return res.status(500).json({ 
        error: 'Database error occurred',
        details: error.message 
      });
    }
    
    if (error.message.includes('iTunes API')) {
      return res.status(502).json({ 
        error: 'Failed to fetch from iTunes API',
        details: error.message 
      });
    }

    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

export default router; 
