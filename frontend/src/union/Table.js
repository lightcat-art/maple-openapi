import * as React from 'react';


// 상위 컴포넌트의 props를 props key 별로 받으려면 {}를 작성해줘야함. 그렇지 않으면 모든 props 가 한번에 map형태로 오게된다.
export function BasicTable({ style }) {

    // This array defines [iniRow, iniCol, endRow, endCol]
    // const [select, setSelect] = React.useState([null,null,null,null])
    const [select, setSelect] = React.useState([])

    // This variable will control if the user is dragging or not
    const [drag, setDrag] = React.useState(false)

    const handleMouseDown = (e, row, col) => {
        console.log('handleMouseDown : ', row, ', ', col)
        console.log('handleMouseDown : select = ',select)
        setDrag(true);
        setSelect([row, col, row, col]);
    }

    const handleMouseUp = (e, row, col) => {
        console.log('handleMouseUp : ', row, ', ', col)
        setDrag(false)
    }

    const handleMultipleSel = (e, row, col) => {
        console.log('handleMultipleSel : ', row, ', ', col)
        console.log('handleMultipleSel : select = ',select)
        e.preventDefault();
    
        if(drag){
        
            let [iniRow, iniCol, endRow, endCol] = select;
            
            if(iniRow <= row && iniCol <= col)
                setSelect([iniRow, iniCol, row, col]);
            
            if(iniRow >= row && iniCol >= col)
                setSelect([row, col, endRow, endCol]);
            
        }
    }

    // 드래그하는 도중 전체 테이블셀을 계속 스캔
    const getClassName = (row, col) => {
        console.log('getClassName : ', row, ', ', col)
        // for (let i=0; i<select.length; i++){
        //     if ( row === select[i][0] && row === select[i][1]) {
        //         return 'Selected'
        //     }
        // }
        let [iniRow, iniCol, endRow, endCol] = select;

        if (row >= iniRow && row <= endRow && col >= iniCol && col <= endCol) {
            return 'Selected';
        }

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
                                key={j} style={v}>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

    );
}