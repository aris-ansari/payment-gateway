export function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  return digits
    .replace(/(.{4})/g, "$1 ")
    .trim();
}