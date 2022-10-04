const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const pathToTalkersFile = path.resolve(__dirname, '..', 'talker.json');

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile(pathToTalkersFile);
  res.status(200).json(JSON.parse(talkers));
});

module.exports = router;