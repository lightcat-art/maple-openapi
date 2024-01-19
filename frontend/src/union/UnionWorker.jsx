
export default () => {
  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
    if (!e) return;
    let cnt = e.data.cnt;

    // self.importScripts('http://localhost:3000/BlockTypeTest.js') // eslint-disable-line no-restricted-globals
    // const importTest = new BlockTypeTest()
    // importTest.test()

    console.log('Received message from main thread : ', e.data)
    console.log('Received union block : ', e.data.unionBlock)
    console.log('Received table : ', e.data.table)
    console.log('Received cnt : ', e.data.cnt)


    let o = execute(e.data.table, e.data.unionBlock)
    // console.log('result = ', o)

    const setting = new UnionRaiderSetting(e.data.unionBlock, JSON.parse(JSON.stringify(e.data.table)))
    // setting.parseRaider()
    console.log('parse blocks= ', setting.blocks)
    setting.classify()
    console.log('result count = ', setting.resultBlocks)
    console.log('result table= ', setting.resultTable)
    console.log('result domiBlocks=', setting.resultDomiBlocks)
    if (setting.resultDomiBlocks) {
      setting.setTableStyleValue()
      const tableStyle = setting.getTableStyle()
      postMessage({ table: tableStyle })
    } else {
      postMessage(null)
    }


    // console.log('worker end')
  })

  async function execute(table, unionBlock) {
    let threads = []
    let yxSym = [], origSym = [],  yxOrigSym = []
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


    threads.push(new UnionRaiderSetting(unionBlock, table, true))
    threads.push(new UnionRaiderSetting(unionBlock, yxSym, false))
    threads.push(new UnionRaiderSetting(unionBlock, origSym, false))
    threads.push(new UnionRaiderSetting(unionBlock, yxOrigSym, false))
    const a = threads[0].classify()
    const b = threads[1].classify()
    const c = threads[2].classify()
    const d = threads[3].classify()
    let o = await Promise.race([a, b, c, d])
    // let o = await Promise.race([a])
    console.log('race o = ', o)
    for (let thread of threads) {
      console.log('stop request')
      thread.stopRequest()
    }
    
    if (threads[0].complete) {
      console.log('origin success')
    } else if (threads[1].complete) {
      console.log('yxSym success')
    } else if (threads[2].complete) {
      console.log('origSym success')
    } else if (threads[3].complete) {
      console.log('yxOrigSym success')
    }
  }

  class PromiseTest {
    constructor(num) {
      // this.table = table
      // this.blocks = blocks
      this.num = num
    }

    async classify() {
      this.result = await this.scan()
      return this.result
    }

    async scan() {
      switch (this.num) {
        case 1:
          await this.sleep(1000)
          console.log('1')
          return "1"
        case 2:
          await this.sleep(2000)
          console.log('2')
          return "2"
        case 3:
          await this.sleep(3000)
          console.log('3')
          return "3"
        case 4:
          await this.sleep(4000)
          console.log('4')
          return "4"
      }
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
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

  class UnionRaiderSetting {

    /**
     * 
     * @param {*} name : 캐릭터 이름
     * @param {*} raider : 공격대원 좌표
     * @param {*} table : 배치판 좌표
     * @param {*} setTable : 실시간 table 렌더링을 위함
     * @param {*} blockType : blockTypeInstance 활용
     */
    constructor(requestBlocks, table, realtimeRender) {
      this.requestBlocks = requestBlocks // raider는 기본적으로 unionRaiderResponse의 unionBlock으로 받는것이 원칙.
      this.table = table
      this.realtimeRender = realtimeRender
      this.dominatedBlocks = []
      this.filledCount = 0
      this.processCount = 0
      this.blockType = new BlockType();
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
      this.processCount = this.processCount + 1
    }




    parseRaider() {
      console.log('parseRaider start')
      if (!this.requestBlocks) {
        console.log("raider information is null.");
        return;
      }
      this.requestBlocks.forEach(block => {
        const normalizedBlock = this.normalizeOriginBlock(block.blockPosition)
        let existType = false;

        for (let i = 0; i < this.blocks.length; i++) {
          const block = this.blocks[i]
          for (let j = 0; j < block.rotates.length; j++) {
            const rotate = block.rotates[j]
            if (JSON.stringify(rotate.coord) === JSON.stringify(normalizedBlock)) {
              existType = true
              block.count++
            }
          }
        }
        if (!existType) {
          let rotates = []
          let rotateBlocks = this.rotate(normalizedBlock)
          rotateBlocks.forEach((block) => {
            rotates.push(new BaseBlock(1, block.length, block, this.transToBinary(block)))
          })
          const block = new Block(1, normalizedBlock.length, normalizedBlock, this.transToBinary(normalizedBlock), rotates)
          this.blocks.push(block)
        }
      })
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
    normalizeOriginBlock(block) {
      let minY = Math.min(...block.map(v => v.y))
      let minX = Math.min(...block.map(v => v.x))

      return block.map(v => [v.y - minY, v.x - minX]).sort()
    }

    /**
 * 
 * matrix 형태 ex) [[1,2],[2,4],...] 로 되어있는 오브젝트 normalize
 * @param {*} block 
 * @returns 
 */
    normalizeBlock(block) {
      let minRow = Math.min(...block.map(v => v[0]))
      let minCol = Math.min(...block.map(v => v[1]))

      return block.map(v => [v[0] - minRow, v[1] - minCol]).sort()
    }


    /**
    * 현재 블록에 대해 회전 시 블록 종류 반환.
    * @param {*} block 
    * @returns 
    */
    rotate(block) {
      // 회전 및 뒤집기를 통해 8번 rotation을 하여 모든 타입의 블록 json으로 반환.
      let max = Math.max(...block.map(v => Math.max(v[0], v[1])))
      let allBlockType = new Set()
      let rotateBlock = JSON.parse(JSON.stringify(block))
      for (let i = 0; i < 4; i++) {
        if (i > 0) {
          rotateBlock = rotateBlock.map(v => [max - v[1], v[0]]) // 90도 회전
        }
        let normalRotate = this.normalizeBlock(rotateBlock)
        allBlockType.add(JSON.stringify(normalRotate))
      }
      // 뒤집어서 다시 4번 회전.
      let transBlock = block.map(v => [v[1], v[0]])
      for (let i = 0; i < 4; i++) {
        if (i > 0) {
          transBlock = transBlock.map(v => [max - v[1], v[0]]) // 90도 회전
        }
        let transNormalRotate = this.normalizeBlock(transBlock)
        allBlockType.add(JSON.stringify(transNormalRotate))
      }
      let result = []
      allBlockType.forEach((v) => {
        result.push(JSON.parse(v))
      })
      return Array.from(result)
    }

    /**
    * 블록이 존재하는 곳은 this.binaryBlockOn, 나머지는 this.binaryBlockOff
    * @param {*} block 
    */
    transToBinary(block) {
      let binary = []
      for (let i = 0; i < this.limitBlockLength; i++) {
        for (let j = 0; j < this.limitBlockLength; j++) {
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
            binary.push(this.binaryBlockOn)
          } else {
            binary.push(this.binaryBlockOff)
          }
        }
      }
      return binary
    }

    setTableStyleValue() {
      this.resultTableStyle = JSON.parse(JSON.stringify(this.table))
      for (let i = 0; i < this.resultDomiBlocks.length; i++) {
        const domiBlock = this.resultDomiBlocks[i]
        const direction = this.blockType.checkDirection(domiBlock)
        const color = this.blockType.getColorByBlock(this.normalizeBlock(domiBlock))
        for (let j = 0; j < domiBlock.length; j++) {
          let v = domiBlock[j]
          let styleValue = 0
          styleValue += direction[j]
          styleValue += color
          this.resultTableStyle[v[0]][v[1]] = styleValue
        }
      }
    }

    getTableStyle() {
      return this.blockType.getTableStyle(this.resultTableStyle)
    }

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
      
      if (this.stop) {
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
      let remainBlocksTF = false
      if (curBlocks[0].count !== 0) {
        remainBlocksTF = true
      }
      if (!remainBlocksTF) {
        // matchTF = true
        if (!this.complete) {
          this.resultBlocks = blocks
          this.resultTable = table
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
      const blockDummyList = this.findAllBlockDummy(JSON.parse(JSON.stringify(table)))
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
      // const idxByDummySize = this.sortingByBlockDummySize(blockDummyList)
      blockDummyList.sort(function (a, b) { return a.length - b.length })
      
      let matchTF = false
      for (let m = 0; m < blockDummyList.length; m++) {
        matchTF = false // 매치여부 블록더미별로 초기화
        const blockDummy = blockDummyList[m]
        let dummyScanTable = this.createDummyRegionTable(table, blockDummy)
        const savePointTable = JSON.parse(JSON.stringify(dummyScanTable))
        const fittableTF = this.checkFittable(curBlocks, blockDummy.length)
        if (fittableTF) {

          let blankTF = false
          for (let i = 0; i < dummyScanTable.length; i++) {
            for (let j = 0; j < dummyScanTable[0].length; j++) {

              blankTF = this.checkTableBlank(dummyScanTable[i][j])
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

                    const result = this.scanInner(i, j, dummyScanTable, blockTypeRotate.binary) //매칭되면 유니온 배치판 업데이트 됨.
                    if (result.length !== 0) {
                      curDomiBlocks.push(result)
                      // 보유블럭 오브젝트들에서 점령된 블록 제거
                      curBlocks[k].count--

                      // 실시간 렌더링 하기위함.
                      this.addProcessCount()
                      if (this.realtimeRender) {
                        this.resultBlocks = curBlocks
                        this.resultDomiBlocks = curDomiBlocks
                        this.setTableStyleValue()
                        if (this.processCount % 20 === 0) {
                          postMessage({ table: this.getTableStyle() })
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
        }
        return { blocks: savePointBlocks, domiBlocks: savePointDomiBlocks }
      }
    }

    checkTableBlank(value) {
      if (value === this.blankTableValue) {
        return true
      } else {
        return false
      }
    }



    findAllBlockDummy(table) {
      let blockDummyList = []
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[0].length; j++) {
          if (table[i][j] !== this.closeTableValue) {
            const start = [[i, j]]
            const blockDummy = this.bfs(start, table, this.closeTableValue)
            blockDummyList.push(blockDummy)
          }
        }
      }
      return blockDummyList
    }

    /**
     * 블록더미사이즈 오름차순으로 배열인덱스정보를 리턴
     * @param {*} blockDummyList 
     * @returns [[배열인덱스, 더미사이즈],[배열인덱스, 더미사이즈],[배열인덱스, 더미사이즈]...]
     */
    sortingByBlockDummySize(blockDummyList) {
      let sortable = []
      for (let i = 0; i < blockDummyList.length; i++) {
        sortable.push([i, blockDummyList[i].length])
      }
      sortable.sort(function (a, b) {
        return a[1] - b[1];
      })
      return sortable
    }

    createDummyRegionTable(table, blockDummy) {
      let result = Array.from(new Array(table.length), () => new Array(table[0].length).fill(this.closeTableValue))
      for (let i = 0; i < blockDummy.length; i++) {
        result[blockDummy[i][0]][blockDummy[i][1]] = this.blankTableValue
      }
      return result
    }

    /**
     * 지정된 시작점부터 최대 블록가능길이의 정사각형 영역을 스캔하면서 블록과 동일한지 체크
     * @param {*} row 
     * @param {*} col 
     * @param {*} table 
     * @param {*} blocksBinary 
     * @returns 매칭되었다고 판단된 블록의 절대좌표
     */
    scanInner(row, col, curTable, blocksBinary) {
      const startRowIdx = row - (this.limitBlockLength - 1)
      // const startRowIdx = row
      const startColIdx = col - (this.limitBlockLength - 1)

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
          for (let k = 0; k < this.limitBlockLength; k++) {
            for (let l = 0; l < this.limitBlockLength; l++) {
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
              curTable[coord[0]][coord[1]] = this.closeTableValue
            })
            return result
          }
        }
      }
      return result
    }

    /**
     * table과 block의 binary를 비교한다
     * @param {*} region 
     * @param {*} block 
     */
    compareBinary(region, block) {
      if (region.length !== block.length) {
        console.log('error : block and region length didnt same')
        return false
      }
      let resultBinary = []
      for (let i = 0; i < block.length; i++) {
        resultBinary.push(block[i] & region[i])
      }
      if (JSON.stringify(resultBinary) === JSON.stringify(block)) {
        return true
      } else {
        return false
      }
    }

    /**
     * 
     * @param {*} start :시작 좌표
     * @param {*} table 
     * @param {*} visitValue  : 방문처리할 값
     */
    bfs(start, table, visitValue) {
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

    checkFittable(blocks, targetSum) {
      let numMap = {}
      let numBlockElem = 0
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].size in numMap) {
          numMap[blocks[i].size] = numMap[blocks[i].size] + blocks[i].count
        } else {
          numMap[blocks[i].size] = blocks[i].count
        }

        numBlockElem += blocks[i].count * blocks[i].size
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
      let cache = new Map()
      const result = this.dp(targetSum, numMap, cache)
      // console.log('dp result = ', result);
      if (result) {
        return true
      } else {
        return false
      }
    }

    /**
     * 
     * @param {*} numMap  key : 블록사이즈 , value : 블록의 개수
     * @param {*} targetSum 
     * @returns 
     */
    checkFittableTest(numMap, targetSum) {
      // 모든 블록 길이의 합이 더미사이즈 보다 작거나 같다면 가능한것으로 판단할것
      let sum = 0
      let keyList = Object.keys(numMap)
      for (let i = 0; i < keyList.length; i++) {
        const key = parseInt(keyList[i])
        sum += key * numMap[key]
      }
      if (sum <= targetSum) {
        console.log('table space is enough')
        return true
      }
      let cache = new Map()
      const result = this.dp(targetSum, numMap, cache)
      console.log('dp result = ', result);
      if (result) {
        return true
      } else {
        return false
      }
    }

    // cache :  6 : [1,2,3] 과 같이 map으로 활용
    dp(targetSum, numMap, cacheMap) {
      if (targetSum < 0) {
        return null
      } else if (targetSum === 0) {
        return new Map()
      }

      const numKeyList = Object.keys(numMap)
      if (targetSum in cacheMap) {
        let usable = false
        let cacheList = cacheMap[targetSum]
        let usableCache = null;
        for (let i = 0; i < cacheList.length; i++) {
          const cache = cacheList[i]
          const cacheKeyList = Object.keys(cache)
          for (let j = 0; j < cacheKeyList.length; j++) {
            const cacheKey = parseInt(cacheKeyList[i])
            if (cacheKey in numMap && numMap[cacheKey] >= cache[cacheKey]) {
              usable = true
              usableCache = cache
            }
          }
        }
        if (usable) { return usableCache }
      }

      for (let i = 0; i < numKeyList.length; i++) {
        const num = parseInt(numKeyList[i])
        if (numMap[num] === 0) {
          continue
        }
        let copyNumMap = JSON.parse(JSON.stringify(numMap))
        copyNumMap[num] = copyNumMap[num] - 1

        const resultInner = this.dp(targetSum - num, copyNumMap, cacheMap)
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

        if (targetSum in cacheMap) {
          let exist = false
          cacheMap[targetSum].forEach((cache) => {
            if (JSON.stringify(cache) === JSON.stringify(result)) {
              exist = true
            }
          })
          if (!exist) {
            cacheMap[targetSum].push(result)
          }
        } else {
          cacheMap[targetSum] = [result]
        }
        return result
      }
      // 다 돌았는데도 반환되는게 없으면 null 반환
      return null
    }
  }

  class BlockType {
    // React component에서 선언하는 경우 다시 새로고침하면 인스턴스 날아감.
    // 현재 가지고 있는 블록 정보를 기반으로 화면에 표시할수 있도록 도와주는 클래스
    static instance;
    constructor() {
      if (BlockType.instance) return BlockType.instance;
      this.baseBlockType = [
        [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3]], // z-asym
        [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2]], // z-sym
        [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]], // +
        [[0, 0], [1, 0], [1, 1], [1, 2], [2, 0]], // T
        [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], // I
        [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2]], // thumb
        [[0, 0], [0, 1], [1, 1], [1, 2]], // z
        [[0, 0], [1, 0], [1, 1], [2, 0]], // T
        [[0, 0], [0, 1], [0, 2], [1, 2]], // L
        [[0, 0], [0, 1], [0, 2], [0, 3]], // I
        [[0, 0], [0, 1], [1, 0], [1, 1]], // square
        [[0, 0], [0, 1], [0, 2]], // I
        [[0, 0], [0, 1], [1, 0]], // L
        [[0, 0], [0, 1]], // I
        [[0, 0]], // dot
      ]
      this.closeTableColor = [
        // '#00ff0000'
        '#ffffff'
      ]
      this.blankTableColor = [
        '#757474ff'
        // '#ffffff'
      ]
      this.blockTypeColor = [
        '#330707', // z-asym
        '#5f3535', // z-sym
        '#805858', // +
        '#6b1111', // T
        '#8f2ca8', // I
        '#af4545', // thumb
        '#eee000', // z
        '#7e1c3bf1', // T
        '#babcd4', // L
        '#004c8a', // I
        '#f7c7c7', // square
        '#fca7a7', // I
        '#2ec948', // L
        '#3dccb9', // I
        '#29a9c9' // dot
      ]
      this.baseBlockSizeIdx = { 5: [0, 5], 4: [6, 10], 3: [11, 12], 2: [13, 13], 1: [14, 14] }
      this.blockDirection = { 1: 'borderTop', 2: 'borderLeft', 4: 'borderRight', 8: 'borderBottom' }
      // [i][j] => i: 블록타입 종류,  j: 블록의 회전에 따른 종류
      this.allBlockType = new Array(this.baseBlockType.length)
      this.getAllBlockType();
      this.binaryBlockOn = 1 // 블록바이너리표현 :  블록이 있는 부분
      this.binaryBlockOff = 0 // 블록바이너리표현 : 블록이 없는 부분
      this.closeTableValue = 0 // 유니온 지도에서 채울수 없는 부분
      this.blankTableValue = 1 // 유니온 지도에서 채워질 부분 (비어있는 부분)
      this.limitBlockSize = 5; // 한 블록의 최대 큐브 개수
      this.limitBlockLength = 5; // 좌표평면상 블록의 최대 길이
      BlockType.instance = this;
    }

    getDefaultTableStyle(table) {
      let style = Array.from(Array(table.length), () => Array(table[0].length).fill({}))

      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[0].length; j++) {
          let cellStyleMap = {}
          cellStyleMap.direction = []
          cellStyleMap['background'] = this.closeTableColor
          style[i][j] = cellStyleMap
        }
      }
      return style
    }

    /**
* 
* matrix 형태 ex) [[1,2],[2,4],...] 로 되어있는 오브젝트 normalize
* @param {*} block 
* @returns 
*/
    normalizeBlock(block) {
      let minRow = Math.min(...block.map(v => v[0]))
      let minCol = Math.min(...block.map(v => v[1]))

      return block.map(v => [v[0] - minRow, v[1] - minCol]).sort()
    }

    getTableStyle(table) {
      let style = Array.from(Array(table.length), () => Array(table[0].length).fill({}))

      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[0].length; j++) {
          let cellStyleMap = {}
          if (table[i][j] === this.closeTableValue) {
            cellStyleMap.background = this.closeTableColor
          } else if (table[i][j] === this.blankTableValue) {
            cellStyleMap.background = this.blankTableColor
          } else {
            let directionList = this.getConnectedDirection(table[i][j])
            directionList.forEach((v) => {
              cellStyleMap[v] = 'none'
            })
            cellStyleMap['background'] = this.blockTypeColor[this.getOnlyColorIdx(table[i][j])]
          }
          style[i][j] = cellStyleMap
        }
      }
      return style
    }
    /**
     * 상하좌우에 혼자 남겨진 사방이 막힌 블록이 존재하는지 체크.
     * @param {*} position  : 현재 좌표
     * @param {*} table : 유니온 배치판
     * @param {*} k : 막힌 블록의 값
     * @returns 
     */
    checkBlankAlone(position, table) {
      // 상 좌 우 하
      let dxy = [[-1, 0], [0, -1], [0, 1], [1, 0]]
      const lenX = table.length;
      const lenY = table[0].length;

      for (let i = 0; i < dxy.length; i++) { // 현재블록에서 상하좌우 블록 이동
        let nx = position[0] + dxy[i][0]
        let ny = position[1] + dxy[i][1]

        let closeAllState = 2 ** 4 - 1
        let closeCurState = 0
        const direction = Object.keys(this.blockDirection).map((v) => Number(v))
        // 옮겨간 블록이 유효하고 비어있는 블록일때만 체크.
        if (0 <= nx && 0 <= ny && nx < lenX && ny < lenY && table[nx][ny] === this.blankTableValue) {
          for (let j = 0; j < dxy.length; j++) {
            let nnx = nx + dxy[j][0]
            let nny = ny + dxy[j][1]
            // 옮겨간 블록의 사방이 막혀있는지 체크
            if (0 > nnx || 0 > nny || nnx >= lenX || nny >= lenY || (table[nnx][nny] !== this.blankTableValue)) {
              closeCurState += direction[j]
            }
          }
        }

        if (closeAllState === closeCurState) {
          return true;
        }
      }
      return false;
    }

    /**
     * 블록이 연결되있는 지점을 이진수로 반환
     * @param {*} block : 한 block 좌표 리스트 반환
     */
    checkDirection(block) {

      // 상 좌 우 하
      const dx = [-1, 0, 0, 1]
      const dy = [0, -1, 1, 0]
      const direction = Object.keys(this.blockDirection).map((v) => Number(v))
      // console.log('direction', direction)
      const result = new Array(block.length).fill(0)
      for (let i = 0; i < block.length; i++) {
        for (let j = 0; j < dx.length; j++) {
          let nx = block[i][0] + dx[j];
          let ny = block[i][1] + dy[j];
          block.forEach(v => {
            if (JSON.stringify([nx, ny]) === JSON.stringify(v)) {
              result[i] += direction[j]
            }
          })
        }
      }
      return result
    }

    /**
     * 백단위의 색상값은 무시하고 방향값에 대해 어떤 방향의 테두리를 연결해야하는지 속성값 반환
     * @param {*} value 테이블에 들어가있는 색상 및 방향값
     */
    getConnectedDirection(value) {
      let result = []
      let directionBit = value % 100
      Object.keys(this.blockDirection).forEach((v) => {
        v = Number(v)
        // console.log('type a = ',typeof(a), ",  b = ",typeof(b))
        if ((directionBit & v) === v) {
          result.push(this.blockDirection[v])
        }
      })
      return result
    }








    checkTableBlank(value) {
      if (value === this.blankTableValue) {
        return true
      } else {
        return false
      }
    }

    /**
     * 유니온에 존재하는 모든 블록 종류에 대한 정보 init
     */
    getAllBlockType() {
      for (let k = 0; k < this.baseBlockType.length; k++) {
        this.allBlockType[k] = new Set()
        const baseBlockElement = this.baseBlockType[k]
        // 회전 및 뒤집기를 통해 8번 rotation을 하여 모든 타입의 블록 json으로 반환.
        let max = Math.max(...baseBlockElement.map(v => Math.max(v[0], v[1])))
        let rotateBlock = JSON.parse(JSON.stringify(baseBlockElement));
        for (let i = 0; i < 4; i++) {
          if (i > 0) {
            rotateBlock = rotateBlock.map(v => [max - v[1], v[0]]) // 90도 회전
          }
          let normalRotate = this.normalizeBlock(rotateBlock)

          this.allBlockType[k].add(normalRotate)
        }
        // 뒤집어서 다시 4번 회전.
        let transBlock = baseBlockElement.map(v => [v[1], v[0]])
        for (let i = 0; i < 4; i++) {
          if (i > 0) {
            transBlock = transBlock.map(v => [max - v[1], v[0]]) // 90도 회전
          }
          let transNormalRotate = this.normalizeBlock(transBlock)
          this.allBlockType[k].add(transNormalRotate)
        }
      }
    }

    /**
     * 색상은 baseBlockType 인덱스 기준으로 100~1600 까지 백단위로 지정.

     * @param {*} block 
     * @returns table에 들어갈 색상 값
     */
    getColorByBlock(block) {
      let len = block.length;

      let startArrIdx = this.baseBlockSizeIdx[len][0]
      let endArrIdx = this.baseBlockSizeIdx[len][1]
      for (let i = startArrIdx; i < endArrIdx + 1; i++) {
        let blockType = Array.from(this.allBlockType[i])
        for (let j = 0; j < blockType.length; j++) {
          let blockRotateType = blockType[j]
          if (JSON.stringify(blockRotateType) === JSON.stringify(block)) {
            return (i + 1) * 100
          }
        }
      }
    }

    /**
     * 색상과 방향값 중 색상인덱스만 추출
     * @param {*} value 
     */
    getOnlyColorIdx(value) {
      return Math.floor(value / 100) - 1
    }

    /**
     * 
     * @param {*} value : table에 들어가있는 색상 및 방향값
     */
    getBaseBlockByColor(value) {
      let blockIdx = Math.floor(value / 100) - 1
      return this.baseBlockType[blockIdx]
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


