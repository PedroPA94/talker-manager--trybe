const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const pathToTalkersFile = path.resolve(__dirname, '..', 'talker.json');

router.get('/', async (_req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathToTalkersFile));
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile(pathToTalkersFile));
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

  if (talkerIndex >= 0) {
    return res.status(200).json(talkers[talkerIndex]);
  }

  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;