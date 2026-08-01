const express = require('express');
const users = require('./routes/users');
const reports = require('./routes/reports');
const app = express();

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) return res.status(401).json({ error: 'unauthorized' });
  next();
}

app.use('/users', users(requireAuth));
app.use('/reports', requireAuth, reports);
app.listen(3000);
