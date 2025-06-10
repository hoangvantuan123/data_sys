import { v4 as uuidv4 } from 'uuid' // Sử dụng thư viện uuid để tạo ID duy nhất

export const onRowAppended = (cols, setGridData, setNumRows, setAddedRows, numRowsToAdd) => {
  if (numRowsToAdd <= 0) return

  const newRows = Array(numRowsToAdd)
    .fill(null)
    .map(() => {
      const newRow = cols.reduce(
        (acc, col) => ({
          ...acc,
          [col.id]: col.id === 'Status' ? 'A' : ''
        }),
        {}
      )

      newRow.Id = uuidv4()
      return newRow
    })

  setGridData((prevData) => [...prevData, ...newRows])
  setNumRows((prev) => prev + numRowsToAdd)
  setAddedRows((prevAddedRows) => [...prevAddedRows, ...newRows])
}



export const onRowAppendedRow = (cols, setGridData, setNumRows, setAddedRows, numRowsToAdd) => {
  if (numRowsToAdd <= 0) return

  const newRows = Array(numRowsToAdd)
    .fill(null)
    .map(() => {
      const newRow = cols.reduce(
        (acc, col) => ({
          ...acc,
          [col.id]: col.id === 'Status' ? 'A' : ''
        }),
        {}
      )

      newRow.IdRow = uuidv4()
      return newRow
    })

  setGridData((prevData) => [...prevData, ...newRows])
  setNumRows((prev) => prev + numRowsToAdd)
  setAddedRows((prevAddedRows) => [...prevAddedRows, ...newRows])
}
