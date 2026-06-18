const { getDB } = require('../config/db');

const COLLECTION = 'diretores';

function getCollection() {
  return getDB().collection(COLLECTION);
}

module.exports = { getCollection };
