require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const PORT = process.env.PORT || 3005;
const MONGODB_URI =
  'mongodb+srv://samnick:57489Raj@mernproject.erb1pv0.mongodb.net/?retryWrites=true&w=majority';
const SECRET = process.env.SECRET;
const UPLOAD_PRESET = 'mernprofiler' || 'ml_default';

cloudinary.config({
  cloud_name: 'samnickgammer',
  api_key: '583196398221186',
  api_secret: 'HnSZ_AJ44B5HLmFeFeBZD3jU4C8',
});

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  cloudinary,
  UPLOAD_PRESET,
};
