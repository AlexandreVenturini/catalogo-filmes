const { getDB } = require('../config/db');

const COLLECTION = 'filmes';

function getCollection() {
  return getDB().collection(COLLECTION);
}

module.exports = { getCollection };
