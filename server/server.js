const express = require('express');
const path = require('path');

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;


// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // basic get request to get index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
})


// handle request for static files
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../client')));


// define route handlers


// catch-all route handler for any requests to an unknown route
app.use((req, res) => {
  res.status(404).send('404 Errors');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middlzeware error',
    status: 400,
    message: { err: 'An error occurred. In global error handler' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;