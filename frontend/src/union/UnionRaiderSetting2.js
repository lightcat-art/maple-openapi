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
        this.blocks = Array.from(Array(this.blockType.limitBlockSize), () => Array())
        // 블록 바이너리형
        this.blocksBinary = Array.from(Array(this.blockType.limitBlockSize), () => Array())
        // 블록 종류별 개수 카운트
        this.blocksCount = Array.from(Array(this.blockType.limitBlockSize), () => Array(0))
        this.resultBlocks = null;
        this.resultBlocksBinary = null;
        this.resultBlocksCount = null;
        this.resultTable = null;
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
            const blockIdx = normalizedBlock.length - 1

            // index = length -1 
            let blockListBySize = this.blocks[blockIdx]
            let existType = false;
            for (let i = 0; i < blockListBySize.length; i++) {
                const type = blockListBySize[i]
                for (let j = 0; j < type.length; j++) {
                    const rotateType = type[j]
                    if (JSON.stringify(rotateType) === JSON.stringify(normalizedBlock)) {
                        existType = true;
                        this.blocksCount[blockIdx][i] += 1;
                    }
                }
            }

            if (!existType) {
                let rotateBlocks = this.blockType.rotate(normalizedBlock).sort();
                let rotateBlocksBinary = []
                rotateBlocks.forEach((block) => {
                    rotateBlocksBinary.push(this.blockType.transToBinary(block))
                })
                this.blocks[blockIdx].push(rotateBlocks)
                this.blocksBinary[blockIdx].push(rotateBlocksBinary)
                this.blocksCount[blockIdx].push(1)
            }

        })
    }

    /**
     * 
     * @param {*} table 
     * @param {*} blocks 
     * @param {*} blocksBinary 
     * @param {*} blocksCount 
     * @param {*} domiBlocks 
     */
    scan(table, blocks, blocksBinary, blocksCount, domiBlocks) {
        let curTable = JSON.parse(JSON.stringify(table))
        let curBlocks = JSON.parse(JSON.stringify(blocks))
        let curBlocksBinary = JSON.parse(JSON.stringify(blocksBinary))
        let curBlocksCount = JSON.parse(JSON.stringify(blocksCount))
        let curDomiBlocks = JSON.parse(JSON.stringify(domiBlocks))

        // 많이 느리다 싶으면 재귀함수 시작점을 현재 스캔실패 인덱스의 바로 다음인덱스로 지정..?

        let matchTF = false
        let backTF = false
        for (let i = 0; i < curTable.length; i++) {
            for (let j = 0; j < curTable[0].length; j++) {
                const blankTF = this.blockType.checkTableBlank(curTable[i][j])
                if (blankTF) {
                    // 블록 사이즈 종류 회전타입별로 하나씩 스캔
                    for (let k = 0; k < blocksBinary.length; k++) {
                        const listBySize = blocksBinary[k]
                        for (let l = 0; l < listBySize.length; l++) {
                            const listByType = listBySize[l]
                            for (let m = 0; m < listByType.length; m++) {
                                const blockTypeRotateBinary = listByType[m]
                                const result = this.scanInner(i, j, curTable, blockTypeRotateBinary)
                                if (result.length !== 0) {
                                    // matchTF = true
                                    curDomiBlocks.push(result)
                                    // 보유블럭 오브젝트들에서 점령된 블록 제거
                                    curBlocksCount[k][l] -= 1
                                    if (curBlocksCount[k][l] === 0) {
                                        curBlocks[k].splice(l, 1)
                                        curBlocksBinary[k].splice(l, 1)
                                    }
                                    matchTF = this.scan(curTable, curBlocks, curBlocksBinary, curBlocksCount, curDomiBlocks)
                                }

                                if (matchTF) {break}
                            }
                            if (matchTF) {break}
                        }
                        if (matchTF) {break}
                    }
                    // 하위 재귀함수에서 실패한 케이스와 현재 함수에서 매칭되는게 없는 케이스를 구분해야함.
                    // 모든 소유한 블록을 스캔했는데 매칭되는게 없다면 상태를 저장하지 않고 상위 재귀함수 복귀
                    if (!matchTF) {
                        backTF = true
                    }
                }
                if (backTF) { break }
                // 비어있는 블록을 한번 체크하고 해당 블록에 연결된 모든 경우를 스캔했다면 무조건
                // 다음 재귀함수로 넘어가거나 이전 재귀함수로 복귀해야함.
            }
            if (backTF) { break }
        }
        if (backTF) { // 빈칸이 있는데 매칭되는게 없는경우 뒤로가기
            return false
        } else {
            // 빈칸이 아예 없는 경우. 마지막까지 모두 빈칸을 체크했는데 없으면 테이블상태를 저장하고 재귀함수 종료.
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
        const startRowIdx = row - 4
        const startColIdx = col
        let sameTF = false
        let result = []
        for (let i = startRowIdx; i <= row; i++) {
            for (let j = startColIdx; j <= col; j++) {
                if (i < 0 || j < 0 || i >= curTable.length || j >= curTable[0].length) {
                    continue
                }
                let regionBinary = []
                let blocksAbsCoord = [] // 블록의 절대좌표
                for (let k = 0; k < this.blockType.limitBlockLength; k++) {
                    for (let l = 0; l < this.blockType.limitBlockLength; l++) {
                        regionBinary.push(curTable[i + k][j + l])

                        // 블록의 절대좌표 미리 저장
                        if (blocksBinary[k + l] === 1) {
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








}