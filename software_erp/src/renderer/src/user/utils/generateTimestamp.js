/**
 * Tạo timestamp ngắn gọn theo định dạng YYMMDD-HHMMSS-mmm-Row
 * @param {number} rowIndex - Chỉ mục hàng để đảm bảo duy nhất
 * @returns {string} Timestamp duy nhất
 */
export const generateShortTimestamp = (rowIndex) => {
  const now = new Date();

  const year = String(now.getFullYear()).slice(2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  const rowSuffix = Number.isInteger(rowIndex) && rowIndex >= 0 ? `-R${rowIndex}` : "";

  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${rowSuffix}`;
};


export function generateProdQRID(prodID, rowIndex) {
  const now = new Date();

  const pad = (num, size = 2) => num.toString().padStart(size, '0');

  const timestamp =
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds());

  const indexStr = pad(rowIndex);

  return `PO-${prodID}-${timestamp}-${indexStr}`;
}
