import './index.css'
import * as React from 'react';
import axios from 'axios';
import UnionRaiderSetting from './UnionRaiderSetting';
import UnionRaiderSetting2 from './UnionRaiderSetting2';
import BlockType from './BlockType';
import { shuffle } from '../util/util'
import { BasicTable } from './Table';
import WebWorker from '../util/worker'
import worker from './UnionWorker'

// let unionWorker = new WebWorker(worker)
const unionWorkerContext = React.createContext(new WebWorker(worker))

export const UnionRaider = () => {
  // const [charOverall, setCharOverall] = React.useState('-')
  const param = { nickname: '뉴비섀' }
  const blockType = new BlockType();
  const defaultTable =
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]
  // [
  //   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  //   [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  //   [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  //   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  // ]

  // [
  //   [1, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 1],]

  // [
  //   [1,1,1,1,1],
  //   [1,1,1,1,1],
  //   [1,1,1,1,1],
  //   [1,1,1,1,1],
  //   [1,1,1,1,1]]


  const [table, setTable] = React.useState(defaultTable)
  const defaultTableStyle = blockType.getDefaultTableStyle(defaultTable)
  const [tableStyle, setTableStyle] = React.useState(defaultTableStyle)
  const [result, setResult] = React.useState(null)
  const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(false)
  const [pauseButtonHidden, setPauseButtonHidden] = React.useState(true)
  const [continueButtonHidden, setContinueButtonHidden] = React.useState(true)
  const [resetButtonHidden, setResetButtonHidden] = React.useState(true)
  const [responseUnionBlock, setResponseUnionBlock] = React.useState([])


  const handleFormSubmit = (e) => {
    unionWorker.postMessage({unionBlock: responseUnionBlock, table: table, cnt: 1})
    setSubmitButtonDisabled(true)
    setPauseButtonHidden(false)
    setContinueButtonHidden(true)
    setResetButtonHidden(true)
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
    setSubmitButtonDisabled(false)
    setPauseButtonHidden(true)
    setContinueButtonHidden(true)
    setResetButtonHidden(true)
    setResult(null)
  }

  const unionWorker = React.useContext(unionWorkerContext)
  const requestParam = {}
  // let users = [1,3,4,2,2,4,5]
  React.useEffect(() => {
    axios.get('/api/char/overall', { params: param })
      .then(response => {
        console.log(response.data)
        setResponseUnionBlock(response.data.userUnionRaiderResponse.unionBlock)
      })
      .catch(error => console.log(error))

    // unionWorker = new WebWorker(worker)
    // unionWorker.postMessage(1);
    

    unionWorker.addEventListener('message', (event) => {
      const sortedList = event.data;
      // console.log('listener executing')
      setResult(sortedList);
    });

    // const setting = new UnionRaiderSetting2(e.data.unionBlock, JSON.parse(JSON.stringify(e.data.table)))
    // setting.parseRaider()
    // console.log('parse blocks Size= ', setting.blocksSize)
    // console.log('parse blocks= ', setting.blocks)
    // console.log('parse blocks binary = ', setting.blocksBinary)
    // console.log('parse count = ', setting.blocksCount)
    // setting.classify()
    // console.log('result count = ', setting.resultBlocksCount)
    // console.log('result table= ', setting.resultTable)
    // console.log('result domiBlocks=', setting.resultDomiBlocks)
    // setting.setTableStyleValue()
    // setTableStyle(blockType.getTableStyle(setting.resultTableStyleValue))

    return () => {
      unionWorker.terminate()
      console.log('worker terminate')
    }
  }, []);


  return (
    <div>
      <BasicTable value={table} style={tableStyle}></BasicTable>
      {/* <button onClick={handleClick(testInput, unionWorker, setResult)}>Calculate in Web Worker</button> */}
      <div><Button action={handleFormSubmit} disabled={submitButtonDisabled} title="submit"></Button></div>
      <div><Button action={handleFormPause} disabled={pauseButtonHidden} title="pause"></Button></div>
      <div><Button action={handleFormContinue} disabled={continueButtonHidden} title="continue"></Button></div>
      <div><Button action={handleFormReset} disabled={resetButtonHidden} title="reset"></Button></div>
      <div>{result}</div>

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


