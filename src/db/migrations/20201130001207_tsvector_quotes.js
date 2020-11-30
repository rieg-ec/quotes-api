
const TOKEN_COLUMN = 'body_ts_vector';

const ADD_COLUMN = `ALTER TABLE quotes
                    ADD ${TOKEN_COLUMN} TSVECTOR;`;

const DROP_COLUMN = `ALTER TABLE quotes DROP ${TOKEN_COLUMN};`;

const UPDATE_TOKEN = `
  UPDATE quotes
  SET ${TOKEN_COLUMN} = to_tsvector(quotes.body);`;

const ON_INSERT = `
  CREATE TRIGGER quotes_vector_insert
  BEFORE INSERT ON quotes
  FOR EACH ROW
  EXECUTE PROCEDURE
    tsvector_update_trigger(${TOKEN_COLUMN}, 'pg_catalog.english', body);`;

const ON_UPDATE = `
  CREATE TRIGGER quotes_vector_update
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  WHEN (OLD.body IS DISTINCT FROM NEW.body)
  EXECUTE PROCEDURE
    tsvector_update_trigger(${TOKEN_COLUMN}, 'pg_catalog.english', body);`;

const DROP_INSERT_TRIGGER = `
  DROP TRIGGER quotes_vector_insert ON quotes;`;

const DROP_UPDATE_TRIGGER = `
  DROP TRIGGER quotes_vector_update ON quotes;`;

exports.up = async function(knex) {
  await knex.raw(ADD_COLUMN);
  await knex.raw(UPDATE_TOKEN);
  await knex.raw(ON_INSERT);
  await knex.raw(ON_UPDATE);
};

exports.down = async function(knex) {
  await knex.raw(DROP_COLUMN);
  await knex.raw(DROP_INSERT_TRIGGER);
  await knex.raw(DROP_UPDATE_TRIGGER);
};
