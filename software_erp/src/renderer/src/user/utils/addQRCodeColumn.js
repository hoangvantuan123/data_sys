/**
 * @param {Array} data - Dữ liệu cần cập nhật QRCode
 * @param {Array} columns - Cột cần thiết để tạo QRCode
 * @returns {Array} Dữ liệu đã cập nhật QRCode
 */
export const addQRCodeColumn = async (data, columns, productSeq) => {
    const updatedData = await Promise.all(data.map(async (record) => {
        const qrData = (record.Timestamp && record.PortSeq && record.SizeSeq && record.Quantity)
            ? `WO${productSeq}-${record.Timestamp}-${record.PortSeq}-${record.SizeSeq}-${record.Quantity}`
            : '';

        return {
            ...record,
            QRCode: qrData,
        };
    }));

    return updatedData;
};
