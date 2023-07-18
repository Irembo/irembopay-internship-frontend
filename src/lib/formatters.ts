export const formatToK = (num: number) => {
  const suffixes = ["", "K", "M", "B"];
  const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
  const scaledNumber = num / Math.pow(10, magnitude * 3);
  const formattedNumber = scaledNumber.toFixed(2);
  return formattedNumber + suffixes[magnitude];
};
