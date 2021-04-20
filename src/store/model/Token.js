const TokenSchema = {
  name: 'Token',
  properties: {
    id: 'string',
    token: 'string',
    user: 'string',
  },
  primaryKey: 'id',
};
export default TokenSchema;
