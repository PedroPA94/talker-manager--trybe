const fs = require('fs').promises;
const path = require('path');
const generateId = require('./generateId');

const pathToTalkersFile = path.resolve(__dirname, '..', 'talker.json');

const readTalkersFile = async () => {
  try {
    const talkers = await fs.readFile(pathToTalkersFile);
    return JSON.parse(talkers);
  } catch (err) {
    throw new Error(`Erro ao ler arquivo: ${err}`);
  }
};

const writeToTalkersFile = async (talkers) => {
  try {
    await fs.writeFile(pathToTalkersFile, talkers);
  } catch (err) {
    throw new Error(`Erro ao escrever no arquivo: ${err}`);
  }
};

const addNewTalker = async (newTalker) => {
    const talkers = await readTalkersFile();
    const newId = await generateId();
    talkers.push({ ...newTalker, id: newId });
    await writeToTalkersFile(JSON.stringify(talkers));
    return newId;
};

const getTalkerById = async (id) => {
  const talkers = await readTalkersFile();
  const talkerIndex = talkers.findIndex((talker) => talker.id === id);

  if (talkerIndex >= 0) {
    return talkers[talkerIndex];
  }
};

const updateTalker = async (talkerToUpdate, id) => {
  const oldTalkers = await readTalkersFile();
  const filteredTalkers = oldTalkers.filter((talker) => talker.id !== id);
  const updatedTalkers = JSON.stringify([
    ...filteredTalkers,
    { ...talkerToUpdate, id },
  ]);
  await writeToTalkersFile(updatedTalkers);
};

const deleteTalker = async (id) => {
  const oldTalkers = await readTalkersFile();
  const filteredTalkers = oldTalkers.filter((talker) => talker.id !== id);
  await writeToTalkersFile(JSON.stringify(filteredTalkers));
};

const queryTalkers = async (query) => {
  const talkers = await readTalkersFile();

  if (!query) return talkers;

  const filteredTalkers = talkers.filter(({ name }) => name.includes(query));
  return filteredTalkers;
};

module.exports = {
  readTalkersFile,
  addNewTalker,
  getTalkerById,
  updateTalker,
  deleteTalker,
  queryTalkers,
};