import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema({
  wrapperType: String,
  kind: String,
  artistId: Number,
  collectionId: { type: Number, unique: true, index: true },
  trackId: Number,

  artistName: String,
  collectionName: String,
  trackName: String,
  collectionCensoredName: String,
  trackCensoredName: String,
  description: String,

  artistViewUrl: String,
  collectionViewUrl: String,
  feedUrl: String,
  trackViewUrl: String,

  artworkUrl30: String,
  artworkUrl60: String,
  artworkUrl100: String,
  artworkUrl600: String,

  collectionPrice: Number,
  trackPrice: Number,
  collectionHdPrice: Number,

  releaseDate: Date,

  collectionExplicitness: String,
  trackExplicitness: String,

  trackCount: Number,
  trackTimeMillis: Number,

  country: String,
  currency: String,
  primaryGenreName: String,
  contentAdvisoryRating: String,

  genreIds: [String],
  genres: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// تحسين البحث النصي
podcastSchema.index({ 
  collectionName: 'text', 
  artistName: 'text',
  description: 'text',
  genres: 'text'
}, {
  weights: {
    collectionName: 10,
    artistName: 5,
    description: 3,
    genres: 2
  }
});

// Add a method to find similar podcasts
podcastSchema.methods.findSimilar = async function() {
  return await this.model('Podcast').find({
    _id: { $ne: this._id },
    $or: [
      { genres: { $in: this.genres } },
      { primaryGenreName: this.primaryGenreName }
    ]
  })
  .sort({ createdAt: -1 })
  .limit(4);
};

const Podcast = mongoose.model('Podcast', podcastSchema);
export default Podcast;
