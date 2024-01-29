import './index.css'
import * as React from 'react';
import axios from 'axios';
import UnionRaiderSetting from './UnionRaiderSetting';
import BlockType from './BlockType';
import { BasicTable } from './Table';
import WebWorker from '../util/worker'
import worker from './UnionWorker'
import { CheckBox, SwitchCheckBox } from '../common/checkBox'
import './index.css'
import { getCSSProp } from '../util/util.jsx'
import { useParams } from 'react-router-dom'
import { Menu } from '../common'


let unionWorker = new WebWorker().getUnionWorker(worker)

let blockColor = []
for (let i = 100; i <= 1500; i += 100) {
  const varName = '--block-color-' + i
  blockColor.push(getCSSProp(document.documentElement, varName))
}
const regionBorderWidth = getCSSProp(document.documentElement, '--region-border-width')
const blockBorderWidth = getCSSProp(document.documentElement, '--block-border-width')
const cellSelectedColor = getCSSProp(document.documentElement, '--cell-selected-color')

export const UnionRaider = () => {

  const { cname } = useParams();
  // const [charOverall, setCharOverall] = React.useState('-')
  const param = { nickname: cname }
  const blockType = new BlockType(blockColor, cellSelectedColor);

  const [table, setTable] = React.useState(Array.from(Array(20), () => Array(22).fill(0)))
  const defaultTableStyle = Array.from(Array(table.length), () => Array(table[0].length).fill({}))
  const [tableStyle, setTableStyle] = React.useState(defaultTableStyle)
  const [result, setResult] = React.useState(null)
  const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(false)
  const [pauseButtonHidden, setPauseButtonHidden] = React.useState(true)
  const [continueButtonHidden, setContinueButtonHidden] = React.useState(true)
  const [resetButtonHidden, setResetButtonHidden] = React.useState(true)
  const [responseUnionBlock, setResponseUnionBlock] = React.useState([])
  const [regionMode, setRegionMode] = React.useState(false) // 지역선택모드인지, 단일셀 선택모드인지 세팅
  const [realTimeRender, setRealTimeRender] = React.useState(false) // 실시간 보기 세팅
  const [processCount, setProcessCount] = React.useState(0)


  const handleFormSubmit = (e) => {
    unionWorker = new WebWorker().getUnionWorker(worker)
    unionWorker.postMessage({ unionBlock: responseUnionBlock, table: table, cnt: 1 })
    // setProcessCount(0)
    setSubmitButtonDisabled(true)
    setPauseButtonHidden(true)
    setContinueButtonHidden(true)
    setResetButtonHidden(false)
    e.preventDefault() // event의 클릭 기본동작 방지
    // 유니온 배치 작업이 완료되었는지 체크후 에러로 보이는 상황이라면 버튼락 풀기
    // setButtonDisabled(false)
    // window.scrollTo(0, 0) // 창 맨위로 이동
  }

  const handleFormPause = (e) => {
    setSubmitButtonDisabled(true)
    setPauseButtonHidden(true)
    setContinueButtonHidden(false)
    setResetButtonHidden(false)
  }

  const handleFormContinue = (e) => {
    setSubmitButtonDisabled(true)
    setPauseButtonHidden(false)
    setContinueButtonHidden(true)
    setResetButtonHidden(true)
  }

  const handleFormReset = (e) => {
    new WebWorker().clearUnionWorker()
    unionWorker = new WebWorker().getUnionWorker(worker)
    // setTable(table)
    setTableStyle(defaultTableStyle)
    console.log('worker terminate')
    setSubmitButtonDisabled(false)
    setPauseButtonHidden(true)
    setContinueButtonHidden(true)
    setResetButtonHidden(true)
    setResult(null)
  }


  // let users = [1,3,4,2,2,4,5]
  React.useEffect(() => {
    axios.get('/api/char/overall', { params: param })
      .then(response => {
        console.log(response.data)
        setResponseUnionBlock(response.data.userUnionRaiderResponse.unionBlock)
        // const setting = new UnionRaiderSetting2(response.data.userUnionRaiderResponse.unionBlock, JSON.parse(JSON.stringify(table)))
      })
      .catch(error => console.log(error))



    unionWorker.addEventListener('message', (event) => {
      const result = event.data;
      // console.log('listener executing')
      // console.log('result = ', result)
      // setTable(table)
      if (result) {
        if (result.count) {
          setProcessCount(result.count)
        }
        if (result.domiBlocks) {
          const styleValue = blockType.setTableStyleValue(result.table, result.domiBlocks)
          const tableStyle = blockType.getTableStyle(styleValue)
          console.log(tableStyle)
          setTableStyle(tableStyle);
        }

      }
    });

  }, [unionWorker]);

  React.useEffect(() => {

  }, [])

  React.useEffect(() => {
    console.log('regionMode changed')
  }, [regionMode]);


  React.useEffect(() => {
    drawRegion(table)
  }, [resetButtonHidden, processCount]);


  return (
    <div className="container-fluid">
      {/* <Menu item='not-home'/> */}
      <BasicTable setTable={setTable} style={{marginTop: '30px'}} tableStyle={tableStyle} submit={submitButtonDisabled} regionMode={regionMode}></BasicTable>
      <div className="row justify-content-md-center" style={{ marginTop: '20px' }}>
        <div className="col-2"></div>
        <div className="col-md-auto">
          <SwitchCheckBox checked={regionMode} onChange={setRegionMode}>구역 선택</SwitchCheckBox>
          {/* <SwitchCheckBox checked={realTimeRender} onChange={setRealTimeRender}>과정 보기</SwitchCheckBox> */}
          <div className="text-center">
            <Button className='start' action={handleFormSubmit} disabled={submitButtonDisabled} title="시작" style={{ marginTop: '10px', width: '70px' }}></Button>
          </div>
          {/* <div><Button action={handleFormPause} disabled={pauseButtonHidden} title="pause"></Button></div>
          <div><Button action={handleFormContinue} disabled={continueButtonHidden} title="continue"></Button></div> */}
          <div className="text-center">
            <Button className='reset' action={handleFormReset} disabled={resetButtonHidden} title="리셋" style={{ marginTop: '10px', width: '70px' }}></Button>
          </div>
          <div>{result}</div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  )
}

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      display={props.hidden === true ? "none" : ""}
      // className={props.type === "primary" ? "btn btn-primary rounded-pill" : "btn btn-secondary rounded-pill"}
      className={`btn btn-secondary rounded-pill ${props.className}`}
      onClick={props.action}
      style={props.style}
    >
      {props.title}
    </button>
  )
}

export function getCellDOM(row, col) {
  return document.getElementById("union-table").getElementsByTagName("tr")[row].getElementsByTagName("td")[col]
}

function drawRegion(table) {
  const rowLen = table.length
  const colLen = table[0].length

  // tabe style이 들어오는거 인식하네..? tablestyle과 lastResult state는 같은 단계에서 설정되므로 
  // 그다음 lastResult state 변경을 감지할땐 tablestyle도 같이 렌더링된 이후이다. 따라서 인식이 되는것.
  // 이걸로 블록 테두리 관리하자.
  if (!checkBlockExist(rowLen, colLen)) {
    for (let e = 0; e < colLen / 2; e++) {
      if (e !== colLen / 2 - 1) {
        getCellDOM(e, e).style.borderTopWidth = regionBorderWidth
        getCellDOM(e, e).style.borderRightWidth = regionBorderWidth
        getCellDOM(rowLen - e - 1, e).style.borderBottomWidth = regionBorderWidth
        getCellDOM(rowLen - e - 1, e).style.borderRightWidth = regionBorderWidth
        getCellDOM(e, colLen - e - 1).style.borderTopWidth = regionBorderWidth
        getCellDOM(e, colLen - e - 1).style.borderLeftWidth = regionBorderWidth
        getCellDOM(rowLen - e - 1, colLen - e - 1).style.borderBottomWidth = regionBorderWidth
        getCellDOM(rowLen - e - 1, colLen - e - 1).style.borderLeftWidth = regionBorderWidth
      }
    }
    for (let e = 0; e < rowLen; e++) {
      // getCellDOM(e, 0).style.borderLeftWidth = regionBorderWidth
      getCellDOM(e, colLen / 2).style.borderLeftWidth = regionBorderWidth
      // getCellDOM(e, colLen - 1).style.borderRightWidth = regionBorderWidth
    }
    for (let e = 0; e < colLen; e++) {
      // getCellDOM(0, e).style.borderTopWidth = regionBorderWidth
      getCellDOM(rowLen / 2, e).style.borderTopWidth = regionBorderWidth
      // getCellDOM(rowLen - 1, e).style.borderBottomWidth = regionBorderWidth
    }
    for (let e = rowLen / 4; e < 3 * rowLen / 4; e++) {
      getCellDOM(e, Math.floor(colLen / 4)).style.borderLeftWidth = regionBorderWidth
      getCellDOM(e, Math.floor(3 * colLen / 4)).style.borderRightWidth = regionBorderWidth
    }
    for (let e = Math.ceil(colLen / 4); e < Math.floor(3 * colLen / 4); e++) {
      getCellDOM(rowLen / 4, e).style.borderTopWidth = regionBorderWidth
      getCellDOM(3 * rowLen / 4, e).style.borderTopWidth = regionBorderWidth
    }
  }
  else {
    // 블록이 존재한다면 처음 렌더링은 아니란 뜻이므로 아예 산정되지 않은 블록은 굳이 스타일 바꿀 필요는 없긴한데..
    // 어차피 빈블록인지 아닌지까지 조건식으로 다 따져야 하므로 전체적으로 프로세스시간은 비슷할듯.
    for (let e = 0; e < colLen / 2; e++) {
      if (e !== colLen / 2 - 1) {
        drawRegionByBlock(rowLen, colLen, e, e, 'top')
        drawRegionByBlock(rowLen, colLen, e, e, 'right')
        drawRegionByBlock(rowLen, colLen, rowLen - e - 1, e, 'bottom')
        drawRegionByBlock(rowLen, colLen, rowLen - e - 1, e, 'right')
        drawRegionByBlock(rowLen, colLen, e, colLen - e - 1, 'top')
        drawRegionByBlock(rowLen, colLen, e, colLen - e - 1, 'left')
        drawRegionByBlock(rowLen, colLen, rowLen - e - 1, colLen - e - 1, 'bottom')
        drawRegionByBlock(rowLen, colLen, rowLen - e - 1, colLen - e - 1, 'left')
      }
    }
    for (let e = 0; e < rowLen; e++) {
      drawRegionByBlock(rowLen, colLen, e, colLen / 2, 'left')
    }
    for (let e = 0; e < colLen; e++) {
      drawRegionByBlock(rowLen, colLen, rowLen / 2, e, 'top')
    }
    for (let e = rowLen / 4; e < 3 * rowLen / 4; e++) {
      drawRegionByBlock(rowLen, colLen, e, Math.floor(colLen / 4), 'left')
      drawRegionByBlock(rowLen, colLen, e, Math.floor(3 * colLen / 4), 'right')
    }
    for (let e = Math.ceil(colLen / 4); e < Math.floor(3 * colLen / 4); e++) {
      drawRegionByBlock(rowLen, colLen, rowLen / 4, e, 'top')
      drawRegionByBlock(rowLen, colLen, 3 * rowLen / 4, e, 'top')
    }
  }

}

/**
   * 1. 자기도 블록이고 주변에 블록이 있으면 1px
   *    - top/bottom/left/right 의 테두리를 변경하는 경우 위/아래/왼/오른쪽에 block이 있으면 1px
   * 
   * 2. 자기는 블록이 아니지만 주변에 블록이 있거나, 자기는 블록이지만 주변에 블록이 아닐경우 : 3px 로 할지 1px로 할지 두개 다 테스트 해보기.
   * 3. 자기도 블록이 아니고 주변에 블록이 없다면 3px
 * @param {*} table
 * @param {*} row 
 * @param {*} col 
 * @param {*} direction
 */
function drawRegionByBlock(rowLen, colLen, row, col, direction) {
  let cellDOM = getCellDOM(row, col)
  let nearCellDOM = null
  const top = 'top'
  const left = 'left'
  const right = 'right'
  const bottom = 'bottom'
  if (direction === top && (row - 1) >= 0) {
    nearCellDOM = getCellDOM(row - 1, col)
    const borderWidth = checkBorderWidth(cellDOM, nearCellDOM)
    changeBorderWidth(cellDOM, top, borderWidth)
  } else if (direction === left && (col - 1) >= 0) {
    nearCellDOM = getCellDOM(row, col - 1)
    const borderWidth = checkBorderWidth(cellDOM, nearCellDOM)
    changeBorderWidth(cellDOM, left, borderWidth)
  } else if (direction === right && (col + 1) < colLen) {
    nearCellDOM = getCellDOM(row, col + 1)
    const borderWidth = checkBorderWidth(cellDOM, nearCellDOM)
    changeBorderWidth(cellDOM, right, borderWidth)
  } else if (direction === bottom && (row + 1) < rowLen) {
    nearCellDOM = getCellDOM(row + 1, col)
    const borderWidth = checkBorderWidth(cellDOM, nearCellDOM)
    changeBorderWidth(cellDOM, bottom, borderWidth)
  }
}

function checkBorderWidth(cellDOM, nearCellDOM) {
  if (cellDOM.className.includes('block') && nearCellDOM.className.includes('block')) {
    return blockBorderWidth
  } else if (!cellDOM.className.includes('block') && !nearCellDOM.className.includes('block')) {
    return regionBorderWidth
  } else {
    return regionBorderWidth
  }
}

function changeBorderWidth(cellDOM, direction, borderWidth) {
  if (borderWidth) {
    if (direction === 'top') {
      cellDOM.style.borderTopWidth = borderWidth
    } else if (direction === 'bottom') {
      cellDOM.style.borderBottomWidth = borderWidth
    } else if (direction === 'left') {
      cellDOM.style.borderLeftWidth = borderWidth
    } else if (direction === 'right') {
      cellDOM.style.borderRightWidth = borderWidth
    }
  }
}

function checkBlockExist(rowLen, colLen) {
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (getCellDOM(i, j).className.includes('block')) {
        return true
      }
    }
  }
  return false
}
