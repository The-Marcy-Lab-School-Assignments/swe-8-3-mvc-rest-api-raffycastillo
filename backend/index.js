const express = require('express');
const path = require('path');

const {
  serveEntries,
  serveEntry,
  createEntry,
  updateEntry,
  deleteEntry
} = require('./controllers/entryControllers');

const app = express();
const pathToFrontendDist = path.join(__dirname, '../frontend/dist');

////////////////////////
// Middleware
////////////////////////

const serveStatic = express.static(pathToFrontendDist);
const parseJSON = express.json();

// logging
app.use((req, res, next) => {
  const time = (new Date()).toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
});
app.use(serveStatic);
app.use(parseJSON);

////////////////////////
// Endpoints
////////////////////////

app.get('/api/entries', serveEntries);
app.get('/api/entries/:id', serveEntry);
app.post('/api/entries', createEntry);
app.patch('/api/entries/:id', updateEntry);
app.delete('/api/entries/:id', deleteEntry);



const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
