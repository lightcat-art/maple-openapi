class BlockType {
    // React component에서 선언하는 경우 다시 새로고침하면 인스턴스 날아감.
    // 현재 가지고 있는 블록 정보를 기반으로 화면에 표시할수 있도록 도와주는 클래스
    static instance;
    constructor(blockColor, selectedTableColor) {
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
        this.closeTableColor = '#ffffff'
        this.selectedTableColor = selectedTableColor

        this.blockTypeColor = blockColor
        this.baseBlockSizeIdx = { 5: [0, 5], 4: [6, 10], 3: [11, 12], 2: [13, 13], 1: [14, 14] }
        this.blockDirection = { 1: 'borderTop', 2: 'borderLeft', 4: 'borderRight', 8: 'borderBottom' }
        // [i][j] => i: 블록타입 종류,  j: 블록의 회전에 따른 종류
        this.allBlockType = new Array(this.baseBlockType.length)
        this.getAllBlockType();
        this.closeTableValue = 0 // 유니온 지도에서 채울수 없는 부분
        this.blankTableValue = 1 // 유니온 지도에서 채워질 부분 (비어있는 부분)
        BlockType.instance = this;
    }

    getDefaultTableStyle(table) {
        let style = Array.from(Array(table.length), () => Array(table[0].length).fill({}))

        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[0].length; j++) {
                let cellStyleMap = {}
                cellStyleMap.direction = []
                cellStyleMap['background'] = this.default
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

    getUserInfoStyle(table, domiBlocks) {
        const direction = Object.values(this.blockDirection)
        let style = Array.from(Array(table.length), () => Array(table[0].length).fill({}))
        for (let i = 0; i < domiBlocks.length; i++) {
            const domiBlock = domiBlocks[i]
            for (let j = 0; j < domiBlock.length; j++) {
                let cellMap = {}
                let cellStyleInfo = {}
                let v = domiBlock[j]
                cellStyleInfo['background'] = '#f5eed1'
                direction.forEach((direction) => {
                    // cellStyleInfo[direction] = 'none'
                })
                cellMap.style = cellStyleInfo
                cellMap.className = 'block'
                style[v[0]][v[1]] = cellMap
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
                        // cellStyleMap[v] = '1px solid'
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

export default BlockType;