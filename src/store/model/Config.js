const ConfigSchema = {
  name: 'Config',
  properties: {
    key: 'string',
    value: 'string?',
  },
  primaryKey: 'key',
};
export default ConfigSchema;
