const { Pool } = require('pg');

const PG_URI =
  'postgres://amjetrai:rByp94cVYdQuVGJqdu7cWlPnms_QEVrY@heffalump.db.elephantsql.com/amjetrai';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
