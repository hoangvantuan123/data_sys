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
import { togglePageInteraction } from '../../utils/togglePageInteraction'
import TopLoadingBar from 'react-top-loading-bar';

import dayjs from 'dayjs'

import {
    LogOut,
    Square,
    RotateCcw,
    Settings,
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
    Plus,
    Layers,
    Minus,
    FileText,
    ChevronUp,
    ChevronDown,
    Printer,
    Trash2,
    ClipboardList, User, Building, Package, Clock4, User2, Hash,
    PackageCheck
} from 'lucide-react';

export default function PayrollSync({ permissions, isMobile, canCreate, canEdit, canDelete, controllers,
    cancelAllRequests }) {
    const loadingBarRef = useRef(null);
    const userFrom = JSON.parse(localStorage.getItem('userInfo'))

    const [gridData, setGridData] = useState([])
    const [gridDataSeq, setGridDataSeq] = useState([])
    const [dataForm, setDataFrom] = useState([])
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

                    </div>
                </header>



                {/* 
                <main className="flex-1 flex bg-white overflow-hidden">
                    <div className=" w-72 border-r border-gray-300 flex flex-col">
                        <div className="bg-slate-50 h-full border-gray-300 flex flex-col flex-1">
                            <div className="border-b">
                                <h3 className="p-2 bg-slate-100 border-b opacity-85 text-xs font-bold text-gray-800 flex items-center">
                                    THÔNG TIN ĐƠN SẢN XUẤT
                                </h3>
                                <div className="space-y-3 p-2 bg-white text-xs">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-2 min-w-[140px]">
                                            <ClipboardList className="w-4 h-4 " />
                                            <span className="font-semibold text-gray-700">Số yêu cầu:</span>
                                        </div>
                                        <div className="text-right text-gray-800">{gridDataSeq[0]?.ProdKey || ''}</div>
                                    </div>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-2 min-w-[140px]">
                                            <ClipboardList className="w-4 h-4 " />
                                            <span className="font-semibold text-gray-700">Mã sản xuất:</span>
                                        </div>
                                        <div className="text-right text-gray-800">{gridDataSeq[0]?.ProductCode || ''}</div>
                                    </div>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-2 min-w-[140px]">
                                            <User className="w-4 h-4 " />
                                            <span className="font-semibold text-gray-700">Người phụ trách:</span>
                                        </div>
                                        <div className="text-right text-gray-800">{gridDataSeq[0]?.EmpName || ''}</div>
                                    </div>

                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-2 min-w-[140px]">
                                            <Building className="w-4 h-4 " />
                                            <span className="font-semibold text-gray-700">Khách hàng:</span>
                                        </div>
                                        <div className="text-right text-gray-800">{gridDataSeq[0]?.CustomerName || ''}</div>
                                    </div>

                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-2 min-w-[140px]">
                                            <Package className="w-4 h-4 " />
                                            <span className="font-semibold text-gray-700">Tổng số lượng:</span>
                                        </div>
                                        <div className="text-right text-gray-800">{gridDataSeq[0]?.TotalQuantity || ''}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 bg-slate-100 border-b  ">
                                <h3 className="  text-xs font-bold  text-gray-800 opacity-85 flex items-center">
                                    LỊCH SỬ QUÉT & NHẬP SẢN LƯỢNG
                                </h3>
                            </div>
                            <div className=" bg-white   overflow-auto flex flex-col flex-1 scroll-container ">
                                {dataForm.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-2 border-b cursor-pointer hover:bg-slate-100 text-xs transition flex flex-col gap-2 "
                                    >
                                        <div className="flex justify-between items-center text-xs ">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Hash className="w-4 h-4 text-gray-500" />
                                                <span>Mã Form:</span>
                                            </div>
                                            <span className="font-mono text-gray-900">#{item.FromKey}</span>
                                        </div>

                                        <div className="flex justify-between items-center text-xs">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <User2 className="w-4 h-4 text-gray-500" />
                                                <span>Người bắn:</span>
                                            </div>
                                            <span className="text-gray-800">{item.UserName}</span>
                                        </div>

                                        <div className="flex justify-between items-center text-xs">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <PackageCheck className="w-4 h-4 text-gray-500" />
                                                <span>Số lượng bắn:</span>
                                            </div>
                                            <span className="text-gray-800">{item.ScannedQuantity}</span>
                                        </div>

                                        <div className="flex justify-between items-center text-xs">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Clock4 className="w-4 h-4 text-gray-500" />
                                                <span>Thời gian tạo:</span>
                                            </div>
                                            <span className="text-gray-800">{item.CreatedAt}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-white flex min-h-0 overflow-hidden ">
                        <Splitter >
                            <Splitter.Panel defaultSize="40%" min="20%" max="70%" className='border-r-2  border-gray-300'>



                                1
                            </Splitter.Panel>
                            <Splitter.Panel className='border-l-2 border-gray-300 '>
                                2
                            </Splitter.Panel>
                        </Splitter>
                    </div>
                    <div className=" h-screen  w-24 border-l border-gray-300 flex flex-col items-center gap-y-2 p-2">
                        <button className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center  w-20 h-16">
                            <ChevronUp className="w-7 h-7" />
                        </button>

                        <button className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center w-20 h-16">
                            <ChevronDown className="w-7 h-7 text-white" />
                        </button>
                        <button className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center w-20 h-16">
                            <Plus className="w-7 h-7 text-white" />
                        </button>
                        <button className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center w-20 h-16">
                            <Minus className="w-7 h-7 text-white" />
                        </button>
                        <button className="bg-red-500 hover:bg-red-400 text-white rounded flex items-center justify-center w-20 h-16">
                            <Trash2 className="w-7 h-7 text-white" />
                        </button>


                    </div>


                </main> */}
                <main className="flex-1 flex bg-white overflow-hidden">
                    <div className=" w-72 border-r border-gray-300 flex flex-col">
                        <div className="bg-slate-50 h-full border-gray-300 flex flex-col flex-1">
                            <div className="bg-slate-50 h-full border-gray-300 flex flex-col flex-1">
                                <div className="border-b">
                                    <h3 className="p-2 bg-slate-100 border-b opacity-85 text-xs font-bold text-gray-800 flex items-center">
                                        THÔNG TIN ĐƠN SẢN XUẤT
                                    </h3>
                                    <div className="space-y-3 p-2 bg-white text-xs">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-2 min-w-[140px]">
                                                <ClipboardList className="w-4 h-4 " />
                                                <span className="font-semibold text-gray-700">Số yêu cầu:</span>
                                            </div>
                                            <div className="text-right text-gray-800">{gridDataSeq[0]?.ProdKey || ''}</div>
                                        </div>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-2 min-w-[140px]">
                                                <ClipboardList className="w-4 h-4 " />
                                                <span className="font-semibold text-gray-700">Mã sản xuất:</span>
                                            </div>
                                            <div className="text-right text-gray-800">{gridDataSeq[0]?.ProductCode || ''}</div>
                                        </div>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-2 min-w-[140px]">
                                                <User className="w-4 h-4 " />
                                                <span className="font-semibold text-gray-700">Người phụ trách:</span>
                                            </div>
                                            <div className="text-right text-gray-800">{gridDataSeq[0]?.EmpName || ''}</div>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-2 min-w-[140px]">
                                                <Building className="w-4 h-4 " />
                                                <span className="font-semibold text-gray-700">Khách hàng:</span>
                                            </div>
                                            <div className="text-right text-gray-800">{gridDataSeq[0]?.CustomerName || ''}</div>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-2 min-w-[140px]">
                                                <Package className="w-4 h-4 " />
                                                <span className="font-semibold text-gray-700">Tổng số lượng:</span>
                                            </div>
                                            <div className="text-right text-gray-800">{gridDataSeq[0]?.TotalQuantity || ''}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 bg-slate-100 border-b  ">
                                    <h3 className="  text-xs font-bold  text-gray-800 opacity-85 flex items-center">
                                        LỊCH SỬ QUÉT & NHẬP SẢN LƯỢNG
                                    </h3>
                                </div>
                                <div className=" bg-white   overflow-auto flex flex-col flex-1 scroll-container ">
                                    {dataForm.map((item, index) => (
                                        <div
                                            key={index}
                                            className="p-2 border-b cursor-pointer hover:bg-slate-100 text-xs transition flex flex-col gap-2 "
                                        >
                                            <div className="flex justify-between items-center text-xs ">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Hash className="w-4 h-4 text-gray-500" />
                                                    <span>Mã Form:</span>
                                                </div>
                                                <span className="font-mono text-gray-900">#{item.FromKey}</span>
                                            </div>

                                            <div className="flex justify-between items-center text-xs">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <User2 className="w-4 h-4 text-gray-500" />
                                                    <span>Người bắn:</span>
                                                </div>
                                                <span className="text-gray-800">{item.UserName}</span>
                                            </div>

                                            <div className="flex justify-between items-center text-xs">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <PackageCheck className="w-4 h-4 text-gray-500" />
                                                    <span>Số lượng bắn:</span>
                                                </div>
                                                <span className="text-gray-800">{item.ScannedQuantity}</span>
                                            </div>

                                            <div className="flex justify-between items-center text-xs">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Clock4 className="w-4 h-4 text-gray-500" />
                                                    <span>Thời gian tạo:</span>
                                                </div>
                                                <span className="text-gray-800">{item.CreatedAt}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                  {/*   <div className="flex-1 bg-white flex min-h-0 overflow-hidden ">
                        <Splitter >
                            <Splitter.Panel defaultSize="40%" min="20%" max="70%" className='border-r-2 '>



                            </Splitter.Panel>
                            <Splitter.Panel className='border-l-2 '>

                            </Splitter.Panel>
                        </Splitter>
                    </div> */}
                    {/* <<Plus /> /> */}
                    <div className="   w-24 border-l border-gray-300 flex flex-col items-center gap-y-2 p-2">
                        <button className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center  w-20 h-16">
                            <ChevronUp className="w-7 h-7" />
                        </button>

                        <button className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center w-20 h-16">
                            <ChevronDown className="w-7 h-7 text-white" />
                        </button>
                        <button className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center w-20 h-16">
                            <Plus className="w-7 h-7 text-white" />
                        </button>
                        <button className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center w-20 h-16">
                            <Minus className="w-7 h-7 text-white" />
                        </button>
                        <button className="bg-red-500 hover:bg-red-400 text-white rounded flex items-center justify-center w-20 h-16">
                            <Trash2 className="w-7 h-7 text-white" />
                        </button>


                    </div>

                </main>

                <footer className="border-t p-2 bg-slate-100 shadow text-sm text-gray-500 flex-shrink-0">
                    <div className="flex justify-between flex-wrap items-center gap-2">
                        <div className="flex flex-wrap gap-2 items-center">
                            <button onClick={() => setDropdownVisible(true)} className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center w-24 sm:w-28 h-14 sm:h-16">
                                <Badge count={1}>
                                    <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                </Badge>
                            </button>
                            <button onClick={() => setDropdownVisible2(true)} className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center w-24 sm:w-28 h-14 sm:h-16">
                                <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
                            </button>
                            <button onClick={() => setOpen(true)} className="bg-slate-500 hover:bg-slate-400 text-white rounded flex items-center justify-center w-24 sm:w-28 h-14 sm:h-16">
                                <Printer className="w-6 h-6 sm:w-8 sm:h-8" />
                            </button>

                            <button className="bg-red-500 hover:bg-red-400 text-white rounded flex items-center justify-center w-24 sm:w-28 h-14 sm:h-16">
                                <Trash2 className="w-6 h-6 sm:w-8 sm:h-8" />
                            </button>

                        </div>

                        <div className="flex flex-wrap gap-2 items-center justify-end">
                            <button className="bg-slate-500 hover:bg-slate-400 text-white rounded font-bold text-sm sm:text-base flex items-center justify-center w-24 sm:w-28 h-14 sm:h-16">
                                <LogOut className="w-6 h-6 sm:w-8 sm:h-8" />
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-sm sm:text-base flex items-center justify-center w-36 sm:w-36 h-14 sm:h-16">
                                SAVE
                            </button>
                        </div>
                    </div>
                </footer>
            </div>


        </>
    )
}
