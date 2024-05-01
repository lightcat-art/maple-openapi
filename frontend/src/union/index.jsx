import './index.css'
import * as React from 'react';
import BlockManager from './BlockManager';
import { BasicTable } from './Table';


import './index.css'
import { getCSSProp, removeDupND } from '../util/util.jsx'
import { useParams, useOutletContext } from 'react-router-dom'
import { TABLE_ROW_LEN, TABLE_COL_LEN, ContentLayout } from '../common'
import { AfterImageButton, AfterImageBadgeLight } from '../common/clickable'
import { Divider } from '../common/divider.jsx'
import { CharMenu } from '../character';
import decreaseIcon from '../static/icons/chevron_left_FILL0_wght400_GRAD0_opsz20.svg'
import increaseIcon from '../static/icons/chevron_right_FILL0_wght400_GRAD0_opsz20.svg'
import { Tooltip } from 'react-tooltip'
import axios from 'axios';
import { UnionGradeImage } from '../common/image.jsx'

const backDomain = process.env.REACT_APP_BACK_URL || ''

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
const regionLimitBorder = getCSSProp(document.documentElement, '--region-limit-border')

export const UnionRaider = () => {
  const [loading, setLoading] = React.useState(true)
  const [charUnionInfo, setCharUnionInfo, unionLoading, setUnionLoading, drag, setDrag] = useOutletContext();
  console.log('charUnionInfo = ', charUnionInfo);
  const blockManager = new BlockManager(blockColor, cellSelectedColor, cellNotSelectedColor, blockColorOrigin, blockColorOriginBorder, regionLimitBorder);
  const { cname } = useParams();
  const param = { nickname: cname }

  const defaultTableStyle = Array.from(Array(TABLE_ROW_LEN), () => Array(TABLE_COL_LEN).fill({}))
  const [tableStyle, setTableStyle] = React.useState(defaultTableStyle)
  const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(true)
  // const [pauseButtonHidden, setPauseButtonHidden] = React.useState(true)
  // const [continueButtonHidden, setContinueButtonHidden] = React.useState(true)
  const [resetButtonHidden, setResetButtonHidden] = React.useState(true)
  const [responseUnionBlock, setResponseUnionBlock] = React.useState([])
  const [regionMode, setRegionMode] = React.useState(false) // 지역선택모드인지, 단일셀 선택모드인지 세팅
  // const [realTimeRender, setRealTimeRender] = React.useState(false) // 실시간 보기 세팅
  const [processType, setProcessType] = React.useState(PROCESS_INIT)
  const [useProcess, setUseProcess] = React.useState(localStorage.getItem("useProcess") ? JSON.parse(localStorage.getItem("useProcess")) : false) // 유니온 배치프로세스 선택 모드
  const [isStart, setIsStart] = React.useState(false)
  const [useProcessDisabled, setUseProcessDisabled] = React.useState(false)
  const [blockCount, setBlockCount] = React.useState(Array.from(Array(blockManager.baseBlockType.length).fill(0)))
  const [blockCountDisabled, setBlockCountDisabled] = React.useState(Array.from(Array(blockManager.baseBlockType.length).fill(false)))
  const [blockDesc, setBlockDesc] = React.useState([])
  const [initSelectDisabled, setInitSelectDisabled] = React.useState(false)
  const [isProcessFail, setIsProcessFail] = React.useState(false)
  const [regionLimit, setRegionLimit] = React.useState(5);
  const [prevRegionLimit, setPrevRegionLimit] = React.useState(5);
  const [regionLimitDisabled, setRegionLimitDisabled] = React.useState([true, true]) // decrease, increase 같이 저장
  /** [top, bottom, left, right] 순으로 범위 지정
   * left : 해당 idx보다 작은 col은 제한
   * right: 해당 idx보다 크거나 같은 col은 제한
   * top: 해당 idx보다 작은 row는 제한
   * bottom: 해당 idx보다 크거나 같은 row는 제한
   *  */
  const [regionLimitIdx, setRegionLimitIdx] = React.useState([0, TABLE_ROW_LEN, 0, TABLE_COL_LEN])
  // const [help, setHelp] = React.useState(false)
  // const tooltipRefMode = React.useRef(null)
  // const tooltipRefStart = React.useRef(null)
  // const tooltipRefRegionSelect = React.useRef(null)
  // const tooltipRefInitSelect = React.useRef(null)
  // const tooltipRefInitRegionLimit = React.useRef(null)
  // const tooltipRefControlRegionLimit = React.useRef(null)


  // const handleHelp = () => {
  //   if (help) {
  //     // 도움말 열린 상태이니, 닫힌 상태로 바꾸기
  //     tooltipRefMode.current?.close()
  //     tooltipRefStart.current?.close()
  //     tooltipRefRegionSelect.current?.close()
  //     tooltipRefInitSelect.current?.close()
  //     tooltipRefInitRegionLimit.current?.close()
  //   } else {

  //     // 도움말 닫힌상태이니, 도움말 열린 상태로 바꾸기
  //     tooltipRefMode.current?.open({
  //       anchorSelect: '.use-process-btn-wrapper',
  //       content:
  //         <div className='help-tooltip-elem'>
  //           내 정보 보기 : 내 유니온 점령정보를 확인할수 있습니다<br />
  //           자동 배치 모드 : 유니온을 쉽게 배치해주는 모드로 진입합니다
  //         </div>,
  //       place: 'top-end'

  //     })
  //     tooltipRefStart.current?.open({
  //       anchorSelect: '.start-wrapper',
  //       content:
  //         <div className='help-tooltip-elem'>
  //           현재 세팅된 정보를 바탕으로 자동 배치 모드를 시작합니다
  //         </div>,
  //       place: 'top-start'
  //     })
  //     tooltipRefRegionSelect.current?.open({
  //       anchorSelect: '.region-checkbox',
  //       content:
  //         <div className='help-tooltip-elem'>
  //           영역을 구역 단위로 지정할지, 셀 단위로 지정할지 설정합니다
  //         </div>,
  //       place: 'right'
  //     })
  //     tooltipRefInitSelect.current?.open({
  //       anchorSelect: '.init-select-wrapper',
  //       content:
  //         <div className='help-tooltip-elem'>
  //           현재 선택된 영역을 초기화합니다
  //         </div>,
  //     })
  //     tooltipRefInitRegionLimit.current?.open({
  //       anchorSelect: '.init-region-limit-wrapper',
  //       content:
  //         <div className='help-tooltip-elem'>
  //           외부지역 해금선을 현재 내 유니온 등급에 맞게 다시 초기화합니다
  //           ※ 점선이 테이블에 보이지 않으면 해금선은 5단계입니다
  //         </div>,
  //     })
  //   }
  //   setHelp(!help)
  // }

  const handleUseProcess = () => {
    if (useProcess) {
      setInitSelectDisabled(true)
    } else {
      setInitSelectDisabled(false)
    }
    setUseProcess(!useProcess)
  }

  const handleUseProcessForce = (useProcess) => {
    setUseProcess(useProcess)
    setInitSelectDisabled(!useProcess)
  }



  const handleBlockDecrease = (idx) => {
    setBlockCount(prev => {
      prev[idx]--
      return [...prev]
    })
  }

  const handleBlockIncrease = (idx) => {
    setBlockCount(prev => {
      prev[idx]++
      return [...prev]
    })
  }




  React.useEffect(() => {
    if (!charUnionInfo) {
      // charUnionInfo 존재여부 체크를 안해주어도 api call이 안되는데...? 흠... 일단 안전하게 존재여부 체크는 하자.
      // console.log('get union-all api')
      // axios.get('/api/char/union-all', { params: param })
      axios.get(`${backDomain}/api/char/union-all`, { params: param })
        .then(response => {
          setCharUnionInfo(response.data)
          setUnionLoading(false)

          if (!response.data) {
            // 강제로 알고리즘 배치 모드로 전환
            handleUseProcessForce(true)
          }

        })
        .catch(error => console.log(error));

    }
    if (useProcess) {
      setInitSelectDisabled(false)
    } else {
      setInitSelectDisabled(true)
    }
    // if (localStorage.getItem('regionLimit')) {
    //   setRegionLimit(Number(localStorage.getItem('regionLimit')))
    // }
  }, [])





  React.useEffect(() => {
    if (charUnionInfo) {
      setResponseUnionBlock(charUnionInfo.userUnionRaiderResponse.unionBlock) // blockCount가 알고리즘 입력으로 들어갈 준비가 되면 제거할 코드
      const extractMap = blockManager.getBlockCount(charUnionInfo.userUnionRaiderResponse.unionBlock)
      setBlockCount(extractMap.count)
      setBlockDesc(extractMap.desc)
      let domiBlocks = []
      charUnionInfo.userUnionRaiderResponse.unionBlock.forEach((block) => {
        domiBlocks.push(blockManager.transformPosition(block.blockPosition, TABLE_ROW_LEN / 2, TABLE_COL_LEN / 2))
      })


      let userPosSelect = removeDupND(domiBlocks.flat()).map((v) => JSON.stringify(v))
      const userInfoValue = blockManager.getUserInfoValue(TABLE_ROW_LEN, TABLE_COL_LEN, domiBlocks)
      localStorage.setItem(`positionSelect-${charUnionInfo.idResponse.ocid}`, JSON.stringify(userPosSelect))
      localStorage.setItem(`tableSelect-${charUnionInfo.idResponse.ocid}`, JSON.stringify(userInfoValue))

      if (localStorage.getItem(`regionLimit-${charUnionInfo.idResponse.ocid}`) && useProcess) {
        setRegionLimit(Number(localStorage.getItem(`regionLimit-${charUnionInfo.idResponse.ocid}`)))
      }
    }
  }, [charUnionInfo])

  React.useEffect(() => {
    let decreaseDisabled = []
    for (let i = 0; i < blockCount.length; i++) {
      if (blockCount[i] <= 0) {
        decreaseDisabled.push(true)
      } else {
        decreaseDisabled.push(false)
      }
    }
    setBlockCountDisabled(decreaseDisabled)
  }, [blockCount])

  React.useEffect(() => {
    let disabled = []
    if (regionLimit <= 0) {
      disabled = [true, false]
    } else if (0 < regionLimit && regionLimit < 5) {
      disabled = [false, false]
    } else {
      disabled = [false, true]
    }
    setRegionLimitDisabled(disabled)

    // 선택과 hover 기능이 제한될 좌표 등록
    setRegionLimitIdx(
      [TABLE_ROW_LEN / 4 - regionLimit,
      TABLE_ROW_LEN - TABLE_ROW_LEN / 4 + regionLimit,
      TABLE_ROW_LEN / 4 - regionLimit,
      TABLE_COL_LEN - TABLE_ROW_LEN / 4 + regionLimit]
    )
    if (regionLimit !== prevRegionLimit && charUnionInfo) {
      // 초기화 상태가 아닐때만 세팅
      localStorage.setItem(`regionLimit-${charUnionInfo.idResponse.ocid}`, regionLimit)
    }
    // console.log('regionLimit changes=', regionLimit)
  }, [regionLimit])

  const handleRegionLimitDecrease = () => {
    setRegionLimit(prev => {
      setPrevRegionLimit(prev)
      return prev - 1
    })
  }

  const handleRegionLimitIncrease = () => {
    setRegionLimit(prev => {
      setPrevRegionLimit(prev)
      return prev + 1
    })
  }

  const RegionLimit = () => {
    return (
      <div className="container region-limit">
        <div className="row">
          <div className="col-auto pt-1">
            <div className="region-limit-desc">
              외부지역
              <br />
              해금단계
            </div>
          </div>
          <AfterImageButton className="col-auto region-decrease" disabled={regionLimitDisabled[0] || !useProcess || isStart} action={() => handleRegionLimitDecrease()} imgsrc={<img className="decrease" src={decreaseIcon} alt=""></img>}></AfterImageButton>
          <div className="col-auto region-limit-step">{regionLimit}단계</div>
          <AfterImageButton className="col-auto region-increase" disabled={regionLimitDisabled[1] || !useProcess || isStart} action={() => handleRegionLimitIncrease()} imgsrc={<img className="increase" src={increaseIcon} alt=""></img>} />
          <div className="col-auto pt-1" data-tooltip-id='region-limit-tooltip'>
            <span className="material-symbols-outlined fill-thick-icon icon-gray">help</span>
          </div>
        </div>
      </div>
    )
  }


  React.useEffect(() => {
    // console.log('useProcess change check. useProcess=', useProcess, ', processType = ', processType, ', regionLimit=', regionLimit)

    if (useProcess) {
      const style = blockManager.getRegionLimitBorder(TABLE_ROW_LEN, TABLE_COL_LEN, regionLimitIdx)
      setTableStyle(style)
      setSubmitButtonDisabled(false)
      if (charUnionInfo) {
        if (!localStorage.getItem(`regionLimit-${charUnionInfo.idResponse.ocid}`)) {
          const initRegionLimit = getRegionLimit(charUnionInfo.userUnionResponse.unionLevel)
          localStorage.setItem(`regionLimit-${charUnionInfo.idResponse.ocid}`, initRegionLimit)
          setRegionLimit(initRegionLimit)
        } else {
          setRegionLimit(Number(localStorage.getItem(`regionLimit-${charUnionInfo.idResponse.ocid}`)))
        }
      }

    } else {
      if (charUnionInfo) {
        let domiBlocks = []
        charUnionInfo.userUnionRaiderResponse.unionBlock.forEach((block) => {
          domiBlocks.push(blockManager.transformPosition(block.blockPosition, TABLE_ROW_LEN / 2, TABLE_COL_LEN / 2))
        })
        const userInfoValue = blockManager.getUserInfoValue(TABLE_ROW_LEN, TABLE_COL_LEN, domiBlocks)
        setTableStyle(blockManager.getUserInfoStyle(TABLE_ROW_LEN, TABLE_COL_LEN, userInfoValue))
        /**
         * 초기 processCount를 지정하지 않아도 charInfo가 변하면 loading도 변하게 되어있으므로 charInfo 종속성 처리 이후 loading 종속성 처리 rerendering됨.
         * 따라서 처음 프로세스 카운트는 지정하지 않는다.
         */
        // setProcessCount(USER_PROCESS_COUNT) // 초기 구역경계선 스타일 설정을 위해 프로세스 카운트 설정 (따로 변수를 만들수도 있는데 기존 변수를 이용)
      }
      setSubmitButtonDisabled(true)
    }
    localStorage.setItem("useProcess", JSON.stringify(useProcess))
    setProcessType(PROCESS_READY)
  }, [charUnionInfo, useProcess])

  React.useEffect(() => {
    drawRegion(TABLE_ROW_LEN, TABLE_COL_LEN)
  }, [resetButtonHidden, processType, tableStyle]);

  const RegionLimitTooltip = () => {
    return (
      <Tooltip id='region-limit-tooltip' className='region-limit-tooltip' events={['hover']}>
        <div className='region-limit-tooltip-elem'>
          <AfterImageBadgeLight title='0단계'></AfterImageBadgeLight>
          <span className='col-auto level'> Lv.1 ~</span>
        </div>
        <div className='region-limit-tooltip-elem'>
          <AfterImageBadgeLight title='1단계'></AfterImageBadgeLight>
          <span className='col-auto level'> Lv.2000 ~</span>
        </div>
        <div className='region-limit-tooltip-elem'>
          <AfterImageBadgeLight title='2단계'></AfterImageBadgeLight>
          <span className='col-auto level'> Lv.3000 ~</span>
        </div>
        <div className='region-limit-tooltip-elem'>
          <AfterImageBadgeLight title='3단계'></AfterImageBadgeLight>
          <span className='col-auto level'> Lv.4000 ~</span>
        </div>
        <div className='region-limit-tooltip-elem'>
          <AfterImageBadgeLight title='4단계'></AfterImageBadgeLight>
          <span className='col-auto level'> Lv.5000 ~</span>
        </div>
        <div className='region-limit-tooltip-elem'>
          <AfterImageBadgeLight title='5단계'></AfterImageBadgeLight>
          <span className='col-auto level'> Lv.6000 ~</span>
        </div>


      </Tooltip>
    )
  }

  const HelpTooltip = () => {
    return (
      <Tooltip id='help-tooltip' className='help-tooltip' data-tooltip-place='bottom'>
        <div className='help-tooltip-elem'>

          <AfterImageBadgeLight title='이용 방법'></AfterImageBadgeLight>

          <span className='help-tooltip-desc'>
            <span> ㆍ </span>
            <span className='help-emp'> PC 버전</span>
            <span>으로만 이용가능합니다</span><br />
          </span>
          <div className='help-tooltip-desc'>
            <span>ㆍ인게임 기준 평균  </span>
            <span className='help-emp'>15분 정도 후 확인 가능</span>
            <span>합니다.</span><br />
          </div>
          <div className='help-tooltip-desc'>
            <span>ㆍ </span>
            <span className='help-emp'>2023년 12월 21일 이후에 접속</span>
            <span>한 캐릭터로만 조회할 수 있습니다.</span><br />
          </div>

          <div className='help-tooltip-desc'>
            <span>ㆍ점령하고 싶은 구역을 </span>
            <span className='help-emp'>우선순위가 가장 높은 지역부터 선택</span>
            <span>해주세요</span><br />
          </div>
          <div className='help-tooltip-desc'>
            <span>ㆍ자동 배치가 오래 걸림 / 배치 가능한 경우가 없음 / 원하는 지역이 점령되지 않는 경우 </span>
            <span className='help-emp'>우선순위가 낮은 구역을 제외하고 다시 시도</span>
            <span>해보세요</span><br />
          </div>
        </div>
        <Divider></Divider>
        <div className='help-tooltip-elem'>
          <AfterImageBadgeLight title='내 정보 보기 / 자동 배치 모드'></AfterImageBadgeLight>
          <div className='help-tooltip-desc'>
            ㆍ내 정보 보기 : 내 유니온 점령정보를 확인할수 있습니다<br />
            ㆍ자동 배치 모드 : 유니온을 쉽게 배치해주는 모드로 진입합니다
          </div>
        </div>
        {/* <Divider /> */}
        <div className='help-tooltip-elem'>
          <AfterImageBadgeLight title='구역 선택'></AfterImageBadgeLight>
          <div className='help-tooltip-desc'>
            ㆍ영역을 구역 단위로 지정할지, 셀 단위로 지정할지 설정합니다
          </div>
        </div>
        <div className='help-tooltip-elem'>
          <AfterImageBadgeLight title='선택 영역 초기화'></AfterImageBadgeLight>
          <div className='help-tooltip-desc'>
            ㆍ현재 선택된 영역을 초기화합니다
          </div>
        </div>
        <div className='help-tooltip-elem'>
          <AfterImageBadgeLight title='외부지역 해금단계 조정'></AfterImageBadgeLight>
          <div className='help-tooltip-desc'>
            ㆍ외부지역 해금선을 원하는 등급에 맞게 단계를 조정합니다
          </div>
          <div className='help-tooltip-desc'>
            ㆍ단계를 조정하여 설정할수 있는 최대 영역을 제한합니다.<br />
            ㆍ점선테두리로 표시됩니다.
          </div>
          <div className='help-tooltip-desc'>
            <span>※ </span><span className='help-emp'>점선이 테이블에 보이지 않으면 해금선은 5단계입니다</span>
          </div>
        </div>
        <div className='help-tooltip-elem'>
          <AfterImageBadgeLight title='외부지역 해금선 초기화'></AfterImageBadgeLight>
          <div className='help-tooltip-desc'>
            ㆍ외부지역 해금선을 현재 내 유니온 등급에 맞게 다시 초기화합니다<br />
          </div>
          <div className='help-tooltip-desc'>
            <span>※ </span><span className='help-emp'>점선이 테이블에 보이지 않으면 해금선은 5단계입니다</span>
          </div>
        </div>
        <div className='help-tooltip-elem'>
          <AfterImageBadgeLight title='시작'></AfterImageBadgeLight>
          <div className='help-tooltip-desc'>
            ㆍ현재 세팅된 정보를 바탕으로 자동 배치 모드를 시작합니다
          </div>
        </div>
      </Tooltip>
    )
  }

  const BlockCountContainer = (props) => {
    return (
      <div className={`container pt-1 block-count block-${props.idx} ${props.className ? props.className : ''}`} style={props.style} data-tooltip-id={`block-tooltip-${props.idx}`}>
        <div className="row justify-content-center">
          <div className={`col-auto ${props.blockClassName ? props.blockClassName : ''}`}>{baseBlock(props.idx)}</div>
          <AfterImageButton style={{ marginLeft: '70px' }} className="col-auto block-decrease" disabled={blockCountDisabled[props.idx]} action={() => handleBlockDecrease(props.idx)} imgsrc={<img className="decrease" src={decreaseIcon} alt=""></img>}></AfterImageButton>
          <div className="col-auto block-count-value">{blockCount[props.idx]}</div>
          <AfterImageButton className="col-auto block-increase" action={() => handleBlockIncrease(props.idx)} imgsrc={<img className="increase" src={increaseIcon} alt=""></img>} />
        </div>
      </div>
    )
  }

  const baseBlock = (idx) => {
    const block = blockManager.baseBlockType[idx]
    const blockColor = blockManager.blockTypeColor[idx]
    let maxRow = Math.max(...block.map(v => v[0]))
    let maxCol = Math.max(...block.map(v => v[1]))
    let blockStyle = Array.from(Array(maxRow + 1), () => Array(maxCol + 1).fill({}))

    block.forEach((pos) => {
      blockStyle[pos[0]][pos[1]] = { background: blockColor }
    })

    return (
      <div className="base-block-wrapper">
        <table className="base-block">
          <tbody>
            {blockStyle.map((row, i) => (
              <tr key={`base-block-${i}`}>
                {row.map((v, j) => (
                  <td
                    key={`base-block-${i}-${j}`} className="base-block-cell" style={v} uniqkey={`${i}-${j}`}>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  };


  const BlockTooltip = () => {
    if (!blockDesc) {
      return <></>
    }
    const getTooltips = () => {
      let tooltips = []
      for (let i = 0; i < blockDesc.length; i++) {
        let gradeDom = <AfterImageBadgeLight className='block-grade' title={blockDesc[i].grade}></AfterImageBadgeLight>

        let descDoms = []
        for (let j = 0; j < blockDesc[i].desc.length; j++) {
          let row = blockDesc[i].desc[j]
          let rows = []
          for (let k = 0; k < row.length; k++) {
            rows.push(<AfterImageBadgeLight className='block-desc' title={row[k]}></AfterImageBadgeLight>)
          }
          descDoms.push(rows)
        }

        let classDescDoms = []
        blockDesc[i].domiDesc = blockDesc[i].domiDesc.sort(function (a, b) {
          return b.level - a.level;
        })
        for (let j = 0; j < blockDesc[i].domiDesc.length; j++) {
          let classDesc = blockDesc[i].domiDesc[j]
          classDescDoms.push(
            <div key={`domi-${i}-${j}`} className="domi-class">ㆍLv.{classDesc.level} {classDesc.className}</div>
          )
        }


        tooltips.push(
          <Tooltip key={`block-tooltip-${i}`} id={`block-tooltip-${i}`} className='block-tooltip'>

            <div>{gradeDom}</div>

            <div>
              {descDoms.map((row, i) => (
                <div key={`tooltip-${i}`}>
                  {row.map((v, j) => (
                    <span key={`tooltip-${i}-${j}`}>
                      {v}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className='class-desc-wrapper'>
              {classDescDoms.length !== 0 ?
                <><Divider></Divider><div>소유 캐릭터 정보</div></>
                : <></>}

            </div>
            <div>{classDescDoms}</div>
          </Tooltip>
        )
      }
      return tooltips
    }
    return (
      <div>
        {getTooltips()}
      </div>
    )
  }

  return (
    <>
      <CharMenu page='union'></CharMenu>
      <ContentLayout>
        {/* <div className="union-raider-title container-fluid">
          <div className="row justify-content-center">
            <div className="col-2 rounded-pill" />
            <div className="col-auto text-bold">유니온 공격대</div>
            <div className="col-2 rounded-pill"></div>
          </div>
        </div> */}
        {unionLoading ?
          <div className="union-basic container-fluid">
            <div className="row justify-content-center">
              <div className="col-2 rounded-pill" />
              <div className="col-auto text-bold text-15 mb-3">유니온 공격대</div>
              <div className="col-2 rounded-pill"></div>
            </div>
            <div className="row placeholder-glow justify-content-center">
              <div className="placeholder col-auto bg-secondary rounded-pill" />
              <div className="col-auto" />
              <div className="placeholder col-2 bg-secondary rounded-pill"></div>
            </div>
          </div>
          :
          <div className="union-basic container-fluid">
            <div className="row justify-content-center">
              <div className="col-2 rounded-pill" />
              <div className="col-auto text-bold text-15 mb-3">유니온 공격대</div>
              <div className="col-2 rounded-pill"></div>
            </div>
            <div className="row justify-content-center">
              {charUnionInfo && charUnionInfo.userUnionResponse && charUnionInfo.userUnionResponse.unionGrade ?
                <>
                  <div className="col-auto">
                    <UnionGradeImage className="union-grade-img" grade={charUnionInfo && charUnionInfo.userUnionResponse ? charUnionInfo.userUnionResponse.unionGrade : ''}></UnionGradeImage>
                  </div>
                  <div className="col-auto text-bold">
                    {charUnionInfo && charUnionInfo.userUnionResponse ? charUnionInfo.userUnionResponse.unionGrade : ''}
                  </div>
                  <div className="col-auto text-bold">
                    Lv.{charUnionInfo && charUnionInfo.userUnionResponse ? charUnionInfo.userUnionResponse.unionLevel : ''}
                  </div>
                </>
                :
                <div className="col-auto">
                  유니온 등급 및 레벨 정보가 없습니다.
                </div>
              }

            </div>
          </div>

        }

        {/* <Tooltip ref={tooltipRefMode} />
        <Tooltip ref={tooltipRefStart} />
        <Tooltip ref={tooltipRefRegionSelect} />
        <Tooltip ref={tooltipRefInitSelect} />
        <Tooltip ref={tooltipRefInitRegionLimit} /> */}
        {/* <div className="col-auto text-center">
              <AfterImageButton className="union-help-btn ps-3" action={handleHelp}
                // disabled={useProcessDisabled}
                title={help ? '도움말 닫기' : '도움말 열기'}>
              </AfterImageButton>
        </div> */}

        <HelpTooltip></HelpTooltip>
        <div className="container-fluid union-help">
          <div className="row justify-content-center">
            <div className="col-5"></div>
            {/* <div className="col-auto">

            </div> */}
            <div
              className='btn-union-help col-auto btn rounded-pill ' data-tooltip-id='help-tooltip'
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-auto">
                    <div className="union-help-desc">사용 설명</div>
                  </div>
                  <div className="col-auto">
                    <div className="union-help-icon material-symbols-outlined fill-thick-icon icon-darkgray">question_mark</div>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>

        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-auto">
              <BasicTable
                // table={table}
                // setTable={setTable}
                drag={drag} setDrag={setDrag}
                tableStyle={tableStyle}
                setTableStyle={setTableStyle}
                isStart={isStart}
                setIsStart={setIsStart}
                useProcess={useProcess}
                useProcessDisabled={useProcessDisabled} setUseProcessDisabled={setUseProcessDisabled}
                handleUseProcess={handleUseProcess}
                submitButtonDisabled={submitButtonDisabled}
                regionMode={regionMode}
                setRegionMode={setRegionMode}
                processType={processType}
                initSelectDisabled={initSelectDisabled} setInitSelectDisabled={setInitSelectDisabled}
                isProcessFail={isProcessFail} setIsProcessFail={setIsProcessFail}
                ocid={charUnionInfo ? charUnionInfo.idResponse.ocid : ''}
                unionLevel={charUnionInfo ? charUnionInfo.userUnionResponse.unionLevel : 0}
                blockManager={blockManager}
                regionLimit={regionLimit}
                setRegionLimit={setRegionLimit}
                prevRegionLimit={prevRegionLimit}
                regionLimitIdx={regionLimitIdx}
                responseUnionBlock={responseUnionBlock}
                blockCount={blockCount}
              >
              </BasicTable>
            </div>
            <div className="col-auto block-counts">
              <RegionLimitTooltip></RegionLimitTooltip>
              <RegionLimit />
              <BlockTooltip></BlockTooltip>
              <BlockCountContainer blockClassName="pt-1" idx={0} />
              <BlockCountContainer idx={1} />
              <BlockCountContainer idx={2} />
              <BlockCountContainer idx={3} />
              <BlockCountContainer blockClassName="pt-2" idx={4} />
              <BlockCountContainer blockClassName="pt-1" idx={5} />
              <BlockCountContainer blockClassName="pt-1" idx={6} />
              <BlockCountContainer idx={7} />
              <BlockCountContainer blockClassName="pt-1" idx={8} />
              <BlockCountContainer blockClassName="pt-2" idx={9} />
              <BlockCountContainer blockClassName="pt-1" idx={10} />
              <BlockCountContainer blockClassName="pt-2" idx={11} />
              <BlockCountContainer blockClassName="pt-1" idx={12} />
              <BlockCountContainer blockClassName="pt-2" idx={13} />
              <BlockCountContainer blockClassName="pt-2" idx={14} />
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  )
}

export function getBlockTypeDOM(row) {
  return document.getElementById("union-block-type")[row]
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

export function getRegionLimit(unionLevel) {
  let regionLimit = 5
  if (unionLevel) {

    if (unionLevel >= 6000) {
      // 바로 리턴
    } else if (unionLevel >= 5000) {
      regionLimit = 4
    } else if (unionLevel >= 4000) {
      regionLimit = 3
    } else if (unionLevel >= 3000) {
      regionLimit = 2
    } else if (unionLevel >= 2000) {
      regionLimit = 1
    } else {
      regionLimit = 0
    }
  }
  return regionLimit
}