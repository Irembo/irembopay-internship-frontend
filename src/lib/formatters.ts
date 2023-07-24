export const formatToK = (num: number, ignoreZero = false) => {
  if (num === 0) return "0";
  const suffixes = ["", "K", "M", "B"];
  const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
  const scaledNumber = num / Math.pow(10, magnitude * 3);
  const formattedNumber = scaledNumber % 1 === 0 && ignoreZero ? scaledNumber.toFixed(0) : scaledNumber.toFixed(2);
  return formattedNumber + suffixes[magnitude];
};

export const thousandSeparator = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


export const formatDate = (date: string) => {
  // output format: 14 Aug 2021 at 14:00

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  return `${day} ${month} ${year} at ${hour}:${minute}`;
}