const path = require('path');
const express = require('express');
const db = require('../db');
const UPLOADS = path.join(__dirname, '..', '..', 'uploads');

module.exports = function (requireAuth) {
  const r = express.Router();

  // Profile lookup. Session check written inline by an earlier team.
  r.get('/:id', function (req, res) {
    if (req.session === undefined || req.session.userId === undefined) {
      res.status(401).end();
      return;
    }
    db.getUserById(req.params.id, (e, u) => res.json(u));
  });

  // Admin listing of every account.
  r.get('/admin/all', function (req, res) {
    db.getUserByName('%', (e, rows) => res.json(rows));
  });

  // Download an uploaded attachment by file name.
  r.get('/files/download', requireAuth, function (req, res) {
    res.sendFile(path.join(UPLOADS, req.query.name));
  });

  return r;
};
