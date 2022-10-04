const fs = require('fs').promises;
const path = require('path');

const pathToTalkersFile = path.resolve(__dirname, '..', 'talker.json');

const generateId = async (value) => {
  const talkers = value ? [] : JSON.parse(await fs.readFile(pathToTalkersFile)); // evita novas leituras na recursão

  let newId = (value || talkers.length) + 1;

  if (talkers.some(({ id }) => id === newId)) { // para garantir id inexistente
    newId = generateId(newId);
  }

  return newId;
};

module.exports = generateId;