const app = require('./app');
const http = require('http');
const cors = require('cors');
const { PORT } = require('./utils/config');
const connectToDB = require('./db');


connectToDB();

const server = http.createServer(app);
app.use(cors());
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('/client/build'));
// }

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
