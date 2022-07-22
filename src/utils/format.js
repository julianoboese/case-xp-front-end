export const formatMoney = (price) => Number(price).toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL',
});

export const formatChange = (change) => {
  const splitChange = change.toString().split('.');
  if (!splitChange[1]) return `${splitChange[0]},00%`;
  if (splitChange[1].length === 1) return `${splitChange.join(',')}0%`;
  return `${splitChange.join(',')}%`;
};
