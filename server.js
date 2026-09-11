require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const problemsRouter = require('./routes/problems');
const submissionsRouter = require('./routes/submissions');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true })); // parse form submissions
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve CSS/JS

// Routes
app.get('/', (req, res) => res.redirect('/problems'));
app.use('/problems', problemsRouter);       // handles GET /problems, GET /problems/:id, POST /problems/:id/submit
app.use('/submissions', submissionsRouter); // handles GET /submissions/:id

// Start server after DB connects
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
