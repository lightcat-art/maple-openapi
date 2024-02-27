import * as React from 'react';
import { getCellDOM } from './index'
import './index.css'
import { getCSSProp } from '../util/util.jsx'
import { PROCESS_INIT } from './index';
import { TABLE_ROW_LEN, TABLE_COL_LEN } from '../common'
import { AfterImageButton } from '../common/clickable'

const regionInfo = []
const cellSelectedHoverColor = getCSSProp(document.documentElement, '--cell-selected-hover-color')
const cellNotSelectedHoverColor = getCSSProp(document.documentElement, '--cell-not-selected-hover-color')

function regionDef(rowLen, colLen) {
    const regionCount = 16
    for (let i = 0; i < regionCount; i++) {
        regionInfo.push([])
    }
    //바깥쪽 구역 구분
    for (let i = 0; i < rowLen / 4; i++) {
        for (let j = i; j < rowLen / 2; j++) {
            regionInfo[0].push([j, i]) //북서 아래
            regionInfo[1].push([i, j + 1]) //북서 위
            regionInfo[2].push([i, rowLen - j]) //북동 위
            regionInfo[3].push([j, rowLen + 1 - i]) //북동 아래
            regionInfo[8].push([rowLen - 1 - j, i]) // 남서 위
            regionInfo[9].push([rowLen - 1 - i, j + 1]) //남서 아래
            regionInfo[10].push([rowLen - 1 - i, rowLen - j]) // 남동 아래
            regionInfo[11].push([rowLen - 1 - j, rowLen + 1 - i]) // 남동 위
        }
    }
    // 안쪽 구역 구분
    for (let i = rowLen / 4; i < rowLen / 2; i++) {
        for (let j = i; j < rowLen / 2; j++) {
            regionInfo[4].push([j, i]) //북서 아래
            regionInfo[5].push([i, j + 1]) //북서 위
            regionInfo[6].push([i, rowLen - j]) //북동 위
            regionInfo[7].push([j, rowLen + 1 - i]) //북동 아래
            regionInfo[12].push([rowLen - 1 - j, i]) // 남서 위
            regionInfo[13].push([rowLen - 1 - i, j + 1]) //남서 아래
            regionInfo[14].push([rowLen - 1 - i, rowLen - j]) // 남동 아래
            regionInfo[15].push([rowLen - 1 - j, rowLen + 1 - i]) // 남동 위
        }
    }
}

function checkRegion(row, col) {
    for (let i = 0; i < regionInfo.length; i++) {
        for (let j = 0; j < regionInfo[i].length; j++) {
            if (row === regionInfo[i][j][0] && col === regionInfo[i][j][1]) {
                return i
            }
        }
    }
    return null
}

function getRegionCells(region) {
    return regionInfo[region]
}

regionDef(TABLE_ROW_LEN, TABLE_COL_LEN)

// 상위 컴포넌트의 props를 props key 별로 받으려면 {}를 작성해줘야함. 그렇지 않으면 모든 props 가 한번에 map형태로 오게된다.
export function BasicTable({ blockManager, tableStyle, setTableStyle, setTable, table, regionMode, processType, initSelectDisabled, isStart, isProcessFail, ocid }) {
    const [select, setSelect] = React.useState([])
    // This variable will control if the user is dragging or not
    const [drag, setDrag] = React.useState(false)
    const [selectMode, setSelectMode] = React.useState(true) // 선택모드 인지, 해제모드 인지 세팅

    React.useEffect(() => {
        const selectedElement = Array.from(
            document.getElementsByClassName('selected')
        );
        let table = Array.from(new Array(TABLE_ROW_LEN), () => new Array(TABLE_COL_LEN).fill(0))
        for (var value of selectedElement.values()) {
            let position = value.getAttribute('uniqkey').split('-');
            const row = Number(position[0])
            const col = Number(position[1])

            table[row][col] = 1
            // if (regionMode) {
            //     const regionCells = getRegionCells(checkRegion(row, col))
            //     for (let regionCell of regionCells) {
            //         const cellDom = getCellDOM(regionCell[0], regionCell[1])
            //         cellDom.style.backgroundColor = cellSelectedColor
            //     }
            // } else {
            //     const cellDom = getCellDOM(row, col)
            //     cellDom.style.backgroundColor = cellSelectedColor
            // }
        }
        // for (var value of notSelectedElement.values()) {
        //     let position = value.getAttribute('uniqkey').split('-');
        //     const row = Number(position[0])
        //     const col = Number(position[1])
        //     if (regionMode) {
        //         const regionCells = getRegionCells(checkRegion(row, col))
        //         for (let regionCell of regionCells) {
        //             const cellDom = getCellDOM(regionCell[0], regionCell[1])
        //             cellDom.style.backgroundColor = cellNotSelectedColor
        //         }
        //     } else {
        //         const cellDom = getCellDOM(row, col)
        //         cellDom.style.backgroundColor = cellNotSelectedColor
        //     }
        // }
        // 처음 페이지 진입할때 이미 localStorage가 있으면 업데이트하면 안됨.
        if (processType === PROCESS_INIT) {
            if (localStorage.getItem("tableSelect")) {
                setTable(JSON.parse(localStorage.getItem("tableSelect")))
            } else {
                // 이게 없으면 tableSelect와 positionSelect가 생성되지 않은 초기 페이지 진입케이스에서 table DOM이 생성되지 않아 오류가 남.
                // table state 생성시 20,1 로 잘못생성되던 문제떄문인것으로 파악됨. setTable은 여기서 안해줘도 될듯.
                // setTable(table)
            }
            if (localStorage.getItem("positionSelect")) {
                setSelect(JSON.parse(localStorage.getItem("positionSelect")))
            }
        } else {
            setTable(table)
            localStorage.setItem("tableSelect", JSON.stringify(table))
            localStorage.setItem("positionSelect", JSON.stringify(select))
        }


    }, [drag]);



    const handleMouseDown = (e, row, col) => {
        if (isStart) {
            setDrag(false)
            return
        } else {
            setDrag(true)
        }
        let cellSelected = false
        let cellIdx = select.indexOf(JSON.stringify([row, col]))
        if (cellIdx > -1) {
            cellSelected = true
        }

        if (regionMode) {
            const regionCells = getRegionCells(checkRegion(row, col))
            let regionSelected = true
            for (const regionCell of regionCells) {
                const regionCellIdx = select.indexOf(JSON.stringify(regionCell))
                if (regionCellIdx < 0) {
                    regionSelected = false
                }
            }
            if (!regionSelected && !cellSelected) {
                setSelectMode(true)
                for (const regionCell of regionCells) {
                    const regionCellIdx = select.indexOf(JSON.stringify(regionCell))
                    if (regionCellIdx < 0) {
                        select.push(JSON.stringify(regionCell))
                    }
                }
                setSelect([...select])
            } else {
                setSelectMode(false)
                for (const regionCell of regionCells) {
                    const regionCellIdx = select.indexOf(JSON.stringify(regionCell))
                    if (regionCellIdx >= 0) {
                        select.splice(regionCellIdx, 1)

                    }
                }
                setSelect([...select])
            }
        } else {
            if (!cellSelected) {
                setSelectMode(true)
                setSelect([...select, JSON.stringify([row, col])])
            } else {
                setSelectMode(false)
                select.splice(cellIdx, 1)
                setSelect([...select])
            }
        }
    }

    const handleMouseUp = () => {
        setDrag(false)
    }


    const handleMultipleSel = (e, row, col) => {
        e.preventDefault();
        if (drag) {
            let cellSelected = false
            let cellIdx = select.indexOf(JSON.stringify([row, col]))
            if (cellIdx > -1) {
                cellSelected = true
            }

            if (regionMode) {
                const regionCells = getRegionCells(checkRegion(row, col))
                if (selectMode) {
                    setSelectMode(true)
                    for (const regionCell of regionCells) {
                        const regionCellIdx = select.indexOf(JSON.stringify(regionCell))
                        if (regionCellIdx < 0) {
                            select.push(JSON.stringify(regionCell))
                        }
                    }
                    setSelect([...select])
                } else {
                    setSelectMode(false)
                    for (const regionCell of regionCells) {
                        const regionCellIdx = select.indexOf(JSON.stringify(regionCell))
                        if (regionCellIdx >= 0) {
                            select.splice(regionCellIdx, 1)

                        }
                    }
                    setSelect([...select])
                }
            } else {

                if (!cellSelected && selectMode) {
                    // setSelectMode(true)
                    setSelect([...select, JSON.stringify([row, col])])
                } else if (cellSelected && !selectMode) {
                    // setSelectMode(false)
                    select.splice(cellIdx, 1)
                    setSelect([...select])
                }
            }
        }
    }

    const handleMouseEnter = (e, row, col) => {
        if (isStart) {
            return
        }
        const selectedElement = Array.from(
            document.getElementsByClassName('block')
        );
        if (selectedElement.length === 0) {
            if (regionMode) {
                const regionCells = getRegionCells(checkRegion(row, col))
                for (let regionCell of regionCells) {
                    const cellDom = getCellDOM(regionCell[0], regionCell[1])

                    if (cellDom.className.includes('selected')) {
                        cellDom.style.backgroundColor = cellSelectedHoverColor
                    } else {
                        cellDom.style.backgroundColor = cellNotSelectedHoverColor
                    }
                }
            } else {
                const cellDom = getCellDOM(row, col)
                if (cellDom.className.includes('selected')) {
                    cellDom.style.backgroundColor = cellSelectedHoverColor
                } else {
                    cellDom.style.backgroundColor = cellNotSelectedHoverColor
                }
            }
        }

    }

    const handleMouseLeave = (e, row, col) => {
        if (isStart) {
            return
        }
        const selectedElement = Array.from(
            document.getElementsByClassName('block')
        );
        if (selectedElement.length === 0) {
            if (regionMode) {
                const regionCells = getRegionCells(checkRegion(row, col))
                for (let regionCell of regionCells) {
                    getCellDOM(regionCell[0], regionCell[1]).style.backgroundColor = ''
                }
            } else {
                getCellDOM(row, col).style.backgroundColor = ''
            }
        }

    }

    const preventOutsideDrag = (e) => {
        setDrag(false)
    }

    const handleInitSelect = () => {
        setSelect([])
        localStorage.removeItem('tableSelect')
        localStorage.removeItem('positionSelect')
        setTable(Array.from(Array(TABLE_ROW_LEN), () => Array(TABLE_COL_LEN).fill(0)))
        setTableStyle(Array.from(Array(TABLE_ROW_LEN), () => Array(TABLE_COL_LEN).fill({})))
    }

    const handleGetUserSelect = () => {
        const cacheTableSelect = localStorage.getItem(`tableSelect-${ocid}`)
        const cachePosSelect = localStorage.getItem(`positionSelect-${ocid}`)
        setSelect(JSON.parse(cachePosSelect))
        setTable(JSON.parse(cacheTableSelect))
        setTableStyle(blockManager.getTableStyle(JSON.parse(cacheTableSelect)))
        localStorage.setItem('tableSelect', cacheTableSelect)
        localStorage.setItem('positionSelect', cachePosSelect)
    }

    // 드래그하는 도중 전체 테이블셀을 계속 스캔
    const getClassName = (row, col) => {
        for (let i = 0; i < select.length; i++) {
            if (JSON.stringify([row, col]) === select[i]) {
                return 'selected'
            }
        }
        return 'remained'
    }

    return (
        <div className="union-table-wrapper" onMouseUp={(e) => handleMouseUp()}>
            <div
            // onMouseMove={(e) => preventOutsideDrag(e)}
            >
                <table id='union-table' className='union-table'
                >
                    <tbody className='union-table-body'>
                        {tableStyle.map((row, i) => (
                            <tr key={i}>
                                {row.map((v, j) => (
                                    <td
                                        onMouseDown={(e) => handleMouseDown(e, i, j)}
                                        // onMouseUp={(e) => handleMouseUp()}
                                        onMouseMove={(e) => handleMultipleSel(e, i, j)}
                                        onMouseEnter={(e) => handleMouseEnter(e, i, j)}
                                        onMouseLeave={(e) => handleMouseLeave(e, i, j)}
                                        className={`union-table-cell ${getClassName(i, j)} ${v.className ? v.className : ''}`}
                                        key={`${j}`} style={v.style} uniqkey={`${i}-${j}`}>
                                    </td>
                                    // </div>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="container">
                <div className="row justify-content-center select-control-wrapper">
                    <div className="col-auto init-select-wrapper text-center">
                        <AfterImageButton className="init-select-btn ps-3"
                            action={handleInitSelect}
                            disabled={initSelectDisabled}
                            title='선택 영역 초기화'>
                        </AfterImageButton>
                    </div>

                    <div className="col-auto get-user-select-wrapper text-center">
                        <AfterImageButton className="get-user-select-btn ps-3"
                            action={handleGetUserSelect}
                            disabled={initSelectDisabled}
                            title='내 현재 점령 구역 가져오기'>
                        </AfterImageButton>
                    </div>
                </div>
            </div>


            <div>{isProcessFail ?
                <div className="process-fail text-center">
                    설정한 영역을 모두 채울수 있는 경우가 없습니다.
                </div> : <></>}
            </div>

        </div>
    );
}