export const addCommasToAnumber = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatCurrency = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const isValidNumberInput = (inputString: string) => {
  const pattern = /^[0-9.,]*$/;
  return pattern.test(inputString);
};
