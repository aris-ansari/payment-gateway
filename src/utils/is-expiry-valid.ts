export function isExpiryValid(value: string) {
  if (!/^\d{2}\/\d{2}$/.test(value)) {
    return false;
  }

  const [monthString, yearString] =
    value.split("/");

  const month = Number(monthString);
  const year = Number(`20${yearString}`);

  if (month < 1 || month > 12) {
    return false;
  }

  const now = new Date();

  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (year < currentYear) {
    return false;
  }

  if (
    year === currentYear &&
    month < currentMonth
  ) {
    return false;
  }

  return true;
}