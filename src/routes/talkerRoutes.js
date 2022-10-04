const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const auth = require('../middlewares/auth');
const validateAge = require('../middlewares/validateAge');
const validateName = require('../middlewares/validateName');
const validateRate = require('../middlewares/validateRate');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const generateId = require('../utils/generateId');

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

router.post('/',
  auth,
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const newTalker = req.body;
    const talkers = JSON.parse(await fs.readFile(pathToTalkersFile));
    
    const newId = await generateId();

    talkers.push({ ...newTalker, id: newId });
    await fs.writeFile(pathToTalkersFile, JSON.stringify(talkers));

    res.status(201).json({ ...newTalker, id: newId });
});

router.put('/:id',
  auth,
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const talkerToUpdate = req.body;

    const oldTalkers = JSON.parse(await fs.readFile(pathToTalkersFile));

    const filteredTalkers = oldTalkers.filter((talker) => talker.id !== Number(id));
    const updatedTalkers = JSON.stringify([
      ...filteredTalkers,
      { ...talkerToUpdate, id: Number(id) },
    ]);

    await fs.writeFile(pathToTalkersFile, updatedTalkers);

    res.status(200).json({ ...talkerToUpdate, id: Number(id) });
});

router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;

    const oldTalkers = JSON.parse(await fs.readFile(pathToTalkersFile));

    const filteredTalkers = oldTalkers.filter((talker) => talker.id !== Number(id));

    await fs.writeFile(pathToTalkersFile, JSON.stringify(filteredTalkers));

    res.status(204).end();
});

module.exports = router;