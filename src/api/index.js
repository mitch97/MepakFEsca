const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-App-Authorization': 'c7KxDmBaQLa6LgBnD7hPwcKXaTo7DWbK',
  'Accept-Language': 'it',
  'X-Accept-Currency': 'EUR',
};

const get = async (url, customHeaders = {}) => {
  const response = await fetch(url, {
    method: 'get',
    headers: { ...headers, ...customHeaders },
  });
  return response.json();
};

const post = async (url, body, customHeaders = {}) => {
  const response = await fetch(url, {
    method: 'post',
    headers: { ...headers, ...customHeaders },
    body: JSON.stringify(body),
  });
  return response.json();
};

const put = async (url, body, customHeaders = {}) => {
  const response = await fetch(url, {
    method: 'put',
    headers: { ...headers, ...customHeaders },
    body: JSON.stringify(body),
  });
  return response.json();
};

export default { get, post, put };

export * from './constant';
