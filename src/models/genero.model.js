const { getDB } = require('../config/db');

const COLLECTION = 'generos';

function getCollection() {
  return getDB().collection(COLLECTION);
}

module.exports = { getCollection };
