import knex from 'knex';

const config = require('../knexfile.js');

export default knex(config.development);
