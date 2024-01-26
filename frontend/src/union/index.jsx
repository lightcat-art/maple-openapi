import './index.css'
import * as React from 'react';
import axios from 'axios';
import UnionRaiderSetting from './UnionRaiderSetting';
import BlockType from './BlockType';
import Util from '../util/util'
import { BasicTable } from './Table';
import WebWorker from '../util/worker'
import worker from './UnionWorker'
import { CheckBox, SwitchCheckBox } from '../common/checkBox'
import './index.css'
import { getCSSProp } from '../util/util'


let unionWorker = new WebWorker().getUnionWorker(worker)

let blockColor = []
for (let i = 100; i <= 1500; i += 100) {
  const varName = '--block-color-' + i
  blockColor.push(getCSSProp(document.documentElement, varName))
}
const regionBorderWidth = getCSSProp(document.documentElement, '--region-border-width')
const cellSelectedColor = getCSSProp(document.documentElement, '--cell-selected-color')

export const UnionRaider = () => {
  // const [charOverall, setCharOverall] = React.useState('-')
  const param = { nickname: '마하포드' }
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


  const handleFormSubmit = (e) => {
    unionWorker = new WebWorker().getUnionWorker(worker)
    unionWorker.postMessage({ unionBlock: responseUnionBlock, table: table, cnt: 1 })
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


  const requestParam = {}
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
        const styleValue = blockType.setTableStyleValue(result.table, result.domiBlocks)
        const tableStyle = blockType.getTableStyle(styleValue)
        console.log(tableStyle)
        setTableStyle(tableStyle);
      }
    });

  }, [unionWorker]);

  React.useEffect(() => {
    console.log('regionMode changed')
  }, [regionMode]);


  React.useEffect(() => {
    drawRegion(table)
  }, [resetButtonHidden]);


  return (
    <div>
      <BasicTable setTable={setTable} style={tableStyle} submit={submitButtonDisabled} regionMode={regionMode}></BasicTable>
      <div className="union-option">
        <SwitchCheckBox checked={regionMode} onChange={setRegionMode}>구역 선택</SwitchCheckBox>
        <SwitchCheckBox checked={realTimeRender} onChange={setRealTimeRender}>과정 보기</SwitchCheckBox>
        {/* <button onClick={handleClick(testInput, unionWorker, setResult)}>Calculate in Web Worker</button> */}
        <div><Button action={handleFormSubmit} disabled={submitButtonDisabled} title="submit"></Button></div>
        <div><Button action={handleFormPause} disabled={pauseButtonHidden} title="pause"></Button></div>
        <div><Button action={handleFormContinue} disabled={continueButtonHidden} title="continue"></Button></div>
        <div><Button action={handleFormReset} disabled={resetButtonHidden} title="reset"></Button></div>
        <div>{result}</div>
      </div>

    </div>
  )
}

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      display={props.hidden === true ? "none" : ""}
      className={props.type === "primary" ? "btn btn-primary rounded-pill" : "btn btn-secondary rounded-pill"}
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
  for (let e = 0; e < colLen / 2; e++) {
    if (e !== colLen / 2 - 1) {
      getCellDOM(e, e).style.borderTopWidth = regionBorderWidth
      getCellDOM(e, e).style.borderRightWidth = regionBorderWidth
      getCellDOM(rowLen - e - 1, e).style.borderBottomWidth = regionBorderWidth
      getCellDOM(rowLen - e - 1, e).style.borderRightWidth = regionBorderWidth
    }
    if (e !== colLen / 2 - 1) {
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
