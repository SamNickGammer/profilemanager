const mongoose = require('mongoose');
const { MONGODB_URI: url } = require('./utils/config');
// url =
//   'mongodb+srv://samnick:57489Raj@mernproject.erb1pv0.mongodb.net/?retryWrites=true&w=majority';
const connectToDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(`Sorry! Error while connecting to MongoDB: `, error.message);
  }
};

module.exports = connectToDB;
