const ucfirst = value => {
  if (!value || value === '') return '';
  return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
};

export { ucfirst };
