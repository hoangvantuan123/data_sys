import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { DataEditor, GridCellKind } from '@glideapps/glide-data-grid'
import { useLayer } from 'react-laag'
import { Drawer, Checkbox, message } from 'antd'
import { useExtraCells } from '@glideapps/glide-data-grid-cells'

import moment from 'moment'


function PayRollSyncATable({
    setSelection,
    selection,
    setShowSearch,
    showSearch,
    setGridData,
    gridData,
    numRows,
    cols,
    setCols
}) {
    const gridRef = useRef(null)
    const [open, setOpen] = useState(false)
    const cellProps = useExtraCells()
    const onSearchClose = useCallback(() => setShowSearch(false), [])
    const [showMenu, setShowMenu] = useState(null)
    const [hoverRow, setHoverRow] = useState(null);
    const onItemHovered = useCallback((args) => {
        const [_, row] = args.location
        setHoverRow(args.kind !== 'cell' ? undefined : row)
    }, [])
    const reorderColumns = (columns) => {
        return columns.map((col) => col.id)
    }


    const [keybindings, setKeybindings] = useState({
        downFill: true,
        rightFill: true,
        selectColumn: false
    })

    const getData = useCallback(
        ([col, row]) => {
            const person = gridData[row] || {}
            const column = cols[col]
            const columnKey = column?.id || ''
            const value = person[columnKey] || ''



            return {
                kind: GridCellKind.Text,
                data: value,
                displayData: String(value),
                readonly: column?.readonly || false,
                allowOverlay: true,
            }
        },
        [gridData, cols,]
    )

    const onCellEdited = useCallback(
        async (cell, newValue) => {

            if (
                newValue.kind !== GridCellKind.Text &&
                newValue.kind !== GridCellKind.Custom &&
                newValue.kind !== GridCellKind.Boolean &&
                newValue.kind !== GridCellKind.Number
            ) {
                return;
            }
            const indexes = reorderColumns(cols)
            const [col, row] = cell
            const key = indexes[col]
            if (row === gridData.length - 1) {
                return;
            }

            setGridData((prevData) => {
                const updatedData = [...prevData]
                if (!updatedData[row]) updatedData[row] = {}

                const currentStatus = updatedData[row]['Status'] || ''
                updatedData[row][key] = newValue.data
                updatedData[row]['Status'] = currentStatus === 'A' ? 'A' : 'U'



                return updatedData
            })
        },
        [cols, gridData

        ]
    )









    return (
        <div className="w-full  h-full flex items-center justify-center  border-b">
            <div className="w-full h-full flex flex-col  bg-white  overflow-hidden ">
                <h2 className="text-[10px] border-b font-medium flex items-center gap-2 p-1  uppercase">
                    DATA A
                </h2>
                <DataEditor
                    {...cellProps}
                    ref={gridRef}
                    columns={cols}
                    getCellContent={getData}
                    rows={numRows}
                    showSearch={showSearch}
                    onSearchClose={onSearchClose}
                    rowMarkers="both"
                    rowSelect="multi"
                    width="100%"
                    height="100%"
                    rowHeight={25}
                    gridSelection={selection}
                    onGridSelectionChange={setSelection}
                    getCellsForSelection={true}
                    freezeColumns={1}
                    headerHeight={29}
                    getRowThemeOverride={(rowIndex) => {
                        if (rowIndex === hoverRow) {
                            return {
                                bgCell: "#f7f7f7",
                                bgCellMedium: "#f0f0f0"
                            };
                        }
                        return undefined;
                    }}
                    onItemHovered={onItemHovered}
                    overscrollY={0}
                    overscrollX={0}
                    smoothScrollY={true}
                    smoothScrollX={true}
                    onPaste={true}
                    fillHandle={true}
                    keybindings={keybindings}
                    isDraggable={false}
                    onCellEdited={onCellEdited}





                />



            </div>
        </div>
    )
}

export default PayRollSyncATable
