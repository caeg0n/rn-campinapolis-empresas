import accounting from 'accounting';

export const formatCurrency = (
  amount: number,
  minimumFractionDigits = 2,
  symbol = 'R$',
) => {
  try {
    return accounting.formatMoney(amount, symbol, minimumFractionDigits);
  } catch (error) {}
};
