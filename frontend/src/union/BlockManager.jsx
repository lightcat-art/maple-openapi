class BlockTooltip {
    constructor(desc, domiDesc, grade) {
        this.desc = desc
        this.grade = grade
        this.domiDesc = domiDesc
    }
}

class BlockDomiTooltip {
    constructor(level, className, type) {
        this.level = level
        this.className = className
        this.type = type
    }
}
class BlockManager {
    // React component에서 선언하는 경우 다시 새로고침하면 인스턴스 날아감.
    // 현재 가지고 있는 블록 정보를 기반으로 화면에 표시할수 있도록 도와주는 클래스
    static instance;
    constructor(blockColor, selectedTableColor, basicTableColor, blockColorOriginBg, blockColorOriginBd, regionLimitBorder) {
        if (BlockManager.instance) return BlockManager.instance;
        this.baseBlockType = [ // 블록타입별 좌표
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
        this.baseBlockGrade = [ // 블록타입별 설명
            ['SSS'],
            ['SSS'],
            ['SSS'],
            ['SSS'],
            ['SSS'],
            ['SSS'],
            ['SS'],
            ['SS'],
            ['SS'],
            ['SS'],
            ['SS'],
            ['S'],
            ['S'],
            ['A'],
            ['B']
        ]
        this.baseLevel = [[250, 200, 140, 100, 60], [120, 70, 50, 30]]
        this.baseBlockDesc = [
            [[`${this.baseLevel[0][0]}Lv`, '해적']],
            [[`${this.baseLevel[0][0]}Lv`, '제논']],
            [[`${this.baseLevel[0][0]}Lv`, '마법사']],
            [[`${this.baseLevel[0][0]}Lv`, '도적']],
            [[`${this.baseLevel[0][0]}Lv`, '궁수']],
            [[`${this.baseLevel[0][0]}Lv`, '전사']],
            [[`${this.baseLevel[0][1]}Lv`, '해적']],
            [[`${this.baseLevel[0][1]}Lv`, '마법사']],
            [[`${this.baseLevel[0][1]}Lv`, '제논', '도적']],
            [[`${this.baseLevel[0][1]}Lv`, '궁수'], [`${this.baseLevel[1][0]}Lv`, '메이플 M 캐릭터']],
            [[`${this.baseLevel[0][1]}Lv`, '전사']],
            [[`${this.baseLevel[0][2]}Lv`, '궁수', '도적', '마법사'], [`${this.baseLevel[1][1]}Lv`, '메이플 M 캐릭터']],
            [[`${this.baseLevel[0][2]}Lv`, '전사', '해적']],
            [[`${this.baseLevel[0][3]}Lv`, '전직업'], [`${this.baseLevel[1][2]}Lv`, '메이플 M 캐릭터']],
            [[`${this.baseLevel[0][4]}Lv`, '전직업'], [`${this.baseLevel[1][3]}Lv`, '메이플 M 캐릭터']],
        ]
        this.blockTypeColor = blockColor // 블록타입별 색상
        this.closeTableColor = basicTableColor // 기본 테이블 색상
        this.selectedTableColor = selectedTableColor // 선택시 테이블 색상
        this.blockColorOriginBg = blockColorOriginBg // 유저 유니온 정보 블록 배경 색
        this.blockColorOriginBd = blockColorOriginBd // 유저 유니온 정보 블록 테두리 색
        this.regionLimitBorder = regionLimitBorder // 외부지역 해금 테두리
        this.baseBlockSizeIdx = { 5: [0, 5], 4: [6, 10], 3: [11, 12], 2: [13, 13], 1: [14, 14] }
        this.blockDirection = { 1: 'borderTop', 2: 'borderLeft', 4: 'borderRight', 8: 'borderBottom' }
        // [i][j] => i: 블록타입 종류,  j: 블록의 회전에 따른 종류
        this.allBlockType = new Array(this.baseBlockType.length) // 블록타입의 모든 회전케이스 저장객체
        this.initAllBlockType(); // 회전케이스 계산
        this.closeTableValue = 0 // 유니온 지도에서 채울수 없는 부분
        this.blankTableValue = 1 // 유니온 지도에서 채워질 부분 (비어있는 부분)
        BlockManager.instance = this;
    }

    initBlockDesc() {
        let blockDescList = []
        for (let i = 0; i < this.baseBlockType.length; i++) {
            blockDescList.push(new BlockTooltip(this.baseBlockDesc[i], [], this.baseBlockGrade[i][0]))
        }
        return blockDescList
    }


    getBlockCount(requestBlocks) {
        let blockDescList = this.initBlockDesc()
        if (!requestBlocks) {
            console.log("raider information is null.");
            return;
        }
        let resultCount = Array.from(Array(this.baseBlockType.length).fill(0))
        requestBlocks.forEach(block => {
            const normalizedBlock = this.normalizeOriginBlock(block.blockPosition)
            let idx = this.getBlockIdx(normalizedBlock)
            if (!idx) {
                // 블록이 배치판을 넘어간 이슈로 인해 좌표가 제대로 넘어오지 않은 경우 예외처리
                const normLevel = this.normalizeLevel(Number(block.blockLevel), block.blockType)
                idx = this.getBlockIdxByType(normLevel, block.blockType)
            }
            resultCount[idx]++
            blockDescList[idx].domiDesc.push(new BlockDomiTooltip(block.blockLevel, block.blockClass, block.blockType))

        })
        return { count: resultCount, desc: blockDescList }
    }

    normalizeLevel(level, classType) {
        let resultLevel = 0
        if (classType === '메이플 M 캐릭터') {
            if (level >= this.baseLevel[1][0]) {
                resultLevel = this.baseLevel[1][0]
            } else if (level >= this.baseLevel[1][1]) {
                resultLevel = this.baseLevel[1][1]
            } else if (level >= this.baseLevel[1][2]) {
                resultLevel = this.baseLevel[1][2]
            } else if (level >= this.baseLevel[1][3]) {
                resultLevel = this.baseLevel[1][3]
            }
        } else {
            if (level >= this.baseLevel[0][0]) {
                resultLevel = this.baseLevel[0][0]
            } else if (level >= this.baseLevel[0][1]) {
                resultLevel = this.baseLevel[0][1]
            } else if (level >= this.baseLevel[0][2]) {
                resultLevel = this.baseLevel[0][2]
            } else if (level >= this.baseLevel[0][3]) {
                resultLevel = this.baseLevel[0][3]
            }
        }
        return resultLevel
    }

    getBlockIdxByType(level, classType) {
        const levelStr = `${level}Lv`
        let resultIdx = -1
        // level과 classType 모두 존재하면 해당 idx 갖고오기
        for (let i = 0; i < this.baseBlockDesc.length; i++) {
            for (let j = 0; j < this.baseBlockDesc[i].length; j++) {
                const desc = this.baseBlockDesc[i][j]
                if (desc.indexOf(levelStr) >= 0 && (desc.indexOf(classType) >= 0 || desc.indexOf('전직업') >= 0)) {
                    return i
                }
            }
        }
    }

    getBlockIdx(block) {
        for (let i = 0; i < this.allBlockType.length; i++) {
            let blockType = this.allBlockType[i]
            for (let j = 0; j < blockType.length; j++) {
                let blockRotateType = blockType[j]
                if (JSON.stringify(block) === JSON.stringify(blockRotateType)) {
                    return i
                }
            }
        }
    }

    getRegionLimitBorder(rowLen, colLen, regionLimitIdx) {
        let style = Array.from(Array(rowLen), () => Array(colLen).fill({}))
        for (let i = 0; i < rowLen; i++) {
            for (let j = 0; j < colLen; j++) {
                let cellMap = {}
                let cellStyleInfo = {}
                if (i === regionLimitIdx[0] && j === regionLimitIdx[2]) { // 왼쪽위 모서리
                    cellStyleInfo['borderLeft'] = this.regionLimitBorder;
                    cellStyleInfo['borderTop'] = this.regionLimitBorder;
                } else if (i === regionLimitIdx[1] - 1 && j === regionLimitIdx[2]) { // 왼쪽아래 모서리
                    cellStyleInfo['borderLeft'] = this.regionLimitBorder;
                    cellStyleInfo['borderBottom'] = this.regionLimitBorder;
                } else if (i === regionLimitIdx[0] && j === regionLimitIdx[3] - 1) { // 오른쪽위 모서리
                    cellStyleInfo['borderRight'] = this.regionLimitBorder;
                    cellStyleInfo['borderTop'] = this.regionLimitBorder;
                } else if (i === regionLimitIdx[1] - 1 && j === regionLimitIdx[3] - 1) { // 오른쪽아래 모서리
                    cellStyleInfo['borderRight'] = this.regionLimitBorder;
                    cellStyleInfo['borderBottom'] = this.regionLimitBorder;
                } else if (i === regionLimitIdx[0] && j >= regionLimitIdx[2] && j < regionLimitIdx[3]) { // 위쪽 변
                    cellStyleInfo['borderTop'] = this.regionLimitBorder;
                } else if (i === regionLimitIdx[1] - 1 && j >= regionLimitIdx[2] && j < regionLimitIdx[3]) { // 아래쪽 변
                    cellStyleInfo['borderBottom'] = this.regionLimitBorder;
                } else if (j === regionLimitIdx[2] && i >= regionLimitIdx[0] && i < regionLimitIdx[1]) { // 왼쪽 변
                    cellStyleInfo['borderLeft'] = this.regionLimitBorder;
                } else if (j === regionLimitIdx[3] - 1 && i >= regionLimitIdx[0] && i < regionLimitIdx[1]) { // 오른쪽 변
                    cellStyleInfo['borderRight'] = this.regionLimitBorder;
                } 
                // drawRegion에 덮어씌워지므로 셀 양쪽에서 모두 변경
                  else if (i === regionLimitIdx[1] && j >= regionLimitIdx[2] && j < regionLimitIdx[3]) { //아래쪽변
                    cellStyleInfo['borderTop'] = this.regionLimitBorder;
                } else if (i === regionLimitIdx[0] - 1 && j >= regionLimitIdx[2] && j < regionLimitIdx[3]) { // 위쪽 변
                    cellStyleInfo['borderBottom'] = this.regionLimitBorder;
                } else if (j === regionLimitIdx[2] - 1 && i >= regionLimitIdx[0] && i < regionLimitIdx[1]) { // 왼쪽 변
                    cellStyleInfo['borderRight'] = this.regionLimitBorder;
                } else if (j === regionLimitIdx[3] && i >= regionLimitIdx[0] && i < regionLimitIdx[1]) { // 오른쪽 변
                    cellStyleInfo['borderLeft'] = this.regionLimitBorder;
                } 
                cellMap.style = cellStyleInfo
                style[i][j] = cellMap
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
 * 유니온 좌표정보를 matrix 좌표 구조로 반환
 */
    transformPosition(block, rowOffSet, colOffSet) {
        let resultPosition = []
        for (let position of block) {
            resultPosition.push([rowOffSet - position.y, colOffSet + position.x])
        }
        return resultPosition
    }

    getUserInfoValue(rowLen, colLen, domiBlocks) {
        let tableSelectValue = Array.from(Array(rowLen), () => Array(colLen).fill(0))
        for (let i = 0; i < domiBlocks.length; i++) {
            const domiBlock = domiBlocks[i]
            for (let j = 0; j < domiBlock.length; j++) {
                let v = domiBlock[j]
                let styleValue = 1
                try {
                    tableSelectValue[v[0]][v[1]] = styleValue
                } catch (error) {
                    console.log('error= ', error)
                }
            }
        }
        return tableSelectValue
    }

    getUserInfoStyle(rowLen, colLen, tableSelectValue) {

        let style = Array.from(Array(rowLen), () => Array(colLen).fill({}))

        const direction = [[-1, 0], [1, 0], [0, 1], [0, -1]] // top, left, right, bottom
        const directionNum = [1, 8, 4, 2]
        for (let row = 0; row < rowLen; row++) {
            for (let col = 0; col < colLen; col++) {
                let cellMap = {}
                let cellStyleInfo = {}


                for (let i = 0; i < direction.length; i++) {
                    let nrow = row + direction[i][0]
                    let ncol = col + direction[i][1]
                    if (0 <= ncol && 0 <= nrow && ncol < colLen && nrow < rowLen) {
                        if (tableSelectValue[row][col] > 0 && tableSelectValue[nrow][ncol] > 0) {
                            cellStyleInfo[this.blockDirection[directionNum[i]]] = 'none'
                        } else if (tableSelectValue[row][col] > 0 && tableSelectValue[nrow][ncol] <= 0) {
                            cellStyleInfo[this.blockDirection[directionNum[i]]] = '3px solid ' + this.blockColorOriginBd
                        } else if (tableSelectValue[row][col] <= 0 && tableSelectValue[nrow][ncol] > 0) {
                            cellStyleInfo[this.blockDirection[directionNum[i]]] = 'none'
                        }
                    }
                }
                if (tableSelectValue[row][col] > 0) {
                    cellStyleInfo['background'] = this.blockColorOriginBg
                    cellMap.className = 'block'
                } else {
                    cellStyleInfo['background'] = this.closeTableColor
                }
                cellMap.style = cellStyleInfo
                style[row][col] = cellMap
            }
        }
        return style
    }

    setTableStyleValue(table, domiBlocks) {
        let tableStyleValue = JSON.parse(JSON.stringify(table))
        for (let i = 0; i < domiBlocks.length; i++) {
            const domiBlock = domiBlocks[i]
            const direction = this.checkDirection(domiBlock)
            const color = this.getColorByBlock(this.normalizeBlock(domiBlock))
            for (let j = 0; j < domiBlock.length; j++) {
                let v = domiBlock[j]
                let styleValue = 0
                styleValue += direction[j]
                styleValue += color
                try {
                    tableStyleValue[v[0]][v[1]] = styleValue
                } catch (error) {
                    // console.log('styleValue = ',styleValue)
                    // console.log('tableStyleValue = ', tableStyleValue )
                    // console.log('setting value idx= ',v[0],', ',v[1])
                    // console.log('error= ',error)

                }
            }
        }
        return tableStyleValue
    }

    getTableStyle(table) {
        let style = Array.from(Array(table.length), () => Array(table[0].length).fill({}))

        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[0].length; j++) {
                let cellMap = {}
                let cellStyleInfo = {}
                if (table[i][j] === this.closeTableValue) {
                    cellStyleInfo.background = ''
                    cellMap.style = cellStyleInfo
                } else if (table[i][j] === this.blankTableValue) {
                    cellStyleInfo.background = this.selectedTableColor
                    cellMap.style = cellStyleInfo
                } else {
                    let directionList = this.getConnectedDirection(table[i][j])
                    directionList.none.forEach((v) => {
                        cellStyleInfo[v] = 'none'
                    })
                    // todo : 바라보는 방향에 다른 블럭이 존재하면 1px 존재하지 않으면 3px로 설정하도록 수정해야함
                    directionList.exist.forEach((v) => {
                        // cellStyleInfo[v] = '3px solid'
                    })
                    cellStyleInfo['background'] = this.blockTypeColor[this.getOnlyColorIdx(table[i][j])]
                    cellMap.style = cellStyleInfo
                    cellMap.className = 'block'
                }
                style[i][j] = cellMap
                // style[i][j] = cellStyleMap
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
        let result = { none: [], exist: [] }
        let directionBit = value % 100
        Object.keys(this.blockDirection).forEach((v) => {
            v = Number(v)
            // console.log('type a = ',typeof(a), ",  b = ",typeof(b))
            if ((directionBit & v) === v) {
                result.none.push(this.blockDirection[v])
            } else {
                result.exist.push(this.blockDirection[v])
            }
        })
        return result
    }

    /**
     * 유니온에 존재하는 모든 블록 종류에 대한 정보 init
     */
    initAllBlockType() {
        for (let k = 0; k < this.baseBlockType.length; k++) {
            const rotates = this.rotate(this.baseBlockType[k])
            this.allBlockType[k] = rotates
        }
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
     * 색상은 baseBlockType 인덱스 기준으로 100~1600 까지 백단위로 지정.

     * @param {*} block 
     * @returns table에 들어갈 색상 값
     */
    getColorByBlock(block) {
        let len = block.length;

        let startArrIdx = this.baseBlockSizeIdx[len][0]
        let endArrIdx = this.baseBlockSizeIdx[len][1]
        for (let i = startArrIdx; i < endArrIdx + 1; i++) {
            let blockType = this.allBlockType[i]
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

export default BlockManager;