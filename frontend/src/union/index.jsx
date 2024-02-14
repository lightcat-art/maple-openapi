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
import { useParams, useOutletContext } from 'react-router-dom'
import { Menu, TABLE_ROW_LEN, TABLE_COL_LEN } from '../common'
import { Button, AfterImageButton } from '../common/clickable'
import { CharMenu } from '../character';
import { LoadingTable } from '../common';


let unionWorker = new WebWorker().getUnionWorker(worker)
let loadingDone = false

// hover 와 select를 비활성화 하고, 
export const PROCESS_INIT = -2 // 초기 테이블 생성 단계
export const PROCESS_ALGO = 0 // 알고리즘 배치 시작 이후
export const PROCESS_READY = -1 // 유저 테이블 가져오기 단계 또는 셀 선택 단계
export const PROCESS_FAIL = -99

let blockColor = []
for (let i = 100; i <= 1500; i += 100) {
  const varName = '--block-color-' + i
  blockColor.push(getCSSProp(document.documentElement, varName))
}
const regionBorderWidth = getCSSProp(document.documentElement, '--region-border-width')
const blockBorderWidth = getCSSProp(document.documentElement, '--block-border-width')
const cellSelectedColor = getCSSProp(document.documentElement, '--cell-selected-color')
const cellNotSelectedColor = getCSSProp(document.documentElement, '--cell-not-selected-color')
const blockColorOrigin = getCSSProp(document.documentElement, '--block-color-origin')
const blockColorOriginBorder = getCSSProp(document.documentElement, '--block-color-origin-bd')

export const UnionRaider = () => {
  const { cname } = useParams();
  const param = { nickname: cname }
  const [charInfo, loading] = useOutletContext();
  console.log('unionraider charinfo = ', charInfo)
  console.log('unionraider loading = ', loading)
  const blockType = new BlockType(blockColor, cellSelectedColor, cellNotSelectedColor, blockColorOrigin, blockColorOriginBorder);

  const [table, setTable] = React.useState(Array.from(Array(TABLE_ROW_LEN), () => Array(TABLE_COL_LEN).fill(0)))
  const defaultTableStyle = Array.from(Array(TABLE_ROW_LEN), () => Array(TABLE_COL_LEN).fill({}))
  const [tableStyle, setTableStyle] = React.useState(defaultTableStyle)
  const [result, setResult] = React.useState(null)
  const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(true)
  const [pauseButtonHidden, setPauseButtonHidden] = React.useState(true)
  const [continueButtonHidden, setContinueButtonHidden] = React.useState(true)
  const [resetButtonHidden, setResetButtonHidden] = React.useState(true)
  const [responseUnionBlock, setResponseUnionBlock] = React.useState([])
  const [regionMode, setRegionMode] = React.useState(false) // 지역선택모드인지, 단일셀 선택모드인지 세팅
  const [realTimeRender, setRealTimeRender] = React.useState(false) // 실시간 보기 세팅
  const [processType, setProcessType] = React.useState(PROCESS_INIT)
  const [useProcess, setUseProcess] = React.useState(localStorage.getItem("useProcess") ? JSON.parse(localStorage.getItem("useProcess")) : false) // 유니온 배치프로세스 선택 모드
  const [useProcessDisabled, setUseProcessDisabled] = React.useState(false)
  const handleUseProcess = () => {
    setUseProcess(!useProcess)
  }

  const handleFormSubmit = (e) => {
    unionWorker = new WebWorker().getUnionWorker(worker)
    unionWorker.postMessage({ unionBlock: responseUnionBlock, table: table, cnt: 1 })
    setProcessType(PROCESS_ALGO)
    setSubmitButtonDisabled(true)
    setPauseButtonHidden(true)
    setContinueButtonHidden(true)
    setResetButtonHidden(false)
    setUseProcessDisabled(true)
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
    setTableStyle(defaultTableStyle)
    setSubmitButtonDisabled(false)
    setPauseButtonHidden(true)
    setContinueButtonHidden(true)
    setResetButtonHidden(true)
    setUseProcessDisabled(false)
  }

  React.useEffect(() => {
    loadingDone = false
  }, [])

  // let users = [1,3,4,2,2,4,5]
  React.useEffect(() => {

    unionWorker.addEventListener('message', (event) => {
      const result = event.data;
      if (result) {
        if (result.count) {
          if (result.count === PROCESS_FAIL) {
            alert('fail to find root')
          } else {
            console.log('result count=',result.count)
            setProcessType(result.count)
            if (result.domiBlocks) {
              const styleValue = blockType.setTableStyleValue(result.table, result.domiBlocks)
              const tableStyle = blockType.getTableStyle(styleValue)
              setTableStyle(tableStyle);
            }
          }
        }
      }
    });

  }, [unionWorker]);

  React.useEffect(() => {
    // console.log('useProcess change check. useProcess=',useProcess,', table =',table)
    if (useProcess) {
      if (charInfo) {
        setResponseUnionBlock(charInfo.userUnionRaiderResponse.unionBlock)
      }
      if (localStorage.getItem('tableSelect')) {
        setTableStyle(blockType.getTableStyle(JSON.parse(localStorage.getItem('tableSelect'))))
      } else {
        setTableStyle(defaultTableStyle)
      }
      setSubmitButtonDisabled(false)
      setResetButtonHidden(true)
    } else {
      if (charInfo) {
        setResponseUnionBlock(charInfo.userUnionRaiderResponse.unionBlock)
        let domiBlocks = []
        charInfo.userUnionRaiderResponse.unionBlock.forEach((block) => {
          domiBlocks.push(blockType.transformPosition(block.blockPosition, TABLE_ROW_LEN / 2, TABLE_COL_LEN / 2))
        })
        // const styleValue = blockType.setTableStyleValue(table, domiBlocks)
        // setTableStyle(blockType.getTableStyle(styleValue))
        setTableStyle(blockType.getUserInfoStyle(TABLE_ROW_LEN, TABLE_COL_LEN, domiBlocks));

        /**
         * 초기 processCount를 지정하지 않아도 charInfo가 변하면 loading도 변하게 되어있으므로 charInfo 종속성 처리 이후 loading 종속성 처리 rerendering됨.
         * 따라서 처음 프로세스 카운트는 지정하지 않는다.
         */
        // setProcessCount(USER_PROCESS_COUNT) // 초기 구역경계선 스타일 설정을 위해 프로세스 카운트 설정 (따로 변수를 만들수도 있는데 기존 변수를 이용)
      } else {
        // console.log('charinfo not exist')
      }
      setSubmitButtonDisabled(true)
      setResetButtonHidden(true)
    }
    localStorage.setItem("useProcess", JSON.stringify(useProcess))
    setProcessType(PROCESS_READY)
  }, [charInfo, useProcess])

  React.useEffect(() => {
    // console.log('resetButtonHidden=', resetButtonHidden, ', processCount=', processCount, ', loading=', loading, ', tableStyle=', tableStyle)
    // if (processType >= PROCESS_READY) {
      drawRegion(TABLE_ROW_LEN, TABLE_COL_LEN)
    // }
    if (!loading && !loadingDone) {
      loadingDone = true
      // if (charInfo) {
      // setSubmitButtonDisabled(false)
      // }
    }
  }, [resetButtonHidden, processType, loading, tableStyle]);


  return (
    <>
      <CharMenu page='union'></CharMenu>
      <div className="container-fluid" >
        <BasicTable
          table={table}
          setTable={setTable}
          style={{ paddingTop: '30px', paddingBottom: '30px' }}
          tableStyle={tableStyle}
          submitDisabled={submitButtonDisabled}
          regionMode={regionMode}
          processType={processType}>
        </BasicTable>
        <div className="use-process-btn-wrapper text-center">
          <AfterImageButton className="use-process-btn ps-3" action={handleUseProcess}
            disabled={useProcessDisabled}
            title={useProcess ? '내 정보 보기' : '자동 배치 모드'}>
          </AfterImageButton>
        </div>
        <div className="row justify-content-center" style={{ marginTop: '20px' }}>
          <div className="col-2"></div>
          <div className="col-auto">
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

    </>
  )
}

export function getCellDOM(row, col) {
  return document.getElementById("union-table").getElementsByTagName("tr")[row].getElementsByTagName("td")[col]
}

function drawRegion(rowLen, colLen) {

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

  if (cellDOM.className.includes('block') && nearCellDOM.className.includes('block')) { // 자기도 블록이고 주변도 블록일시
    return blockBorderWidth
  } else if (!cellDOM.className.includes('block') && !nearCellDOM.className.includes('block')) { // 자기와 주변이 모두 블록이 아닐시
    return regionBorderWidth
  } else { // 자기 또는 주변중 하나가 블록일시
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
