import BlockType from './BlockType';
import { shuffle } from '../common/util'

export default class UnionRaiderSetting {

    /**
     * 
     * @param {*} name : 캐릭터 이름
     * @param {*} raider : 공격대원 좌표
     * @param {*} table : 배치판 좌표
     * @param {*} setTable : 실시간 table 렌더링을 위함
     * @param {*} blockType : blockTypeInstance 활용
     */
    constructor(name, raider, table, setTable, blockType) {
        this.name = name
        this.raider = raider // raider는 기본적으로 unionRaiderResponse의 unionBlock으로 받는것이 원칙.
        this.parsedBlocks = []
        this.table = table
        this.setTable = setTable;
        this.dominatedBlocks = []
        this.filledCount = 0;
        this.blockType = new BlockType();
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
            const normalizedBlock = this.normalizeOriginBlock(block.blockPosition);
            this.parsedBlocks.push(normalizedBlock);
        })
        // this.parsedBlocks.sort();
    }

    normalizeOriginBlock(block) {
        let minX = Math.min(...block.map(v => v.x))
        let minY = Math.min(...block.map(v => v.y))

        return block.map(v => [v.x - minX, v.y - minY]).sort()
    }

    normalizeBlock(block) {
        let minX = Math.min(...block.map(v => v[0]))
        let minY = Math.min(...block.map(v => v[1]))

        return block.map(v => [v[0] - minX, v[1] - minY]).sort()
    }

    rotate(block) {
        // 회전 및 뒤집기를 통해 8번 rotation을 하여 모든 타입의 블록 json으로 반환.
        let max = Math.max(...block.map(v => Math.max(v[0], v[1])))
        let allBlockType = [];
        let rotateBlock = JSON.parse(JSON.stringify(block));
        for (let i = 0; i < 4; i++) {
            if (i > 0) {
                rotateBlock = rotateBlock.map(v => [max - v[1], v[0]]) // 90도 회전
            }
            let normalRotate = this.normalizeBlock(rotateBlock)
            let existElement = false;
            allBlockType.forEach(v => {
                if (JSON.stringify(normalRotate) === JSON.stringify(v)) {
                    existElement = true
                }
            })
            if (!existElement) {
                // this.allBlockType[k].push(normalRotate)
                allBlockType.push(normalRotate);
            }
        }
        // 뒤집어서 다시 4번 회전.
        let transBlock = block.map(v => [v[1], v[0]])
        for (let i = 0; i < 4; i++) {
            if (i > 0) {
                transBlock = transBlock.map(v => [max - v[1], v[0]]) // 90도 회전
            }
            let transNormalRotate = this.normalizeBlock(transBlock)
            let existElement = false;
            allBlockType.forEach(v => {
                if (JSON.stringify(transNormalRotate) === JSON.stringify(v)) {
                    existElement = true
                }
            })
            if (!existElement) {
                // this.allBlockType[k].push(normalRotate)
                allBlockType.push(transNormalRotate);
            }
        }
        return allBlockType;
    }

    // 채워야할 곳은 0으로 표현하기. 채울필요가 없거나 이미 채워진곳은 -1으로 표시.
    /**
     * 
     * @param {*} start : 탐색시작좌표
     * @param {*} table : 0과 1로 이루어진 좌표평면 배치도
     * @param {*} k : 0과 1중 어떤값을 가진 블록을 목표로 탐색을 해야하는지
     * @returns 
     */
    bfs(start, table, k, failedBlocks) {
        // 상, 좌, 우, 하 순으로 탐색
        const lenX = table.length;
        const lenY = table[0].length;
        // let dxy = [[-1, 0], [0, -1], [0, 1], [1, 0]]
        // let dxy = [[0, -1], [-1, 0], [0, 1], [1, 0]]

        // dxy = dxy.shuffle()
        // const dx = [-1, 0, 0, 1]
        // const dy = [0, -1, 1, 0]
        let bfsTable = JSON.parse(JSON.stringify(table)) // 시뮬레이션 돌리기위해 테이블 복사

        // parsedBlock에서 채워진 블록은 뺴야함.
        // 채워진 좌표를 찍어야함. 
        // 채워진 좌표를 찍기만 하면 절대좌표로 계산해서 블록 뺄수 있음.
        let visit = JSON.parse(JSON.stringify(start)); // deep copy를 통해 visit이 start에 영향을 줄수 없도록 구성.
        let domiBlock = [] // 점령된 블록 
        while (visit.length > 0) {
            let dxyShuffle =
                [
                    [[-1, 0], [0, -1], [0, 1], [1, 0]],
                    [[0, -1], [-1, 0], [0, 1], [1, 0]],
                    // [[0, -1], [-1, 0], [1, 0], [0, 1]],
                    // [[-1, 0], [0, -1], [1, 0], [0, 1]]
                ]
            dxyShuffle = dxyShuffle.shuffle()
            let fitted = false
            let delParsedBlockIdx = -1;
            let [cx, cy] = visit.shift()
            bfsTable[cx][cy] = -1
            domiBlock.push([cx, cy])

            // bfs를 통해 탐색된 블록 자체의 회전케이스를 구해  소유한 블록과 비교한다.
            // 탐색된 블록에 대해 fitted 되는 8가지 가능성이 존재하기 때문. (회전 및 뒤집기를 이용하면)
            const domiRotateBlocks = this.rotate(domiBlock);

            for (let i = 0; i < this.parsedBlocks.length; i++) {
                const parse = this.parsedBlocks[i]

                let failed = false
                if (parse.length === domiBlock.length) {
                    
                    for (let j = 0; j < domiRotateBlocks.length; j++) {
                        const domi = domiRotateBlocks[j]
                        if (JSON.stringify(domi) === JSON.stringify(parse)) {
                            for (let k = 0; k < failedBlocks.length; k++) {
                                const failedBlock = failedBlocks[k]
                                if (JSON.stringify(parse) === JSON.stringify(failedBlock)) {
                                    // 이미 실패처리된 케이스 중복체크
                                    failed = true
                                    break
                                }
                            }
                            if (failed) { // 그 다음 소유 블록을 체크하기 위해 넘어간다.
                                break
                            }
                            // 사방으로 둘러봤을때 막힌 구역이 존재하는지 체크.
                            // 여러개의 블록이 남아있더라도 현재 남은 블록중 맞는 블록이 없으면 의미없기때문에 이런 로직도 추가해주어야함.
                            if (this.blockType.checkBlankAlone([cx, cy], bfsTable)) {
                                failed = true
                                continue
                            }
                            delParsedBlockIdx = i
                            fitted = true
                            break
                        }
                    }
                }
                if (failed) {
                    // 막힌 블록구역을 생성하는 블록케이스는 모두 failedBlocks 에 넣어 중복으로 트라이되지 않도록 처리한다. (회전케이스 포함)
                    // because. 불변성을 가진 탐색블록에 대해 적합하지 않다고 판명된 블록은 모든 회전케이스에 대해서도 적합하지 않으므로 모두 추가.
                    domiRotateBlocks.forEach((v) => {
                        failedBlocks.push(v)
                    })
                }
                if (fitted) { break }
            }

            if (fitted) {
                this.parsedBlocks.splice(delParsedBlockIdx, 1)
                // table에 점령된 곳에 대해서 점령되었다고 바꾸기.
                let direction = this.blockType.checkDirection(domiBlock)
                let color = this.blockType.getColorByBlock(this.normalizeBlock(domiBlock))
                for (let i = 0; i < domiBlock.length; i++) {
                    let tableValue = 0
                    let v = domiBlock[i]
                    tableValue += direction[i]
                    tableValue += color
                    table[v[0]][v[1]] = tableValue
                    this.addFilledCount()
                    // 블록종류는 백의자리부터 표현 (기본 15종류 더해질수 있음.). 블록방향은 이진수로 표현.
                    this.setTable(table)
                }
                break
            }

            if (domiBlock.length > 5) {
                //길이가 5를 초과하는 블록은 존재하지 않으므로 bfs 종료.
                domiBlock.length = 0
                break
            }


            for (let i = 0; i < dxyShuffle.length; i++) {
                let nx = cx + dxyShuffle[0][i][0]
                let ny = cy + dxyShuffle[0][i][1]
                if (0 <= nx && 0 <= ny && nx < lenX && ny < lenY && (bfsTable[nx][ny] === k)) {
                    // console.log('bfs visit : [nx,ny] = ', [nx, ny])
                    visit.push([nx, ny])
                    // bfsTable[nx][ny] = k
                    break
                }
            }
            // 더이상 방문할곳에 없다면 추출할 것이 없는것으로 보고 종료
            if (visit.length === 0) {
                domiBlock.length = 0
                break
            }
        }
        // console.log('finish bfs')
        return domiBlock
    }

    classify() {
        //다시 트라이할 경우를 대비해 table copy하여 bfs 돌리기? 추후 생각.
        for (let i = 0; i < this.table.length; i++) {
            for (let j = 0; j < this.table[0].length; j++) {
                if (this.table[i][j] === 0) {
                    // console.log('bfs start i=',i,', j=',j)
                    // 이미 한번 트라이해본 블록이라면 패스
                    let failedBlocks = []
                    let bfsResult = [];
                    let limitLoopCnt = 0;
                    while (bfsResult.length == 0 && limitLoopCnt < 1) {
                        bfsResult = this.bfs([[i, j]], this.table, 0, failedBlocks)
                        if (bfsResult.length !== 0) {
                            this.dominatedBlocks.push(bfsResult)
                        }
                        // console.log('failedBlocks = ', failedBlocks)
                        limitLoopCnt += 1
                    }
                    console.log('limitCnt = ',limitLoopCnt)
                }
            }
        }
        return this.dominatedBlocks
    }
}