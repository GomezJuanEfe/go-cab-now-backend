
export const usdFormat = (num: number) => {
  const numberWithDecimals: any = (num / 100).toFixed(2);
  const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  return usd.format(numberWithDecimals);
};

export function formatTableDate(inputDate: Date) {
  const options: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  const formatedDate = new Date(inputDate).toLocaleDateString('en-US', options);
  return formatedDate;
}

