import { all } from 'axios';
import * as React from 'react';


// 상위 컴포넌트의 props를 props key 별로 받으려면 {}를 작성해줘야함. 그렇지 않으면 모든 props 가 한번에 map형태로 오게된다.
export function BasicTable({ style, setTable, submit }) {
    const [select, setSelect] = React.useState([])
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
        let exist = false
        let idx = null
        for (let i = 0; i < select.length; i++) {
            if (row === select[i][0] && col === select[i][1]) {
                exist = true
                idx = i
            }
        }
        if (!exist) {
            setSelectMode(true)
            setSelect([...select, [row, col]])
        } else {
            setSelectMode(false)
            select.splice(idx, 1)
            setSelect([...select])
        }
    }

    const handleMouseUp = (e, row, col) => {
        setDrag(false)
    }

    const handleMultipleSel = (e, row, col) => {
        e.preventDefault();

        if (drag) {
            let exist = false
            let idx = null
            for (let i = 0; i < select.length; i++) {
                if (row === select[i][0] && col === select[i][1]) {
                    exist = true
                    idx = i
                }
            }
            if (!exist && selectMode) {
                setSelect([...select, [row, col]])
            } else if (exist && !selectMode) {
                select.splice(idx, 1)
                setSelect([...select])
            }

        }
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


    function getRegionClassName(row, col) {
        if ((row === 0 || row === 1 || row === 2) && col === 0) {
            // console.log('region-cell-top')
            return 'region-cell-top'
        } else if (row === 0 && (col === 4 || col === 5)) {
            // console.log('region-cell-bottom')
            return 'region-cell-bottom'
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