import Realm from 'realm';
import schema from './model';

const schemaVersion = 2;
let connection;
Realm.open({ schemaVersion, schema }).then(
  dbConnection => (connection = dbConnection),
);

const insert = (schemaName, value) => {
  let obj;
  connection.write(() => {
    obj = connection.create(schemaName, value);
  });
  return obj;
};

const insertMany = (schemaName, values) => {
  const objs = [];
  connection.write(() => {
    values.forEach(value => objs.push(connection.create(schemaName, value)));
  });
  return objs;
};

const find = (schemaName, query = undefined) => {
  let queryResult = connection.objects(schemaName);
  if (query) queryResult = queryResult.filtered(query);

  return queryResult;
};

const findFirst = (schemaName, query = undefined) => {
  let queryResult = connection.objects(schemaName);
  if (query) queryResult = queryResult.filtered(query);

  return queryResult && queryResult.length ? queryResult[0] : undefined;
};

// DOC: value: Coppia chiave-valore
const update = (schemaName, query, value) => {
  const values = find(schemaName, query);

  const objs = [];
  connection.write(() => {
    values.forEach(valueObj => {
      Object.keys(value).forEach(key => {
        valueObj[key] = value[key];
        objs.push(valueObj);
      });
    });
  });
  return objs;
};

const remove = (schemaName, query = undefined) => {
  const values = find(schemaName, query);

  connection.write(() => {
    values.forEach(value => connection.delete(value));
  });
  return;
};

export default { insert, insertMany, find, findFirst, update, remove };
