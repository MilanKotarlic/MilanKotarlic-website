const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

class YouTubeService {

  static async getChannelByHandle(handle) {
    try {
      const response = await fetch(
        `${BASE_URL}/channels?part=snippet,contentDetails&forHandle=${handle}&key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch channel data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching channel:', error);
      throw error;
    }
  }

  static async getUploadsPlaylistId(channelId) {
    try {
      const response = await fetch(
        `${BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch channel details');
      }
      
      const data = await response.json();
      return data.items[0].contentDetails.relatedPlaylists.uploads;
    } catch (error) {
      console.error('Error fetching uploads playlist:', error);
      throw error;
    }
  }

  static async getPlaylistVideos(playlistId, maxResults = 12) {
    try {
      const response = await fetch(
        `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch playlist videos');
      }
      
      const data = await response.json();
      
      return data.items.map(item => ({
        id: item.id,
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt
      }));
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
      throw error;
    }
  }

  static async getChannelUploads(channelHandle = 'TheMilanKotarlic') {
    try {
      const channelData = await this.getChannelByHandle(channelHandle);
      
      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('Channel not found');
      }

      const channelId = channelData.items[0].id;
      
      const uploadsPlaylistId = await this.getUploadsPlaylistId(channelId);
      
      const videos = await this.getPlaylistVideos(uploadsPlaylistId);
      
      return videos;
    } catch (error) {
      console.error('Error getting channel uploads:', error);
      throw error;
    }
  }

  static async getVideoDetails(videoId) {
    try {
      const response = await fetch(
        `${BASE_URL}/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch video details');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching video details:', error);
      throw error;
    }
  }
}

export default YouTubeService;