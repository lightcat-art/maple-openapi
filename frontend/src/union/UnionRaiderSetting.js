import BlockType from './BlockType';

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

    // 채워야할 곳은 0으로 표현하기. 채울필요가 없거나 이미 채워진곳은 1으로 표시.
    /**
     * 
     * @param {*} start : 탐색시작좌표
     * @param {*} table : 0과 1로 이루어진 좌표평면 배치도
     * @param {*} k : 0과 1중 어떤값을 가진 블록을 목표로 탐색을 해야하는지
     * @returns 
     */
    bfs(start, table, k) {
        // 상, 좌, 우, 하 순으로 탐색
        const lenX = table.length;
        const lenY = table[0].length;
        const dx = [-1, 0, 0, 1]
        const dy = [0, -1, 1, 0]

        // parsedBlock에서 채워진 블록은 뺴야함.
        // 채워진 좌표를 찍어야함. 
        // 채워진 좌표를 찍기만 하면 절대좌표로 계산해서 블록 뺄수 있음.
        let visit = JSON.parse(JSON.stringify(start)); // deep copy를 통해 visit이 start에 영향을 줄수 없도록 구성.
        let domiBlock = [] // 점령된 블록 
        while (visit.length > 0) {
            let fitted = false
            let delParsedBlockIdx = -1;
            let [cx, cy] = visit.shift()
            // table[cx][cy] = 1
            domiBlock.push([cx, cy])

            const domiRotateBlocks = this.rotate(domiBlock);

            for (let i = 0; i < this.parsedBlocks.length; i++) {
                const parse = this.parsedBlocks[i]
                if (parse.length === domiBlock.length) {
                    if (parse.length === 1) {
                        console.log('test')
                    }
                    // console.log('compare parsedBlocks vs dominated blocks : parsed = ',
                    // parse, ", dominated = ", domiBlock);
                    for (let j = 0; j < domiRotateBlocks.length; j++) {
                        const domi = domiRotateBlocks[j]
                        if (JSON.stringify(domi) === JSON.stringify(parse)) {
                            delParsedBlockIdx = i
                            fitted = true
                            break
                        }
                    }
                }
                if (fitted) { break }
            }

            if (fitted) {
                this.parsedBlocks.splice(delParsedBlockIdx, 1)
                // table에 점령된 곳에 대해서 점령되었다고 바꾸기.
                let direction = this.blockType.checkDirection(domiBlock)
                let color = this.blockType.getColorByBlock(domiBlock)
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


            for (let i = 0; i < dx.length; i++) {
                let nx = cx + dx[i]
                let ny = cy + dy[i]
                if (0 <= nx && 0 <= ny && nx < lenX
                    && ny < lenY && (table[nx][ny] === k)) {
                    visit.push([nx, ny])
                    // table[nx][ny] = k
                    continue
                }
            }
            // 더이상 방문할곳에 없다면 추출할 것이 없는것으로 보고 종료
            if (visit.length === 0) {
                domiBlock.length = 0
                break
            }
        }
        if (domiBlock.length === 1) {
            console.log('test')
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
                    const bfsResult = this.bfs([[i, j]], this.table, 0)
                    if (bfsResult.length !== 0) {
                        this.dominatedBlocks.push(bfsResult)
                    }
                }
            }
        }
        return this.dominatedBlocks
    }
}