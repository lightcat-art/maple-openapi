import { all } from 'axios';
import * as React from 'react';


// 상위 컴포넌트의 props를 props key 별로 받으려면 {}를 작성해줘야함. 그렇지 않으면 모든 props 가 한번에 map형태로 오게된다.
export function BasicTable({ style , setTable}) {

    // This array defines [iniRow, iniCol, endRow, endCol]
    // const [select, setSelect] = React.useState([null,null,null,null])
    const [select, setSelect] = React.useState([])
    const [selectMode, setSelectMode] = React.useState(true) // 선택모드 인지, 해제모드 인지 세팅
    // const [selectClassCache, setSelectClassCache] = React.useState(new Array(style.length), ()=> new Array(style[0].length).fill(''))

    // This variable will control if the user is dragging or not
    const [drag, setDrag] = React.useState(false)
    const [selectedRowCol, setSelectedRowCol] = React.useState([])


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
        setDrag(true);
        // setSelect([row, col, row, col]);
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
        <table className='union-table'
        // style={{ borderSpacing: '0px' }}
        >
            <tbody>
                {style.map((row, i) => (
                    <tr key={i}>
                        {row.map((v, j) => (
                            <td
                                onMouseDown={(e) => handleMouseDown(e, i, j)}
                                onMouseUp={(e) => handleMouseUp(e, i, j)}
                                onMouseMove={(e) => handleMultipleSel(e, i, j)}
                                className={`union-table-cell ${getClassName(i, j)}`}
                                key={`${j}`} style={v} uniqkey={`${i}-${j}`}>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

    );
}