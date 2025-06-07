# TikTok Clone - Infinite Scroll Implementation

##  Overview

This project implements **infinite scroll functionality** in a TikTok-style application using **TanStack Query (React Query)** and **cursor-based pagination**. The implementation delivers a smooth, real-time content loading experience while maintaining optimal performance and user experience.

## Key Concepts

### Pagination Strategies

| Strategy | Implementation | Pros | Cons | Use Case |
|----------|---------------|------|------|----------|
| **Offset-based ❌** | Uses page numbers (`page`, `limit`) | Simple to implement | Prone to inconsistency with dynamic data | Static content |
| **Cursor-based ✅** | Uses unique ID as reference (`cursor`) | Stable, efficient, consistent | Slightly more complex | Real-time feeds |

###  TanStack Query (React Query)

- **`useInfiniteQuery`** - Specialized hook for handling paginated data
- **Automatic State Management** - Built-in cache, loading, and error states
- **DevTools Integration** - Query inspection and debugging capabilities
- **Background Refetching** - Keeps data fresh automatically

###  Intersection Observer API

- **Efficient Detection** - Monitors when user reaches bottom of list
- **Performance Optimized** - More efficient than traditional scroll listeners
- **Automatic Triggering** - Seamlessly triggers data fetching

##  Backend Implementation

### Infinite Video Feed Endpoint

**Route:** `GET /api/videos`

```javascript
const getAllVideos = async (req, res) => {
  const { cursor, limit = 10 } = req.query;
  
  const videos = await prisma.video.findMany({
    take: parseInt(limit) + 1, // Fetch one extra to check if more exist
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0, // Skip the cursor item itself
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      likes: true,
      comments: true
    }
  });
  
  const hasNextPage = videos.length > limit;
  
  res.json({
    videos: hasNextPage ? videos.slice(0, -1) : videos,
    nextCursor: hasNextPage ? videos[videos.length - 1].id : null,
    hasNextPage
  });
};
```

### Following Feed Endpoint

**Route:** `GET /api/videos/following`

Similar implementation to the main feed, but filtered by users the current user follows:

```javascript
const getFollowingVideos = async (req, res) => {
  const { cursor, limit = 10 } = req.query;
  const userId = req.user.id; // From auth middleware
  
  const videos = await prisma.video.findMany({
    take: parseInt(limit) + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    where: {
      user: {
        followers: {
          some: { followerId: userId }
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      likes: true,
      comments: true
    }
  });
  
  const hasNextPage = videos.length > limit;
  
  res.json({
    videos: hasNextPage ? videos.slice(0, -1) : videos,
    nextCursor: hasNextPage ? videos[videos.length - 1].id : null,
    hasNextPage
  });
};
```

##  Frontend Implementation

###  Step 1: Install Dependencies

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

###  Step 2: Setup Query Client Provider

```javascript
// src/app/layout.js or src/main.js
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000, // 1 minute
        cacheTime: 300000, // 5 minutes
        retry: 3,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

###  Step 3: Create Video Service

```javascript
// src/services/videoService.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchVideos = async ({ pageParam = null }) => {
  const url = new URL(`${API_BASE_URL}/api/videos`);
  
  if (pageParam) {
    url.searchParams.append('cursor', pageParam);
  }
  url.searchParams.append('limit', '10');
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to load videos');
  }
  
  return response.json();
};

export const fetchFollowingVideos = async ({ pageParam = null }) => {
  const url = new URL(`${API_BASE_URL}/api/videos/following`);
  
  if (pageParam) {
    url.searchParams.append('cursor', pageParam);
  }
  url.searchParams.append('limit', '10');
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to load following videos');
  }
  
  return response.json();
};
```

###  Step 4: Implement useInfiniteQuery Hook

```javascript
// src/hooks/useInfiniteVideos.js
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchVideos, fetchFollowingVideos } from '../services/videoService';

export const useInfiniteVideos = (feedType = 'all') => {
  return useInfiniteQuery({
    queryKey: ['videos', feedType],
    queryFn: feedType === 'following' ? fetchFollowingVideos : fetchVideos,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 30000, // 30 seconds
    cacheTime: 300000, // 5 minutes
  });
};
```

### 📱 Step 5: Video Feed Component

```javascript
// src/components/VideoFeed.js
import { useEffect, useRef } from 'react';
import { useInfiniteVideos } from '../hooks/useInfiniteVideos';
import VideoCard from './VideoCard';

const VideoFeed = ({ feedType = 'all' }) => {
  const loadMoreRef = useRef(null);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteVideos(feedType);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into single array
  const videos = data?.pages?.flatMap(page => page.videos) || [];

  if (isLoading) {
    return <div className="loading-spinner">Loading videos...</div>;
  }

  if (isError) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <div className="video-feed">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
      
      {/* Load more trigger */}
      <div 
        ref={loadMoreRef}
        className="load-more-trigger"
        style={{ height: '20px', margin: '20px 0' }}
      >
        {isFetchingNextPage && (
          <div className="loading-more">Loading more videos...</div>
        )}
      </div>
      
      {!hasNextPage && videos.length > 0 && (
        <div className="end-message">You've reached the end!</div>
      )}
    </div>
  );
};

export default VideoFeed;
```

### Step 6: Video Card Component

```javascript
// src/components/VideoCard.js
const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <div className="video-header">
        <img 
          src={video.user.avatar || '/default-avatar.png'} 
          alt={video.user.username}
          className="user-avatar"
        />
        <div className="user-info">
          <h3>{video.user.username}</h3>
          <p>{video.description}</p>
        </div>
      </div>
      
      <video 
        src={video.videoUrl}
        className="video-player"
        controls
        preload="metadata"
      />
      
      <div className="video-stats">
        <span>❤️ {video.likes?.length || 0}</span>
        <span>💬 {video.comments?.length || 0}</span>
      </div>
    </div>
  );
};

export default VideoCard;
```

##  Styling (Optional)

```css
/* src/styles/VideoFeed.css */
.video-feed {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.video-card {
  margin-bottom: 30px;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.video-header {
  display: flex;
  align-items: center;
  padding: 15px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.video-player {
  width: 100%;
  max-height: 500px;
}

.video-stats {
  display: flex;
  gap: 20px;
  padding: 15px;
}

.loading-spinner,
.loading-more,
.end-message {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error-message {
  text-align: center;
  padding: 20px;
  color: #e74c3c;
  background: #fdf2f2;
  border-radius: 8px;
  margin: 20px;
}
```

##  Usage Examples

### Basic Implementation

```javascript
// src/pages/Home.js
import VideoFeed from '../components/VideoFeed';

const HomePage = () => {
  return (
    <div>
      <h1>TikTok Clone</h1>
      <VideoFeed feedType="all" />
    </div>
  );
};
```

### Following Feed

```javascript
// src/pages/Following.js
import VideoFeed from '../components/VideoFeed';

const FollowingPage = () => {
  return (
    <div>
      <h1>Following</h1>
      <VideoFeed feedType="following" />
    </div>
  );
};
```

##  Testing

### Testing Infinite Scroll

```javascript
// src/__tests__/VideoFeed.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VideoFeed from '../components/VideoFeed';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

test('loads initial videos', async () => {
  const queryClient = createTestQueryClient();
  
  render(
    <QueryClientProvider client={queryClient}>
      <VideoFeed />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
```

## ⚡ Performance Optimizations

### 1. Video Lazy Loading

```javascript
const VideoCard = ({ video }) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef}>
      {isVisible ? (
        <video src={video.videoUrl} controls />
      ) : (
        <div className="video-placeholder">Video will load when visible</div>
      )}
    </div>
  );
};
```

### 2. Query Optimization

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      cacheTime: 300000, // 5 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

##  Troubleshooting

### Common Issues

1. **Videos not loading infinitely**
   - Check if `hasNextPage` is correctly implemented
   - Verify Intersection Observer is properly attached
   - Ensure backend returns correct `nextCursor`

2. **Performance issues**
   - Implement video lazy loading
   - Reduce initial load size
   - Add query caching

3. **Stale data**
   - Adjust `staleTime` in Query Client
   - Implement proper cache invalidation
   - Use background refetching

##  Features Implemented

- Seamless infinite scrolling
-  Efficient cursor-based pagination
-  Automatic loading state management
-  Error handling and retry logic
-  Background data refetching
-  Query caching and optimization
- Intersection Observer integration
- Following feed support

##  Next Steps

- [ ] Add video autoplay when in viewport
- [ ] Implement pull-to-refresh
- [ ] Add video upload functionality
- [ ] Implement real-time likes/comments
- [ ] Add user profiles and following system
- [ ] Implement video sharing features

##  API Documentation

### Video Object Structure

```typescript
interface Video {
  id: string;
  videoUrl: string;
  description: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  likes: Array<{
    id: string;
    userId: string;
  }>;
  comments: Array<{
    id: string;
    text: string;
    userId: string;
  }>;
}
```

### API Response Structure

```typescript
interface VideosResponse {
  videos: Video[];
  nextCursor: string | null;
  hasNextPage: boolean;
}
```

---

