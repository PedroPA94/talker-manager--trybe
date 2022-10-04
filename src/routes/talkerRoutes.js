const express = require('express');
const auth = require('../middlewares/auth');
const validateAge = require('../middlewares/validateAge');
const validateName = require('../middlewares/validateName');
const validateRate = require('../middlewares/validateRate');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const { readTalkersFile, addNewTalker, queryTalkers,
        getTalkerById, updateTalker, deleteTalker } = require('../utils/fsUtils');

const router = express.Router();

router.get('/search', auth, async (req, res) => {
  const { q: query } = req.query;
  const queryResults = await queryTalkers(query);
  res.status(200).json(queryResults);
});

router.get('/', async (_req, res) => {
  const talkers = await readTalkersFile();
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await getTalkerById(Number(id));

  return talkerById
  ? res.status(200).json(talkerById)
  : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
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
    const id = await addNewTalker(newTalker);
    res.status(201).json({ ...newTalker, id });
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
    await updateTalker(talkerToUpdate, Number(id));
    res.status(200).json({ ...talkerToUpdate, id: Number(id) });
});

router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    await deleteTalker(Number(id));
    res.status(204).end();
});

module.exports = router;