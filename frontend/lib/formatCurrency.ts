export const formatRupiah = (value: number): string => {
  let reverse = value.toString().split("").reverse().join("");
  let three = reverse.match(/\d{1,3}/g);
  let result = three?.join(".").split("").reverse().join("");

  return "Rp" + result || "Rp0";
};
