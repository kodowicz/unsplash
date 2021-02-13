import { createApi } from 'unsplash-js';

const APP_ACCESS_KEY = 'HJWw8WU-URUGJcX2hphO8-X8YgWcKSJhb7R69tHSXEw';
const API_SECRET = 'SHnH-JmUxJSTeBOiOsDonELCgM3b0-QZ4-JZ8Fzq_dc';

const unsplash = createApi({
  accessKey: APP_ACCESS_KEY,
  secret: API_SECRET
});

export default unsplash;
