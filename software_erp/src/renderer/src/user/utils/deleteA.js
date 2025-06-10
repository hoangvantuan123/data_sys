export const deleteDataSheetA = async (
    getSelectedRowsFn,
    data,
    setData,
    setNumRows,
    resetTable,
    editedRows,
    setEditedRows,
    idKey = 'Id'
) => {
    const selectedRows = getSelectedRowsFn();

    // 🔥 Chỉ lấy các dòng có Status === 'A'
    const rowsWithStatusA = selectedRows.filter((row) => row.Status === 'A');

    if (rowsWithStatusA.length === 0) {
        return { success: false, message: 'Không có dữ liệu nào cần xóa!' };
    }

    try {
        const idsWithStatusA = rowsWithStatusA.map((row) => row[idKey]);

        const remainingRows = data.filter((row) => !idsWithStatusA.includes(row[idKey]));

        const remainingEditedRows = editedRows.filter(
            (editedRow) => !idsWithStatusA.includes(editedRow.updatedRow.Id)
        );

        setEditedRows(remainingEditedRows);
        setData(remainingRows);
        setNumRows(remainingRows.length);
        resetTable();

        return { success: true, message: 'Xóa thành công!' };
    } catch (error) {
        return { success: false, message: 'Có lỗi xảy ra khi xóa!' };
    }
};
