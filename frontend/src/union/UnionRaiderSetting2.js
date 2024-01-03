import BlockType from './BlockType';
import { shuffle } from '../util/util'

export default class UnionRaiderSetting2 {

    /**
     * 
     * @param {*} name : 캐릭터 이름
     * @param {*} raider : 공격대원 좌표
     * @param {*} table : 배치판 좌표
     * @param {*} setTable : 실시간 table 렌더링을 위함
     * @param {*} blockType : blockTypeInstance 활용
     */
    constructor(name, raider, table, setTable) {
        this.name = name
        this.raider = raider // raider는 기본적으로 unionRaiderResponse의 unionBlock으로 받는것이 원칙.
        this.table = table
        this.copyTable = JSON.parse(JSON.stringify(table))
        this.setTable = setTable;
        this.dominatedBlocks = []
        this.filledCount = 0;
        this.blockType = new BlockType();
        // 블록 좌표형
        this.blocks = []
        // 블록 바이너리형
        this.blocksBinary = []
        // 블록 종류별 개수 카운트
        this.blocksCount = []
        // 블록 사이즈 체크
        this.blocksSize = []
        // this.blocksSuffleIdx = []

        // 결과
        this.resultBlocks = null;
        this.resultBlocksBinary = null;
        this.resultBlocksCount = null;
        this.resultTable = null;
        this.resultDomiBlocks = null;
        this.resultRecordTF = false;
        this.resultTableStyle = null;
    }
    addFilledCount() {
        this.filledCount = this.filledCount + 1
    }

    parseRaider() {
        if (!this.raider) {
            console.log("raider information is null. character name = " + this.name);
            return;
        }
        this.raider.forEach(block => {
            // const size = block.blockPosition.length;
            const normalizedBlock = this.blockType.normalizeOriginBlock(block.blockPosition)
            // const blockIdx = normalizedBlock.length - 1

            // index = length -1 
            // let blockListBySize = this.blocks[blockIdx]
            let existType = false;
            for (let i = 0; i < this.blocks.length; i++) {
                const type = this.blocks[i]
                for (let j = 0; j < type.length; j++) {
                    const rotateType = type[j]
                    if (JSON.stringify(rotateType) === JSON.stringify(normalizedBlock)) {
                        existType = true;
                        this.blocksCount[i] += 1;
                    }
                }
            }

            if (!existType) {
                this.blocksSize.push(normalizedBlock.length)
                let rotateBlocks = this.blockType.rotate(normalizedBlock).sort();
                let rotateBlocksBinary = []
                rotateBlocks.forEach((block) => {
                    rotateBlocksBinary.push(this.blockType.transToBinary(block))
                })
                this.blocks.push(rotateBlocks)
                this.blocksBinary.push(rotateBlocksBinary)
                this.blocksCount.push(1)

            }

        })
        // for (let i = 0; i < this.blocksCount; i++) {
        //     this.blocksSuffleIdx.push(i)
        // }
        // this.blocksSuffleIdx.shuffle()
    }

    setTableStyleValue() {
        this.resultTableStyleValue = JSON.parse(JSON.stringify(this.resultTable))
        for (let i = 0; i < this.resultDomiBlocks.length; i++) {
            const domiBlock = this.resultDomiBlocks[i]
            const direction = this.blockType.checkDirection(domiBlock)
            const color = this.blockType.getColorByBlock(this.blockType.normalizeBlock(domiBlock))
            for (let j = 0; j < domiBlock.length; j++) {
                let v = domiBlock[j]
                let styleValue = 0
                styleValue += direction[j]
                styleValue += color
                this.resultTableStyleValue[v[0]][v[1]] = styleValue
            }
        }
    }

    classify() {
        let domiBlocks = []
        let shuffleIdx = []
        for (let i = 0; i < this.blocksCount.length; i++) {
            shuffleIdx.push(i)
        }
        const scanTF = this.scan(this.table, this.blocksCount, domiBlocks, shuffleIdx)
        console.log('union classify :', scanTF)
    }


    scan(table, blocksCount, domiBlocks, shuffleIdx) {

        let matchTF = false

        // 남아있는 블럭 개수 체크
        let remainBlocksTF = false
        blocksCount.forEach((typeCnt) => {
            if (typeCnt !== 0) {
                remainBlocksTF = true
            }
        })
        if (!remainBlocksTF) {
            matchTF = true
            if (!this.resultRecordTF) {
                this.resultBlocksCount = blocksCount
                this.resultTable = table
                this.resultDomiBlocks = domiBlocks
                this.resultRecordTF = true
            }
            return matchTF
        }


        let curTable = JSON.parse(JSON.stringify(table))
        let curBlocksCount = JSON.parse(JSON.stringify(blocksCount))
        let curDomiBlocks = JSON.parse(JSON.stringify(domiBlocks))
        let curShuffleIdx = JSON.parse(JSON.stringify(shuffleIdx))


        // matchTF 가 false가 의미하는것
        // 1. 하위함수에서 매칭이 되지 않는 블록이 존재하여 현재함수에서 모든 케이스까지 트라이했는데 매칭되는 케이스가 없음

        let blankTF = false;
        for (let i = 0; i < curTable.length; i++) {
            for (let j = 0; j < curTable[0].length; j++) {
                blankTF = this.blockType.checkTableBlank(curTable[i][j])
                if (blankTF) {
                    //스캔하기전에 현재 블록 기준으로 생성된 덩어리가 블록의 개수와 숫자를 고려할때 가능한 조합인지 체크
                    // 1. 블록덩어리 스캔 (bfs)
                    const startScan = performance.now()
                    const start = [[i, j]]
                    console.time('bfs time')
                    const blockDummy = this.bfs(start, JSON.parse(JSON.stringify(curTable)), this.blockType.closeTableValue)
                    console.timeEnd('bfs time')
                    console.time('checkFittable time')
                    // 2. 현재 남은 블록 개수와 숫자의 합 = 블록 덩어리 사이즈 경우가 있는지 체크 (dynamic programming)
                    const fittableTF = this.checkFittable(curBlocksCount, blockDummy.length)
                    console.timeEnd('checkFittable time')
                    if (fittableTF) {
                        // let shuffleIdx = []
                        // for (let s = 0; s < blocksBinary.length; s++) {
                        //     shuffleIdx.push(s)
                        // }
                        // shuffleIdx.shuffle()
                        const idx = curShuffleIdx.shift()
                        curShuffleIdx.push(idx)
                        // 블록 사이즈 종류 회전타입별로 하나씩 스캔
                        for (let k = 0; k < curShuffleIdx.length; k++) {
                            // if (curBlocksCount[k] === 0) { // 개수가 0인 블록은 사용하지 않기.
                            if (blocksCount[curShuffleIdx[k]] === 0) { // 개수가 0인 블록은 사용하지 않기.
                                continue
                            }
                            // const listByType = this.blocksBinary[k]
                            const listByType = this.blocksBinary[curShuffleIdx[k]]
                            for (let l = 0; l < listByType.length; l++) {
                                if (i === 0 && j === 0) {
                                    console.log('i=', i, ', j=', j, ', blankTF=', blankTF)
                                }
                                const blockTypeRotateBinary = listByType[l]
                                const result = this.scanInner(i, j, curTable, blockTypeRotateBinary)
                                if (result.length !== 0) {
                                    curDomiBlocks.push(result)
                                    // 보유블럭 오브젝트들에서 점령된 블록 제거
                                    // curBlocksCount[k] -= 1
                                    curBlocksCount[curShuffleIdx[k]] -= 1

                                    matchTF = this.scan(curTable, curBlocksCount, curDomiBlocks, curShuffleIdx)
                                    if (!matchTF) { // 유니온 배치판 및 점령블록 등 오브젝트 원래대로 되돌려놓기
                                        curTable.length = 0
                                        curBlocksCount.length = 0
                                        curDomiBlocks.length = 0
                                        curTable = JSON.parse(JSON.stringify(table))
                                        curBlocksCount = JSON.parse(JSON.stringify(blocksCount))
                                        curDomiBlocks = JSON.parse(JSON.stringify(domiBlocks))
                                    }
                                }
                                if (matchTF) { break }
                            }
                            if (matchTF) { break }
                        }
                    }
                    const endScan = performance.now()
                    console.log('scan time = ', endScan - startScan, 'i=', i, ',j=', j, ', dummysize = ', blockDummy.length)
                    // 하위 재귀함수에서 실패한 케이스와 현재 함수에서 매칭되는게 없는 케이스를 구분해야함.
                    // 모든 소유한 블록을 스캔했는데 매칭되는게 없다면 상태를 저장하지 않고 상위 재귀함수 복귀
                }
                // 빈칸이 존재하지 않는다. -> 다음 빈칸 탐색
                // 빈칸이 존재하여 이미 matchTF 여부를 판별하였다면 현재 함수에서 취할수 있는 행동은 없음.
                if (blankTF) { break }
            }
            if (blankTF) { break }
        }

        if (!matchTF && blankTF) { // 뒤로가기
            curTable.length = 0
            curBlocksCount.length = 0
            curDomiBlocks.length = 0
            return false
        }
        else {
            // 빈칸이 아예 없는 경우. (마지막까지 모두 빈칸을 체크했는데 없으면 테이블상태를 저장하고 재귀함수 종료)
            // OR  하위함수에서부터 matching이 모두다 완료된 경우
            if (!this.resultRecordTF) {
                this.resultBlocksCount = curBlocksCount
                this.resultTable = curTable
                this.resultDomiBlocks = curDomiBlocks
                this.resultRecordTF = true
            }
            return true
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
    scanInner(row, col, curTable, blocksBinary) {
        const startRowIdx = row - (this.blockType.limitBlockLength - 1)
        // const startRowIdx = row
        const startColIdx = col - (this.blockType.limitBlockLength - 1)
        let sameTF = false
        let result = []
        for (let i = startRowIdx; i <= row; i++) {
            for (let j = startColIdx; j <= col; j++) {
                // if (i < 0 || j < 0 ||
                //     (i + (this.blockType.limitBlockLength - 1)) >= curTable.length ||
                //     (j + (this.blockType.limitBlockLength - 1)) >= curTable[0].length) {
                //     continue
                // }
                let regionBinary = []
                let blocksAbsCoord = [] // 블록의 절대좌표
                for (let k = 0; k < this.blockType.limitBlockLength; k++) {
                    for (let l = 0; l < this.blockType.limitBlockLength; l++) {
                        if ((i + k) < 0 || (j + l) < 0 || (i + k) >= curTable.length
                            || (j + l) >= curTable[0].length) {
                            regionBinary.push(0)
                        } else {
                            regionBinary.push(curTable[i + k][j + l])
                        }

                        // 블록의 절대좌표 미리 저장
                        if (blocksBinary[k * 5 + l] === 1) {
                            blocksAbsCoord.push([i + k, j + l])
                        }
                    }
                }
                sameTF = this.compareBinary(regionBinary, blocksBinary)
                if (sameTF) {
                    result = blocksAbsCoord
                    // 매칭되면 유니온 배치판 점령도 업데이트
                    blocksAbsCoord.forEach((coord) => {
                        curTable[coord[0]][coord[1]] = this.blockType.closeTableValue
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

    checkFittable(blocksCount, targetSum) {
        let numMap = {}
        let numBlockElem = 0
        for (let i = 0; i < blocksCount.length; i++) {
            numMap[this.blocksSize[i]] = blocksCount[i]
            
            numBlockElem += blocksCount[i] * this.blocksSize[i]
        }
        console.log('현재 블록덩어리의 산정공간 : ', targetSum, ', 소유한 블록리스트 : ', numMap, ', 블록원자단위 개수:', numBlockElem)
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
        const result = this.dp2(targetSum, numMap, cache)
        console.log('dp result = ', result);
        if (result) {
            return true
        } else {
            return false
        }
    }

    checkFittableTest(numList, targetSum) {
        // 모든 블록 길이의 합이 더미사이즈 보다 작거나 같다면 가능한것으로 판단할것
        let sum = 0
        numList.forEach((v) => {
            sum += v
        })
        if (sum <= targetSum) {
            console.log('table space is enough')
            return true
        }
        let cache = new Map()
        // const result = this.dp2(targetSum, numList, numCount, cache)
        const result = this.dp(targetSum, numList, cache)
        console.log('dp result = ', result);
        if (result) {
            return true
        } else {
            return false
        }
    }

    // cache :  6 : [1,2,3] 과 같이 map으로 활용
    dp(targetSum, numList, cacheMap) {
        if (targetSum < 0) {
            return null
        } else if (targetSum === 0) {
            return []
        }

        if (cacheMap.has(targetSum)) {
            let usable = true
            let cacheList = cacheMap[targetSum]
            cacheList.forEach((cache) => {
                cache.forEach((v) => {
                    if (!numList.includes(v)) {
                        usable = false
                    }
                })

            })
            if (usable) { return cacheList }
        }


        for (let i = 0; i < numList.length; i++) {
            let copyNumList = JSON.parse(JSON.stringify(numList))
            let curValue = copyNumList.splice(i, 1)
            if (i === 24) {
                console.log('test')
            }
            const resultInner = this.dp(targetSum - curValue, copyNumList, cacheMap)
            // null 넘어왔다면 경우의 수 조합이 없는것으로 간주하고 넘어가기
            if (!resultInner) {
                continue
            }
            let result = []
            resultInner.forEach((v) => {
                result.push(v)
            })
            result.push(curValue)
            if (cacheMap.has(targetSum)) {
                cacheMap[targetSum].add(result.sort())
            } else {
                cacheMap[targetSum] = new Set(result)
            }
            let resultCheck = 0;
            result.forEach((v) => {
                resultCheck += v
            })
            return result
        }
        // 다 돌았는데도 반환되는게 없으면 null 반환
        return null
    }


    /**
     * 
     * @param {*} numMap  key : 블록사이즈 , value : 블록의 개수
     * @param {*} targetSum 
     * @returns 
     */
    checkFittableTest2(numMap, targetSum) {
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
        const result = this.dp2(targetSum, numMap, cache)
        console.log('dp result = ', result);
        if (result) {
            return true
        } else {
            return false
        }
    }

    // cache :  6 : [1,2,3] 과 같이 map으로 활용
    dp2(targetSum, numMap, cacheMap) {
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
            
            const resultInner = this.dp2(targetSum - num, copyNumMap, cacheMap)
            // null 넘어왔다면 경우의 수 조합이 없는것으로 간주하고 넘어가기
            if (!resultInner) {
                continue
            }
            let result = {}
            result[num] = 1
            // console.log('result type = ',typeof(result))

            let resultInnerKeyList = Object.keys(resultInner)
            for(let j=0; j<resultInnerKeyList.length; j++){
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

    testMapSorting() {
        const map1 = { 1: 20, 2: 40 }
        const map2 = { 2: 40, 1: 20 }
        if (JSON.stringify(map1) === JSON.stringify(map2)) { // 같음.
            console.log('no regards order same')
        }

        console.log(JSON.stringify(map1), ': ', JSON.stringify(map2))
        if (map1 === map2) { // 같지 않음.
            console.log('ordering same')
        }
        let map1keyList = Object.keys(map1)
        for (let i = 0; i < map1keyList.length; i++) {
            console.log('key=', map1keyList[i], ', value = ', map1[map1keyList[i]])
        }
    }

    testMapNullCheck() {
        const map1 = {}
        if (!map1) {  // 있는것으로 간주.
            console.log('map is empty')
        }
        const map1KeyList = Object.keys(map1) 
        console.log('map key list = ',map1KeyList)  // Array(0)
    }


    




}