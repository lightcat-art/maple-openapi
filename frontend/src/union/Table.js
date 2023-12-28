import * as React from 'react';
import './table.css'


// 상위 컴포넌트의 props를 props key 별로 받으려면 {}를 작성해줘야함. 그렇지 않으면 모든 props 가 한번에 map형태로 오게된다.
export function BasicTable({ value, style }) {
    console.log('style = ', style);


    return (

        <table className='table'
            style={{borderSpacing: '0px'}}
        >
            <tbody>
                {style.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                    {row.map((v, columnIndex) => (
                        <td className='table-cell' key={columnIndex} style={v}> </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>

    );
}