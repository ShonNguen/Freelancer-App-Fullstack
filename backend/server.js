const express = require("express");
const cors = require("cors");
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/error.middleware');
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
// app.use('/projects', express.static('projects')); 
// app.use(express.urlencoded({ extended: false }));

app.use('/api/jobs', require('./routes/jobs.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/projects', require('./routes/project.routes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`)); 