const express = require('express');
const path = require('path');

// Instead of defining all of the controllers in this file, we've moved them to their own folder
const {
  serveEntries,
  serveEntry,
  createEntry,
  updateEntry,
  deleteEntry
} = require('./controllers/entryControllers');

const app = express();
// const pathToFrontendDist = path.join(__dirname, '../frontend/dist');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

// const serveStatic = express.static(pathToFrontendDist);

// A new middleware has appeared!
// This parses incoming requests with JSON data in the body
// Access the data using `req.body`
const parseJSON = express.json();

app.use(logRoutes);   // Print out every incoming request
// app.use(serveStatic); // Serve static public/ content
app.use(parseJSON);   // Parses request body JSON

////////////////////////
// Endpoints
////////////////////////

app.get('/api/entries', serveEntries);
app.get('/api/entries/:id', serveEntry);
app.post('/api/entries', createEntry);
app.patch('/api/entries/:id', updateEntry);
app.delete('/api/entries/:id', deleteEntry);

// app.get('*', (req, res, next) => {
//   if (req.originalUrl.startsWith('/api')) return next();
//   res.sendFile(pathToFrontendDist);
// });


const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
