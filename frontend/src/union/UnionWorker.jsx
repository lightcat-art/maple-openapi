export default () => {
  self.addEventListener('message', e => {
    if (!e) return;

    // console.log('Received message from main thread : ', e.data)
    // console.log('Received union block : ', e.data.unionBlock)
    // console.log('Received union blockCount : ', e.data.blockCount)
    // console.log('Received union baseBlockPos : ', e.data.baseBlockPos)
    // console.log('Received union rotateBlockPos : ', e.data.rotateBlockPos)
    // console.log('Received table : ', e.data.table)
    // console.log('Received cnt : ', e.data.cnt)

    execute(e.data.table, e.data.unionBlock, e.data.blockCount, e.data.baseBlockPos, e.data.rotateBlockPos)
  })

  class UnionRaiderSetting {

    /**
     * 
     * @param {*} name : 캐릭터 이름
     * @param {*} raider : 공격대원 좌표
     * @param {*} table : 배치판 좌표
     * @param {*} setTable : 실시간 table 렌더링을 위함
     * @param {*} blockType : blockTypeInstance 활용
     */
    constructor(requestBlocks, table, realtimeRender, blockCount, baseBlockPos, rotateBlockPos) {
      this.requestBlocks = requestBlocks // raider는 기본적으로 unionRaiderResponse의 unionBlock으로 받는것이 원칙.
      this.table = table
      this.realtimeRender = realtimeRender
      this.blockCount = blockCount
      this.baseBlockPos = baseBlockPos
      this.rotateBlockPos = rotateBlockPos
      this.dominatedBlocks = []
      this.filledCount = 0
      this.processCount = 0
      // this.blockType = new BlockType();
      // 블록 좌표형
      this.blocks = []

      // 결과
      this.resultBlocks = null;
      this.resultTable = null;
      this.resultDomiBlocks = null;
      this.resultTableStyle = null;


      this.binaryBlockOn = 1 // 블록바이너리표현 :  블록이 있는 부분
      this.binaryBlockOff = 0 // 블록바이너리표현 : 블록이 없는 부분
      this.closeTableValue = 0 // 유니온 지도에서 채울수 없는 부분
      this.blankTableValue = 1 // 유니온 지도에서 채워질 부분 (비어있는 부분)
      this.limitBlockSize = 5; // 한 블록의 최대 큐브 개수
      this.limitBlockLength = 5; // 좌표평면상 블록의 최대 길이

      this.complete = false;
      this.stop = false
      this.originCheck = false // 원테이블 정보인지 지역더미테이블 정보인지 체크.
    }
    addFilledCount() {
      this.filledCount = this.filledCount + 1
    }
    addProcessCount() {
      this.processCount++
      return this.processCount
    }
    getProcessCount() {
      return this.processCount
    }

    parseRaider() {
      // console.log('parseRaider start')
      if (!this.blockCount) {
        // console.log("raider information is null.");
        return;
      }
      for (let i = 0; i < this.blockCount.length; i++) {
        if (this.blockCount[i] === 0) {
          continue
        }
        let rotates = []
        // let rotateBlocks = this.rotate(this.baseBlockPos[i])
        this.rotateBlockPos[i].forEach((block) => {
          rotates.push(new BaseBlock(1, block.length, block, transToBinary(block, this.limitBlockLength, this.binaryBlockOn, this.binaryBlockOff)))
        })
        const block = new Block(this.blockCount[i], this.baseBlockPos[i].length, this.baseBlockPos[i], transToBinary(this.baseBlockPos[i]), rotates, this.limitBlockLength, this.binaryBlockOn, this.binaryBlockOff)
        this.blocks.push(block)
      }

      // this.requestBlocks.forEach(block => {
      //   const normalizedBlock = this.normalizeOriginBlock(block.blockPosition)
      //   let existType = false;

      //   for (let i = 0; i < this.blocks.length; i++) {
      //     const block = this.blocks[i]
      //     for (let j = 0; j < block.rotates.length; j++) {
      //       const rotate = block.rotates[j]
      //       if (JSON.stringify(rotate.coord) === JSON.stringify(normalizedBlock)) {
      //         existType = true
      //         block.count++
      //       }
      //     }
      //   }
      //   if (!existType) {
      //     let rotates = []
      //     let rotateBlocks = this.rotate(normalizedBlock)
      //     rotateBlocks.forEach((block) => {
      //       rotates.push(new BaseBlock(1, block.length, block, this.transToBinary(block)))
      //     })
      //     const block = new Block(1, normalizedBlock.length, normalizedBlock, this.transToBinary(normalizedBlock), rotates)
      //     this.blocks.push(block)
      //   }
      // })
      // console.log('parse blocks= ', this.blocks)
    }

    /**
    *  * map형태 ex) [{x: 24, y: 25}, ...] 로 되어있는 유니온 초기 오브젝트를 normalize
    * --------
    * 초기 오브젝트 x,y :
    * 좌측으로 1칸씩 이동하면 x가 1씩 감소
    * 우측으로 1칸씩 이동하면 x가 1씩 증가
    * 아래로 1칸씩 이동하면 y가 1씩 감소
    * 위로 1칸씩 이동하면 y가 1씩 증가
    * -> 좌표평면 규칙이므로 matrix 형태로 변환시켜야함.
    * --------
    * @param {*} block 
    * @returns 
    */
    // normalizeOriginBlock(block) {
    //   let minY = Math.min(...block.map(v => v.y))
    //   let minX = Math.min(...block.map(v => v.x))

    //   return block.map(v => [v.y - minY, v.x - minX]).sort()
    // }



    /**
    * 현재 블록에 대해 회전 시 블록 종류 반환.
    * @param {*} block 
    * @returns 
    */
    // rotate(block) {
    //   // 회전 및 뒤집기를 통해 8번 rotation을 하여 모든 타입의 블록 json으로 반환.
    //   let max = Math.max(...block.map(v => Math.max(v[0], v[1])))
    //   let allBlockType = new Set()
    //   let rotateBlock = JSON.parse(JSON.stringify(block))
    //   for (let i = 0; i < 4; i++) {
    //     if (i > 0) {
    //       rotateBlock = rotateBlock.map(v => [max - v[1], v[0]]) // 90도 회전
    //     }
    //     let normalRotate = normalizeBlock(rotateBlock)
    //     allBlockType.add(JSON.stringify(normalRotate))
    //   }
    //   // 뒤집어서 다시 4번 회전.
    //   let transBlock = block.map(v => [v[1], v[0]])
    //   for (let i = 0; i < 4; i++) {
    //     if (i > 0) {
    //       transBlock = transBlock.map(v => [max - v[1], v[0]]) // 90도 회전
    //     }
    //     let transNormalRotate = normalizeBlock(transBlock)
    //     allBlockType.add(JSON.stringify(transNormalRotate))
    //   }
    //   let result = []
    //   allBlockType.forEach((v) => {
    //     result.push(JSON.parse(v))
    //   })
    //   return Array.from(result)
    // }

    stopRequest() {
      this.stop = true
    }

    async classify() {
      this.parseRaider()
      let domiBlocks = []
      let shuffleIdx = []
      for (let i = 0; i < this.blocks.length; i++) {
        shuffleIdx.push(i)
      }

      // this.blocks.sort(function (a, b) {
      //   return b.size * b.count - a.size * a.count
      // })
      const scanResult = await this.scanImprove(this.table, this.blocks, domiBlocks, shuffleIdx)
      return scanResult
    }

    async scanImprove(table, blocks, domiBlocks, shuffleIdx) {
      // if (this.realtimeRender) {
      //   console.log('origin thread test')
      // } else {
      //   console.log('other thread test')
      // }
      if (this.stop) {
        // if (this.realtimeRender) {
        //   console.log('origin stop')
        // } else {
        //   console.log('other stop')
        // }
        return null
      }

      let curTable = JSON.parse(JSON.stringify(table))
      let curBlocks = JSON.parse(JSON.stringify(blocks))
      let curDomiBlocks = JSON.parse(JSON.stringify(domiBlocks))
      let curShuffleIdx = JSON.parse(JSON.stringify(shuffleIdx))

      curBlocks.sort(function (a, b) {
        return b.size * b.count - a.size * a.count
      })


      // 남아있는 블럭 개수 체크
      let remainBlocksTF = true
      if (curBlocks[0].count === 0) {
        remainBlocksTF = false
      }
      if (!remainBlocksTF) {
        if (!this.complete) {
          this.resultBlocks = blocks
          this.resultDomiBlocks = domiBlocks
          this.complete = true
        }
        return { blocks: curBlocks, domiBlocks: curDomiBlocks }
      }

      let savePointBlocks = JSON.parse(JSON.stringify(curBlocks))
      let savePointDomiBlocks = JSON.parse(JSON.stringify(curDomiBlocks))



      // matchTF 가 false가 의미하는것
      // 1. 하위함수에서 매칭이 되지 않는 블록이 존재하여 현재함수에서 모든 케이스까지 트라이했는데 매칭되는 케이스가 없음

      let origin = false
      // 모든 블록더미를 bfs로 탐색
      const blockDummyList = findAllBlockDummy(JSON.parse(JSON.stringify(table)), this.closeTableValue)
      // 지역더미테이블정보인지 원테이블정보인지 체크.
      if (blockDummyList.length === 1 && !this.originCheck) {
        origin = true
      } else if (blockDummyList.length > 1 && !this.originCheck) {
        this.originCheck = true
        origin = true
      }
      // 작은 더미부터 돌린다.
      /**
       * for (블록더미 리스트) {
       *  0. 테이블 빈칸 스캔
       *  1. 블록더미와 소유블록 조합가능성 체크 - 조합이 되지 않는다면 아예 모든 스캔 취소하고 상위재귀함수로 복귀
       *  2. 블록 회전타입별로 하나씩 체크
       *  3. 맞는 회전타입이 있으면 점령도미블록에 넣고 재귀함수 선언
       *  4. 
       * }
       */
      /**
      * 블록더미사이즈 오름차순으로 배열인덱스정보를 리턴
      * result : [[배열인덱스, 더미사이즈],[배열인덱스, 더미사이즈],[배열인덱스, 더미사이즈]...]
      */
      blockDummyList.sort(function (a, b) { return a.length - b.length })

      let matchTF = false
      for (let m = 0; m < blockDummyList.length; m++) {
        matchTF = false // 매치여부 블록더미별로 초기화
        const blockDummy = blockDummyList[m]
        let dummyScanTable = createDummyRegionTable(table, blockDummy, this.closeTableValue, this.blankTableValue)
        const savePointTable = JSON.parse(JSON.stringify(dummyScanTable))
        const fittableTF = checkFittable(curBlocks, blockDummy.length)
        if (fittableTF) {

          let blankTF = false
          for (let i = 0; i < dummyScanTable.length; i++) {
            for (let j = 0; j < dummyScanTable[0].length; j++) {

              blankTF = checkTableBlank(dummyScanTable[i][j], this.blankTableValue)
              if (blankTF) {
                // curShuffleIdx.shuffle()
                // for (let s = 0; s < 1; s++) {
                //   const idx = curShuffleIdx.shift()
                //   curShuffleIdx.push(idx)
                // }

                // 블록 사이즈 종류 회전타입별로 하나씩 스캔
                for (let k = 0; k < curBlocks.length; k++) {
                  if (curBlocks[k].count === 0) { // 개수가 0인 블록은 사용하지 않기.
                    continue
                  }
                  const listByType = curBlocks[k]
                  for (let l = 0; l < listByType.rotates.length; l++) {

                    const blockTypeRotate = listByType.rotates[l]

                    const result = scanInner(i, j, dummyScanTable, blockTypeRotate.binary, this.limitBlockLength, this.closeTableValue) //매칭되면 유니온 배치판 업데이트 됨.
                    if (result.length !== 0) {
                      curDomiBlocks.push(result)
                      // 보유블럭 오브젝트들에서 점령된 블록 제거
                      curBlocks[k].count--

                      // 실시간 렌더링 하기위함.
                      const processCount = this.addProcessCount()
                      if (this.realtimeRender) {
                        if (this.processCount % 30 === 0) {
                          this.resultBlocks = curBlocks
                          this.resultDomiBlocks = curDomiBlocks
                          // this.setTableStyleValue()
                          // postMessage({ table: this.getTableStyle() })
                          postMessage({ table: this.table, domiBlocks: curDomiBlocks, count: processCount })
                        }
                      }


                      let blocksInfo = await this.scanImprove(dummyScanTable, curBlocks, curDomiBlocks, curShuffleIdx)
                      if (!blocksInfo) { // 자식 함수에서 매칭실패로 판단되는 경우 유니온 배치판 및 점령블록 등 오브젝트 원래대로 되돌려놓기
                        // 기본적으로 matchTF 가 false이므로 굳이 다시 세팅해줄 필요가 없음.
                        dummyScanTable.length = 0
                        curBlocks.length = 0
                        curDomiBlocks.length = 0
                        dummyScanTable = JSON.parse(JSON.stringify(savePointTable))
                        curBlocks = JSON.parse(JSON.stringify(savePointBlocks))
                        curDomiBlocks = JSON.parse(JSON.stringify(savePointDomiBlocks))
                      } else {
                        savePointBlocks = JSON.parse(JSON.stringify(blocksInfo['blocks']))
                        savePointDomiBlocks = JSON.parse(JSON.stringify(blocksInfo['domiBlocks']))
                        curBlocks = JSON.parse(JSON.stringify(blocksInfo['blocks']))
                        curDomiBlocks = JSON.parse(JSON.stringify(blocksInfo['domiBlocks']))

                        matchTF = true
                      }
                    }
                    if (matchTF || this.stop) { break }
                  }
                  if (matchTF || this.stop) { break }
                }
                // 한번 빈칸을 스캔했으면 그다음빈칸은 자식 재귀함수에서 실행해야하므로 빠져나가기
                break
              }
            }
            if (blankTF || this.stop) { break } // 한번 빈칸을 스캔했으면 그다음빈칸은 자식 재귀함수에서 실행해야하므로 빠져나가기
          }
        } else { // 어느 하나의 블록더미라도 조합가능성이 전혀 존재하지 않는 경우 매칭실패로 판단
          matchTF = false
        }
        // 남은 블록 개수 체크
        if (curBlocks[0].count === 0) {
          break
        }
        // 특정 더미 블록에서 딱 맞는 배치가 없다고 판단되는 경우 다음 블록더미를 스캔하지 않고 상위 재귀함수로 복귀
        if (!matchTF) {
          break
        }
      }

      if ((blockDummyList.length !== 0 && !matchTF) || this.stop) { // 뒤로가기
        curTable.length = 0
        curBlocks.length = 0
        curDomiBlocks.length = 0
        return null
      }
      else {
        // 분기된 더미에서 다 찾을 경우도 포함이므로 굳이 result에 저장할 필요가 없음.
        // if (!this.resultRecordTF) {
        //   this.resultBlocksCount = curBlocksCount
        //   this.resultTable = curTable
        //   this.resultDomiBlocks = curDomiBlocks
        //   this.resultRecordTF = true
        // }
        if (origin) {
          this.complete = true
          this.resultBlocks = savePointBlocks
          this.resultDomiBlocks = savePointDomiBlocks
        }
        return { blocks: savePointBlocks, domiBlocks: savePointDomiBlocks }
      }
    }


  }


  /**
  * 지정된 시작점부터 최대 블록가능길이의 정사각형 영역을 스캔하면서 블록과 동일한지 체크
  * @param {*} row 
  * @param {*} col 
  * @param {*} table 
  * @param {*} blocksBinary 
  * @returns 매칭되었다고 판단된 블록의 절대좌표
  */
  function scanInner(row, col, curTable, blocksBinary, limitBlockLength, closeTableValue) {
    const startRowIdx = row - (limitBlockLength - 1)
    // const startRowIdx = row
    const startColIdx = col - (limitBlockLength - 1)

    const endRowIdx = row
    const endColIdx = col


    let result = []
    for (let i = startRowIdx; i <= endRowIdx; i++) {
      for (let j = startColIdx; j <= endColIdx; j++) {
        /**
            한번 비교할때 테이블 배열은 이미 만들어져있고 따라서 배열복사가 필요없음
            정해진 index (25개) 에 대해서 &연산 시 바로바로 해당 블록원소와 같은지 아닌지 체크 / 다르다면 블록이 들어가지 않는 모양이므로
            다음 스캔영역으로 넘어감.
         */


        let sameTF = true
        // let regionBinary = []
        let blocksAbsCoord = [] // 블록의 절대좌표
        //5x5 판을 스캔한다
        for (let k = 0; k < limitBlockLength; k++) {
          for (let l = 0; l < limitBlockLength; l++) {
            let blockBinaryValue = blocksBinary[k * 5 + l]
            let regionValue = -1
            if ((i + k) < 0 || (j + l) < 0 || (i + k) >= curTable.length
              || (j + l) >= curTable[0].length) {
              // 영역밖위범위가 스캔될때는 0으로 인식
              regionValue = 0
            } else {
              regionValue = curTable[i + k][j + l]
            }
            if ((blockBinaryValue & regionValue) !== blockBinaryValue) {
              // 블록이 있어야할 공간에 유니온 배치판이 막혀있는 경우임.
              sameTF = false
            }
            if (!sameTF) { break }
            // 블록의 절대좌표 미리 저장
            if (blockBinaryValue === 1) {
              blocksAbsCoord.push([i + k, j + l])
            }
          }
          if (!sameTF) { break }
        }
        if (sameTF) {
          result = blocksAbsCoord
          // 매칭되면 유니온 배치판 점령도 업데이트
          blocksAbsCoord.forEach((coord) => {
            curTable[coord[0]][coord[1]] = closeTableValue
          })
          return result
        }
      }
    }
    return result
  }

  function createDummyRegionTable(table, blockDummy, closeTableValue, blankTableValue) {
    let result = Array.from(new Array(table.length), () => new Array(table[0].length).fill(closeTableValue))
    for (let i = 0; i < blockDummy.length; i++) {
      result[blockDummy[i][0]][blockDummy[i][1]] = blankTableValue
    }
    return result
  }
  /**
 * 블록더미사이즈 오름차순으로 배열인덱스정보를 리턴
 * @param {*} blockDummyList 
 * @returns [[배열인덱스, 더미사이즈],[배열인덱스, 더미사이즈],[배열인덱스, 더미사이즈]...]
 */

  function checkTableBlank(value, blankTableValue) {
    if (value === blankTableValue) {
      return true
    } else {
      return false
    }
  }

  function findAllBlockDummy(table, closeTableValue) {
    let blockDummyList = []
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[0].length; j++) {
        if (table[i][j] !== closeTableValue) {
          const start = [[i, j]]
          const blockDummy = bfs(start, table, closeTableValue)
          blockDummyList.push(blockDummy)
        }
      }
    }
    return blockDummyList
  }

  /**
 * 
 * @param {*} start :시작 좌표
 * @param {*} table 
 * @param {*} visitValue  : 방문처리할 값
 */
  function bfs(start, table, visitValue) {
    const lenRow = table.length
    const lenCol = table[0].length
    const direction = [[-1, 0], [1, 0], [0, 1], [0, -1]]
    let block = []
    let visit = start
    table[start[0][0]][start[0][1]] = visitValue

    while (visit.length > 0) {
      let [crow, ccol] = visit.shift()
      block.push([crow, ccol])
      for (let i = 0; i < direction.length; i++) {
        let nrow = crow + direction[i][0]
        let ncol = ccol + direction[i][1]
        if (0 <= ncol && 0 <= nrow && ncol < lenCol && nrow < lenRow && (table[nrow][ncol] !== visitValue)) {
          visit.push([nrow, ncol])
          table[nrow][ncol] = visitValue
        }
      }
    }
    return block
  }

  /**
* 블록이 존재하는 곳은 this.binaryBlockOn, 나머지는 this.binaryBlockOff
* @param {*} block 
*/
  function transToBinary(block, limitBlockLength, binaryBlockOn, binaryBlockOff) {
    let binary = []
    for (let i = 0; i < limitBlockLength; i++) {
      for (let j = 0; j < limitBlockLength; j++) {
        let match = false
        for (let k = 0; k < block.length; k++) {
          const x = block[k][0]
          const y = block[k][1]
          if (i === x && j === y) {
            match = true
          }
          if (match) {
            break
          }
        }
        if (match) {
          binary.push(binaryBlockOn)
        } else {
          binary.push(binaryBlockOff)
        }
      }
    }
    return binary
  }


  function checkFittable(blocks, targetSum) {
    // console.log('fittable check start')
    let numMap = {}
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].size in numMap) {
        numMap[blocks[i].size] = numMap[blocks[i].size] + blocks[i].count
      } else {
        numMap[blocks[i].size] = blocks[i].count
      }
    }
    // console.log('현재 블록덩어리의 산정공간 : ', targetSum, ', 소유한 블록리스트 : ', numMap, ', 블록원자단위 개수:', numBlockElem)
    // 모든 블록 길이의 합이 더미사이즈 보다 작거나 같다면 가능한것으로 판단할것
    let sum = 0
    let keyList = Object.keys(numMap)
    for (let i = 0; i < keyList.length; i++) {
      const key = parseInt(keyList[i])
      sum += key * numMap[key]
    }
    if (sum <= targetSum) {
      // console.log('table space is enough')
      return true
    }
    let impossibleCache = new Map()
    const result = dpImprove(targetSum, numMap, impossibleCache)
    // console.log('dp result = ', result);
    if (result) {
      // console.log('fittable check true')
      return true
    } else {
      // console.log('fittable check false')
      return false
    }
  }
  /**
 * 
 * @param {*} numMap  key : 블록사이즈 , value : 블록의 개수
 * @param {*} targetSum 
 * @returns 
 */
  function checkFittableTest(numMap, targetSum) {
    // console.log('checkFittableTest start')
    // 모든 블록 길이의 합이 더미사이즈 보다 작거나 같다면 가능한것으로 판단할것
    let sum = 0
    let keyList = Object.keys(numMap)
    for (let i = 0; i < keyList.length; i++) {
      const key = parseInt(keyList[i])
      sum += key * numMap[key]
    }
    if (sum <= targetSum) {
      // console.log('table space is enough')
      return true
    }
    let impossibleCache = new Map()
    const result = dpImprove(targetSum, numMap, impossibleCache)
    // console.log('dp result = ', result);
    if (result) {
      return true
    } else {
      return false
    }
  }

  // cache :  6 : [1,2,3] 과 같이 map으로 활용
  function dpImprove(targetSum, numMap, imposCacheMap) {
    // console.log('targetSum=', targetSum, ', numMap=', numMap, ', imposCacheMap=',imposCacheMap)
    if (targetSum < 0) {
      return null
    } else if (targetSum === 0) {
      return new Map()
    }

    const numKeyList = Object.keys(numMap)
    if (targetSum in imposCacheMap) {
      let unusable = false
      let cacheList = imposCacheMap[targetSum]
      for (let i = 0; i < cacheList.length; i++) {
        const cache = cacheList[i]
        if (JSON.stringify(numMap) === JSON.stringify(cache)) {
          unusable = true
          break
        }
      }
      if (unusable) {
        // console.log('unusable check')
        return null
      }
    }

    for (let i = 0; i < numKeyList.length; i++) {
      const num = parseInt(numKeyList[i])
      if (numMap[num] === 0) {
        continue
      }
      let copyNumMap = JSON.parse(JSON.stringify(numMap))
      copyNumMap[num] = copyNumMap[num] - 1

      const resultInner = dpImprove(targetSum - num, copyNumMap, imposCacheMap)
      // null 넘어왔다면 경우의 수 조합이 없는것으로 간주하고 넘어가기
      if (!resultInner) {
        continue
      }
      let result = {}
      result[num] = 1
      // console.log('result type = ',typeof(result))

      let resultInnerKeyList = Object.keys(resultInner)
      for (let j = 0; j < resultInnerKeyList.length; j++) {
        let key = parseInt(resultInnerKeyList[j])
        if (key in result) {
          result[key] += resultInner[key]
        } else {
          result[key] = resultInner[key]
        }
      }

      return result
    }
    // 다 돌았는데도 반환되는게 없으면 null 반환
    if (targetSum in imposCacheMap) {
      let exist = false
      imposCacheMap[targetSum].forEach((cache) => {
        if (JSON.stringify(cache) === JSON.stringify(numMap)) {
          exist = true
        }
      })
      if (!exist) {
        imposCacheMap[targetSum].push(numMap)
      }
    } else {
      imposCacheMap[targetSum] = [numMap]
    }

    return null
  }

  async function execute(table, unionBlock, blockCount, baseBlockPos, rotateBlockPos) {
    let threads = []
    let yxSym = [], origSym = [], yxOrigSym = []
    for (let i = 0; i < table[0].length; i++) {
      yxSym[i] = [];
      for (let j = 0; j < table.length; j++)
        yxSym[i][j] = table[j][i]
    }
    for (let i = 0; i < table.length; i++) {
      origSym[i] = [];
      for (let j = 0; j < table[0].length; j++)
        origSym[i][j] = table[table.length - 1 - i][table[0].length - 1 - j]
    }
    for (let i = 0; i < table[0].length; i++) {
      yxOrigSym[i] = [];
      for (let j = 0; j < table.length; j++)
        yxOrigSym[i][j] = table[table.length - 1 - j][table[0].length - 1 - i]
    }


    threads.push(new UnionRaiderSetting(unionBlock, table, true, blockCount, baseBlockPos, rotateBlockPos))
    threads.push(new UnionRaiderSetting(unionBlock, yxSym, false, blockCount, baseBlockPos, rotateBlockPos))
    threads.push(new UnionRaiderSetting(unionBlock, origSym, false, blockCount, baseBlockPos, rotateBlockPos))
    threads.push(new UnionRaiderSetting(unionBlock, yxOrigSym, false, blockCount, baseBlockPos, rotateBlockPos))
    const a = threads[0].classify()
    const b = threads[1].classify()
    const c = threads[2].classify()
    const d = threads[3].classify()
    await Promise.race([a, b, c, d])
    // let o = await Promise.race([a])
    // console.log('race o = ', o)
    for (let thread of threads) {
      // console.log('stop request')
      thread.stopRequest()
    }

    // console.log('origin success : ', threads[0].complete, ', 1 : ', threads[1].complete, ', 2: ', threads[2].complete, ', 3: ', threads[3].complete)
    if (threads[0].complete || threads[1].complete || threads[2].complete || threads[3].complete) {
      let domiBlocks = null
      let processCount = null
      if (threads[0].complete) {
        // console.log('origin success')
        // console.log('blocks:', threads[0].resultBlocks)
        domiBlocks = threads[0].resultDomiBlocks
        processCount = threads[0].addProcessCount()
      } else if (threads[1].complete) {
        // console.log('yxSym success')
        // console.log('blocks:', threads[1].resultBlocks)
        // postMessage({ table: table, domiBlocks: threads[1].resultDomiBlocks })
        let resultDomiBlocks = []
        for (let domiBlock of threads[1].resultDomiBlocks) {
          let resultDomiBlock = []
          for (let coord of domiBlock) {
            resultDomiBlock.push([coord[1], coord[0]])
          }
          resultDomiBlocks.push(resultDomiBlock)
        }
        domiBlocks = resultDomiBlocks
        processCount = threads[1].addProcessCount()
      } else if (threads[2].complete) {
        // console.log('origSym success')
        // console.log('blocks:', threads[2].resultBlocks)
        let resultDomiBlocks = []
        for (let domiBlock of threads[2].resultDomiBlocks) {
          let resultDomiBlock = []
          for (let coord of domiBlock) {
            resultDomiBlock.push([table.length - 1 - coord[0], table[0].length - 1 - coord[1]])
          }
          resultDomiBlocks.push(resultDomiBlock)
        }
        domiBlocks = resultDomiBlocks
        processCount = threads[2].addProcessCount()
      } else if (threads[3].complete) {
        // console.log('yxOrigSym success')
        // console.log('blocks:', threads[3].resultBlocks)
        let resultDomiBlocks = []
        for (let domiBlock of threads[3].resultDomiBlocks) {
          let resultDomiBlock = []
          for (let coord of domiBlock) {
            resultDomiBlock.push([table.length - 1 - coord[1], table[0].length - 1 - coord[0]])
          }
          resultDomiBlocks.push(resultDomiBlock)
        }
        domiBlocks = resultDomiBlocks
        processCount = threads[3].addProcessCount()
      }

      postMessage({ table: table, domiBlocks: domiBlocks, count: processCount })
    } else {
      postMessage({ count: -99 })
    }
  }

  /**
* 
* matrix 형태 ex) [[1,2],[2,4],...] 로 되어있는 오브젝트 normalize
* @param {*} block 
* @returns 
*/
  function normalizeBlock(block) {
    let minRow = Math.min(...block.map(v => v[0]))
    let minCol = Math.min(...block.map(v => v[1]))

    return block.map(v => [v[0] - minRow, v[1] - minCol]).sort()
  }

  class BaseBlock {
    constructor(count, size, coord, binary) {
      this.size = size
      this.count = count
      this.binary = binary
      this.coord = coord
    }
  }

  class Block extends BaseBlock {
    constructor(count, size, coord, binary, rotates) {
      super(count, size, coord, binary)
      this.rotates = rotates
    }
  }

  // Array의 prototype을 지정해주고, shuffle이라는 이름을 가진 함수를 생성
  // 다차원배열이면 제일 앞에 존재하는 차원의 인덱스를 셔플
  Array.prototype.shuffle = function () {
    var length = this.length;

    // 아래에서 length 후위 감소 연산자를 사용하면서 결국 0이된다.
    // 프로그래밍에서 0은 false를 의미하기에 0이되면 종료.
    while (length) {

      // 랜덤한 배열 index 추출
      var index = Math.floor((length--) * Math.random());

      // 배열의 끝에서부터 0번째 아이템을 순차적으로 대입
      var temp = this[length];

      // 랜덤한 위치의 값을 맨뒤(this[length])부터 셋팅
      this[length] = this[index];

      // 랜덤한 위치에 위에 설정한 temp값 셋팅
      this[index] = temp;
    }

    // 배열을 리턴해준다.
    return this;
  };
}


