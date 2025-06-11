import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
    useNavigate, useParams, createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FilterOutlined } from '@ant-design/icons'
import { Input, Drawer, Splitter, Typography, Badge } from 'antd'
const { Title, Text } = Typography
import { debounce } from 'lodash'
import { CompactSelection, GridColumnIcon } from '@glideapps/glide-data-grid'
import CryptoJS from 'crypto-js'
import TopLoadingBar from 'react-top-loading-bar';
import * as XLSX from "xlsx";
import { HandleError } from '../default/handleError'
import { HandleSucces } from '../default/handleSucc'

import dayjs from 'dayjs'

import {
    LogOut,
    DatabaseZap,
    RotateCcw,
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
    Plus,
    Layers,
    Minus,
    FileText,
    HardDriveUpload,
    ChevronDown,
    Printer,
    Trash2,
    ClipboardList, User, Building, Package, Clock4, User2, Hash,
    PackageCheck
} from 'lucide-react';
import { updateIndexNo } from '../../components/sheet/js/updateIndexNo'
import { generateEmptyData } from '../../components/sheet/js/generateEmptyData'
import PayRollSyncATable from '../../components/cell/payroll/payRollSyncA'
import { togglePageInteraction } from '../../utils/togglePageInteraction'
import { HrPayrollSysA } from '../../../features/sys/payroll/HrPayrollSysA'
import { HrPayrollSysQ } from '../../../features/sys/payroll/HrPayrollSysQ'
import { filterValidRows } from '../../utils/filterUorA'
export default function HomePage({  }) {
    const loadingBarRef = useRef(null);
    const userFrom = JSON.parse(localStorage.getItem('userInfo'))
    const fileInputRef = useRef(null);
    const activeFetchCountRef = useRef(0);
    let controllers = useRef({});
    const [gridData, setGridData] = useState([])

    const [gridDataSeq, setGridDataSeq] = useState([])
    const [dataForm, setDataFrom] = useState([])
    const { t } = useTranslation()
    const defaultCols = useMemo(() => [
        {
            title: '',
            id: 'Status',
            kind: 'Text',
            readonly: true,
            width: 50,
            hasMenu: true,
            visible: true,
            themeOverride: {
                textDark: "#2C3E50",
                baseFontStyle: "600 13px",
            },
        },
        {
            title: 'pb_ym', id: 'pb_ym', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },
        {
            title: 'yy', id: 'yy', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },
        {
            title: 'mm', id: 'mm', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },
        {
            title: 'emp_seq', id: 'emp_seq', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },
        {
            title: 'emp_id', id: 'emp_id', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },
        {
            title: 'emp_name', id: 'emp_name', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },
        {
            title: 'dept_nm', id: 'dept_nm', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },
        {
            title: 'jp_nm', id: 'jp_nm', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },
        {
            title: 'pb_name', id: 'pb_name', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },
        {
            title: 'pt_name_1', id: 'pt_name_1', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },
        {
            title: 'pt_name_2', id: 'pt_name_2', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },
        {
            title: 'pt_name_3', id: 'pt_name_3', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true }
        },

        // Bắt đầu từ amt_1 đến amt_50, viết tay từng dòng
        { title: 'amt_1', id: 'amt_1', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_2', id: 'amt_2', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_3', id: 'amt_3', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_4', id: 'amt_4', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_5', id: 'amt_5', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_6', id: 'amt_6', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_7', id: 'amt_7', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_8', id: 'amt_8', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_9', id: 'amt_9', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_10', id: 'amt_10', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_11', id: 'amt_11', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_12', id: 'amt_12', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_13', id: 'amt_13', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_14', id: 'amt_14', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_15', id: 'amt_15', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_16', id: 'amt_16', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_17', id: 'amt_17', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_18', id: 'amt_18', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_19', id: 'amt_19', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_20', id: 'amt_20', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_21', id: 'amt_21', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_22', id: 'amt_22', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_23', id: 'amt_23', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_24', id: 'amt_24', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_25', id: 'amt_25', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_26', id: 'amt_26', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_27', id: 'amt_27', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_28', id: 'amt_28', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_29', id: 'amt_29', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_30', id: 'amt_30', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_31', id: 'amt_31', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_32', id: 'amt_32', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_33', id: 'amt_33', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_34', id: 'amt_34', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_35', id: 'amt_35', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_36', id: 'amt_36', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_37', id: 'amt_37', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_38', id: 'amt_38', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_39', id: 'amt_39', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_40', id: 'amt_40', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_41', id: 'amt_41', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_42', id: 'amt_42', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_43', id: 'amt_43', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_44', id: 'amt_44', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_45', id: 'amt_45', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_46', id: 'amt_46', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_47', id: 'amt_47', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_48', id: 'amt_48', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_49', id: 'amt_49', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
        { title: 'amt_50', id: 'amt_50', kind: 'Text', readonly: true, width: 70, visible: true, trailingRowOptions: { disabled: true } },
    ], [t]);

    const [numRowsToAdd, setNumRowsToAdd] = useState(null)
    const [cols, setCols] = useState(defaultCols)

    const [numRows, setNumRows] = useState(0)
    const [addedRows, setAddedRows] = useState(0)
    const [selection, setSelection] = useState({
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty()
    })

    const [showSearch, setShowSearch] = useState(false)

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        togglePageInteraction(true); // Bắt đầu loading

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {
                    type: "array",
                    dense: true
                });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    defval: "",
                    raw: false
                });

                if (jsonData.length === 0) {
                    togglePageInteraction(false);
                    return;
                }

                const batchSize = 100000;
                const updatedData = [];

                for (let i = 0; i < jsonData.length; i += batchSize) {
                    const batch = jsonData.slice(i, i + batchSize).map((row, index) => ({
                        ...row,
                        Status: "A",
                        IdxNo: i + index + 1
                    }));
                    updatedData.push(...batch);
                }

                setGridData(updatedData);
                setNumRows(updatedData.length);
            } catch (error) {
                console.log('error', error)

            } finally {
                togglePageInteraction(false);
            }
        };

        reader.readAsArrayBuffer(file);
    };
    const handleSaveData = useCallback(async () => {

        const resulA = filterValidRows(gridData, 'A')


        if (resulA.length === 0) {
            togglePageInteraction(false);
            loadingBarRef.current?.complete();
            return true;
        }

        togglePageInteraction(true);
        loadingBarRef.current?.continuousStart();

        try {
            const result = await HrPayrollSysA(resulA);

            if (!result?.success) {
                HandleError([result]);
                return;
            }

            const addMenuData = result?.data || [];
            setGridData(prev => {
                const updated = prev.map(item => {
                    const found = addMenuData.find(x => Number(x?.emp_seq) === Number(item?.emp_seq));
                    return found ? { ...item, Status: '', IdSeq: found?.id } : item;
                });
                return updateIndexNo(updated);
            });
            HandleSucces({
                success: true,
                message: 'Cập nhât dữ liệu thành công',
            },)

        } catch (error) {
            HandleError([
                {
                    success: false,
                    message: t(error?.message) || 'Đã xảy ra lỗi khi lưu!',
                },
            ]);
        } finally {
            loadingBarRef.current?.complete();
            togglePageInteraction(false);
        }
    }, [gridData]);
    const cancelAllRequests = () => {
        Object.values(controllers.current).forEach(controller => {
            if (controller && controller.abort) {
                controller.abort();
            }
        });
        controllers.current = {};
    };
    const fetchGenericData = async ({
        controllerKey,
        postFunction,
        searchParams,
        useEmptyData = true,
        defaultCols,
        afterFetch = () => { },
    }) => {
        increaseFetchCount();

        if (controllers.current[controllerKey]) {
            controllers.current[controllerKey].abort();
            await new Promise((resolve) => setTimeout(resolve, 10));
            return fetchGenericData({
                controllerKey,
                postFunction,
                searchParams,
                afterFetch,
                defaultCols,
                useEmptyData,
            });
        }

        const controller = new AbortController();
        controllers.current[controllerKey] = controller;
        const { signal } = controller;

        togglePageInteraction(true);
        loadingBarRef.current?.continuousStart();

        try {
            const response = await postFunction(searchParams, signal);
            const data = response.success ? (response.data || []) : [];

            let mergedData = updateIndexNo(data);

            if (useEmptyData) {
                const emptyData = updateIndexNo(generateEmptyData(100, defaultCols));
                mergedData = updateIndexNo([...data, ...emptyData]);
            }

            await afterFetch(mergedData);
        } catch (error) {
            let emptyData = [];

            if (useEmptyData) {
                emptyData = updateIndexNo(generateEmptyData(100, defaultCols));
            }

            await afterFetch(emptyData);
        } finally {
            decreaseFetchCount();
            controllers.current[controllerKey] = null;
        }
    };

    const increaseFetchCount = () => {
        activeFetchCountRef.current += 1;
    };

    const decreaseFetchCount = () => {
        activeFetchCountRef.current -= 1;
        if (activeFetchCountRef.current === 0) {
            loadingBarRef.current?.complete();
            togglePageInteraction(false);
        }
    };
    useEffect(() => {
        const searchParams = {
            KeyItem2: '202505',

        }

        fetchGenericData({
            controllerKey: 'HrPayrollSysQ',
            postFunction: HrPayrollSysQ,
            searchParams,
            defaultCols: null,
            useEmptyData: false,
            afterFetch: (data) => {
                console.log('data', data)
            },
        });
    }, []);
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <TopLoadingBar color="blue" height={2} ref={loadingBarRef} />
            <div className="bg-slate-50 h-screen flex flex-col">
                <header className="border-b p-4 h-10 bg-slate-100 shadow-md flex-shrink-0">
                    <div className="flex justify-between items-center h-full ">
                        <div className="flex flex-col text-slate-700">
                            <span className="text-xl font-extrabold tracking-wide text-blue-900">
                                DATA SYS ITM HR
                            </span>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Tuỳ chọn bổ sung: nút logout, avatar, trạng thái hệ thống */}
                        </div>
                    </div>
                </header>




                <main className="flex-1 flex bg-white overflow-hidden">
                    <div className=" w-60 border-r border-gray-300 flex flex-col">
                        <div className="bg-slate-50 h-full border-gray-300 flex flex-col flex-1">
                            <div className="border-b">
                                <h3 className="p-2 bg-slate-100 border-b opacity-85 text-xs font-bold text-gray-800 flex items-center">
                                    THÔNG TIN FILE UPLOAD
                                </h3>
                                <div className="space-y-3 p-2 bg-white text-xs">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-2 min-w-[140px]">
                                            <span className="font-semibold text-gray-700">Tên file:</span>
                                        </div>
                                        <div className="text-right text-gray-800">
                                            {'Chưa chọn file'}
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                accept=".xlsx,.xls"
                                                style={{ display: 'none' }}
                                                onChange={handleFileUpload}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-2 min-w-[140px]">
                                            <span className="font-semibold text-gray-700">Số dòng dữ liệu:</span>
                                        </div>
                                        <div className="text-right text-gray-800">
                                            {dataForm.length}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="p-2 bg-slate-100 border-b">
                                <h3 class="text-xs font-bold text-gray-800 opacity-85 flex items-center">
                                    MENU
                                </h3>
                            </div>

                            <div class="bg-white overflow-auto flex flex-col flex-1 scroll-container">
                                <div class="p-3 border-b cursor-pointer hover:bg-blue-50 transition flex items-center gap-2 text-sm text-gray-800">
                                    < HardDriveUpload className="w-4 h-4 " />
                                    <span>UPLOAD DATA BẢNG LƯƠNG </span>
                                </div>
                                <div class="p-3 border-b cursor-pointer hover:bg-blue-50 transition flex items-center gap-2 text-sm text-gray-800">

                                    < DatabaseZap className="w-4 h-4 " />
                                    <span>DỮ LIỆU DATA LƯƠNG</span>
                                </div>


                            </div>

                        </div>
                    </div>

                    <div className="flex-1 bg-white flex min-h-0 overflow-hidden ">
                        {/*  <Splitter >
                            <Splitter.Panel defaultSize="40%" min="20%" max="70%" className='border-r-2  border-gray-300'>
                                <PayRollSyncATable

                                    setSelection={setSelection}
                                    selection={selection}
                                    setShowSearch={setShowSearch}
                                    showSearch={showSearch}
                                    setGridData={setGridData}
                                    gridData={gridData}
                                    numRows={numRows}
                                    cols={defaultCols}
                                    setCols={setCols}
                                />
                            </Splitter.Panel>
                            <Splitter.Panel className='border-l-2 border-gray-300 '>
                               
                            </Splitter.Panel>
                        </Splitter> */}

                        <PayRollSyncATable

                            setSelection={setSelection}
                            selection={selection}
                            setShowSearch={setShowSearch}
                            showSearch={showSearch}
                            setGridData={setGridData}
                            gridData={gridData}
                            numRows={numRows}
                            cols={defaultCols}
                            setCols={setCols}
                        />
                    </div>

                </main>

                <footer className="border-t p-2 bg-slate-100 shadow text-sm text-gray-500 flex-shrink-0">
                    <div className="flex justify-between flex-wrap items-center gap-2">
                        <div className="flex flex-wrap gap-2 items-center">
                            <button onClick={() => fileInputRef.current?.click()} className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center w-24 sm:w-28 h-14 sm:h-16">
                                <HardDriveUpload className="w-6 h-6 sm:w-8 sm:h-8" />
                            </button>
                            <button className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center w-24 sm:w-28 h-14 sm:h-16">
                                <RotateCcw className="w-6 h-6 sm:w-8 sm:h-8" />
                            </button>

                            <button className="bg-red-500 hover:bg-red-400 text-white rounded flex items-center justify-center w-24 sm:w-28 h-14 sm:h-16">
                                <Trash2 className="w-6 h-6 sm:w-8 sm:h-8" />
                            </button>

                        </div>

                        <div className="flex flex-wrap gap-2 items-center justify-end">
                            <button onClick={handleSaveData} className="bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-sm sm:text-base flex items-center justify-center w-36 sm:w-36 h-14 sm:h-16">
                                SAVE
                            </button>
                        </div>
                    </div>
                </footer>
            </div>


        </>
    )
}
