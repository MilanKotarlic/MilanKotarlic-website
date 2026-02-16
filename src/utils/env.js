export const getEnv = () => {
  return {
    VITE_NODE_ENV: process.env.VITE_NODE_ENV,
    VITE_YOUTUBE_API_KEY: process.env.VITE_YOUTUBE_API_KEY
  };
};

export const hasImportMeta = false;