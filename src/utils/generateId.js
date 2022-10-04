const fs = require('fs').promises;
const path = require('path');

const pathToTalkersFile = path.resolve(__dirname, '..', 'talker.json');

const generateId = async (value) => {
  const talkers = JSON.parse(await fs.readFile(pathToTalkersFile));

  const numberOfTalkers = talkers.length;

  let newId = (value || numberOfTalkers) + 1;

  if (talkers.some(({ id }) => id === newId)) {
    newId = generateId(newId);
  }

  return newId;
};

module.exports = generateId;