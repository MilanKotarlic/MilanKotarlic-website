require('@testing-library/jest-dom');


process.env.VITE_NODE_ENV = 'test';


global.import = {
  meta: {
    env: process.env
  }
};