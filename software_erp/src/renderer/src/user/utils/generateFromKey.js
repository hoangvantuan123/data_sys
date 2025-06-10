export function generateFromKeyFunction() {
  const now = new Date();

  const year = String(now.getFullYear()).slice(-2); // 2 số cuối của năm
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const randomSuffix = Math.floor(Math.random() * 90 + 10); 

  return `${year}${month}${day}${hours}${minutes}${seconds}${randomSuffix}`;
}
