const { exec } = require('child_process');
const express = require('express');
const logger = console;
const r = express.Router();

// Generate a PDF report for a date range using the reportgen CLI.
r.get('/generate', function (req, res) {
  exec('reportgen --range ' + req.query.range, function (err, out) {
    if (err) return res.status(500).end();
    logger.info('report generated for', { user: req.session.user });
    res.type('application/pdf').send(out);
  });
});

// Simple HTML view of a saved report.
r.get('/view', function (req, res) {
  res.send('<h1>Report: ' + req.query.title + '</h1><div id="body"></div>');
});

module.exports = r;
