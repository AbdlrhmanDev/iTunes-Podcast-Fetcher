# iTunes Podcast Fetcher

A modern web application that allows users to discover, search, and explore podcasts from the iTunes API. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS.

![iTunes Podcast Fetcher Screenshot](screenshot.png)

## Features

- 🎙️ **Trending Podcasts**: Discover the most popular podcasts across all genres
- 🎧 **Trending Episodes**: Browse trending episodes from various podcasts
- 🔍 **Smart Search**: Search for podcasts by name, artist, or genre
- 🎨 **Genre Browsing**: Explore podcasts by category with a beautiful genre grid
- 📱 **Responsive Design**: Fully responsive UI that works on desktop and mobile
- 🌙 **Dark Mode**: Modern dark theme for comfortable viewing
- ⚡ **Real-time Updates**: Live data from the iTunes API

## Tech Stack

### Frontend
- **React**: UI library with hooks for state management
- **Next.js**: React framework for server-side rendering and routing
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful, consistent icons
- **Shadcn/ui**: Reusable UI components

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: Database for caching and storing podcast data
- **iTunes API**: Source of podcast data

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/itunes-podcast-fetcher.git
   cd itunes-podcast-fetcher
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the backend directory:
   ```env
   PORT=3002
   MONGODB_URI=your_mongodb_connection_string
   ITUNES_API_BASE_URL=https://itunes.apple.com
   ```

4. **Start the development servers**

   In the backend directory:
   ```bash
   npm run dev
   ```

   In the frontend directory:
   ```bash
   npm run dev
   ```

   The application will be available at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3002

## Project Structure

```
itunes-podcast-fetcher/
├── frontend/                # Next.js frontend application
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── constants/         # Application constants
│
├── backend/                # Express.js backend application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── services/      # Business logic
│   └── tests/             # Backend tests
│
└── README.md              # Project documentation
```

## API Endpoints

The backend provides the following endpoints:

- `GET /`: Health check endpoint
- `GET /trending`: Get trending podcasts
- `GET /episodes`: Get trending episodes
- `GET /search?term=...`: Search podcasts
- `GET /genres`: Get available podcast genres

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html) for providing podcast data
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework 