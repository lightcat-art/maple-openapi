import { all } from 'axios';
import * as React from 'react';

const regionInfo = []

function regionDef() {
    const rowLen = 20
    const colLen = 22
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
    console.log('regionInfo = ',regionInfo)
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

regionDef()


// 상위 컴포넌트의 props를 props key 별로 받으려면 {}를 작성해줘야함. 그렇지 않으면 모든 props 가 한번에 map형태로 오게된다.
export function BasicTable({ style, setTable, submit, regionMode }) {
    const [select, setSelect] = React.useState([])
    // const [regionSelect, setRegionSelect] = React.useState([])
    // This variable will control if the user is dragging or not
    const [drag, setDrag] = React.useState(false)
    const [selectMode, setSelectMode] = React.useState(true) // 선택모드 인지, 해제모드 인지 세팅


    React.useEffect(() => {
        const selectedElement = Array.from(
            document.getElementsByClassName('selected')
        );
        let table = Array.from(new Array(style.length), () => new Array(style[0].length).fill(0))
        for (var value of selectedElement.values()) {
            let [row, col] = value.getAttribute('uniqkey').split('-');
            table[row][col] = 1
        }
        setTable(table)
    }, [select]);



    const handleMouseDown = (e, row, col) => {

        if (submit) {
            setDrag(false)
            return
        } else {
            setDrag(true)
        }
        let cellExist = false
        let cellIdx = -1
        const regionCells = getRegionCells(checkRegion(row, col))
        for (let i = 0; i < select.length; i++) {
            if (row === select[i][0] && col === select[i][1]) {
                cellExist = true
                cellIdx = i
            }
        }

        if (regionMode) {
            if (!cellExist) {
                setSelectMode(true)
                for (const regionCell of regionCells) {
                    const regionCellIdx = select.indexOf(regionCell)
                    console.log('mousedown select true regionCellIdx = ',regionCellIdx)
                    if (regionCellIdx < 0) {
                        select.push(regionCell)
                    }
                }
                setSelect([...select])
            } else {
                setSelectMode(false)
                for (const regionCell of regionCells) {
                    const regionCellIdx = select.indexOf(regionCell)
                    console.log('mousedown select false regionCellIdx = ',regionCellIdx)
                    if (regionCellIdx >= 0 ) {
                        select.splice(regionCellIdx, 1)
                        
                    }
                }
                setSelect([...select])
            }
        } else {
            if (!cellExist) {
                setSelectMode(true)
                setSelect([...select, [row, col]])
            } else {
                setSelectMode(false)
                select.splice(cellIdx, 1)
                setSelect([...select])
            }
        }
        console.log('mousedown select=',select)
    }

    const handleMouseUp = (e, row, col) => {
        setDrag(false)
    }

    const handleMultipleSel = (e, row, col) => {
        e.preventDefault();

        if (drag) {

            let cellExist = false
            let cellIdx = -1
            const regionCells = getRegionCells(checkRegion(row, col))
            for (let i = 0; i < select.length; i++) {
                if (row === select[i][0] && col === select[i][1]) {
                    cellExist = true
                    cellIdx = i
                }
            }
    
            if (regionMode) {
                if (!cellExist && selectMode) {
                    // setSelectMode(true)
                    for (const regionCell of regionCells) {
                        const regionCellIdx = select.indexOf(regionCell)
                        if (regionCellIdx < 0) {
                            select.push(regionCell)
                        }
                    }
                    setSelect([...select])
                } else if (cellExist && !selectMode){
                    // setSelectMode(false)
                    for (const regionCell of regionCells) {
                        const regionCellIdx = select.indexOf(regionCell)
                        if (regionCellIdx >= 0 ) {
                            select.splice(regionCellIdx, 1)

                        }
                    }
                    setSelect([...select])
                }
            } else {
                if (!cellExist && selectMode) {
                    // setSelectMode(true)
                    setSelect([...select, [row, col]])
                } else if (cellExist && !selectMode){
                    // setSelectMode(false)
                    select.splice(cellIdx, 1)
                    setSelect([...select])
                }
            }
        }
        console.log('handleMultipleSel select=',select)
    }

    const handleMouseEnter = (e, row, col) => {

    }

    const handleMouseLeave = (e, row, col) => {

    }

    const preventOutsideDrag = (e) => {
        setDrag(false)
    }

    // 드래그하는 도중 전체 테이블셀을 계속 스캔
    const getClassName = (row, col) => {
        for (let i = 0; i < select.length; i++) {
            if (row === select[i][0] && col === select[i][1]) {
                return 'selected'
            }
        }
        return ''
    }

    return (
        <div
            // style={{ backgroundColor: '#b8b8b8', padding: 4 }}
            onMouseMove={(e) => preventOutsideDrag(e)}>
            <table id='union-table' className='union-table' onMouseMove={(e) => e.stopPropagation()}
            // style={{ borderSpacing: '0px' }}
            >
                <tbody className='union-table-body'>
                    {style.map((row, i) => (
                        <tr key={i}>
                            {row.map((v, j) => (
                                // <div className={`${getRegionClass(i, j)}`}>
                                <td
                                    onMouseDown={(e) => handleMouseDown(e, i, j)}
                                    onMouseUp={(e) => handleMouseUp(e, i, j)}
                                    onMouseMove={(e) => handleMultipleSel(e, i, j)}
                                    // onMouseEnter={(e) => handleMouseEnter(e, i, j)}
                                    // onMouseLeave={(e) => handleMouseLeave(e, i, j)}
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

    );
}