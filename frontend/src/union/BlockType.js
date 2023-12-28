class BlockType {
    // React component에서 선언하는 경우 다시 새로고침하면 인스턴스 날아감.
    // 색 구분할수있는 기반 마련.
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
        this.defaultBlockTypeColor = [
            // '#00ff0000'
            '#ffffff'
        ]
        this.blockTypeColor = [
            '#030000',
            '#5f3535',
            '#805858',
            '#6b1111',
            '#8f2ca8',
            '#af4545',
            '#eee000',
            '#7e1c3bf1',
            '#babcd4',
            '#004c8a',
            '#f7c7c7',
            '#fca7a7',
            '#2ec948',
            '#3dccb9',
            '#29a9c9'
        ]
        this.baseBlockSizeIdx = { 5: [0, 5], 4: [6, 10], 3: [11, 12], 2: [13, 13], 1: [14, 14] }
        this.blockDirection = { 1: 'borderTop', 2: 'borderLeft', 4: 'borderRight', 8: 'borderBottom' }
        // [i][j] => i: 블록타입 종류,  j: 블록의 회전에 따른 종류
        this.allBlockType = new Array(this.baseBlockType.length)
        this.getAllBlockType();
        BlockType.instance = this;
    }

    getDefaultTableStyle(table) {
        let style = Array.from(Array(table.length), () => Array(table[0].length).fill({}))

        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[0].length; j++) {
                let cellStyleMap = {}
                cellStyleMap.direction = []
                cellStyleMap['background'] = this.defaultBlockTypeColor
                style[i][j] = cellStyleMap
            }
        }
        return style
    }

    getTableStyle(table) {
        let style = Array.from(Array(table.length), () => Array(table[0].length).fill({}))

        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[0].length; j++) {
                let cellStyleMap = {}
                if (table[i][j] === -1 || table[i][j] === 0) {
                    cellStyleMap.background = this.defaultBlockTypeColor
                } else{
                    let directionList = this.getDirection(table[i][j])
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
     * 블록이 연결되있는 지점을 이진수로 반환
     * @param {*} block : 한 block 좌표 리스트 반환
     */
    checkDirection(block) {

        // 상 좌 우 하
        const dx = [-1, 0, 0, 1]
        const dy = [0, -1, 1, 0]
        const direction = [1, 2, 4, 8]
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
    getDirection(value) {
        let result = []
        let directionBit = value % 100
        Object.keys(this.blockDirection).forEach((v) => {
            v = Number(v)
            let a = directionBit & v
            let b = v

            // console.log('type a = ',typeof(a), ",  b = ",typeof(b))
            if ((directionBit & v) === v) {
                result.push(this.blockDirection[v])
            }
        })
        return result
    }

    getAllBlockType() {
        for (let k = 0; k < this.baseBlockType.length; k++) {
            this.allBlockType[k] = []
            const baseBlockElement = this.baseBlockType[k]
            // 회전 및 뒤집기를 통해 8번 rotation을 하여 모든 타입의 블록 json으로 반환.
            let max = Math.max(...baseBlockElement.map(v => Math.max(v[0], v[1])))
            let rotateBlock = JSON.parse(JSON.stringify(baseBlockElement));
            for (let i = 0; i < 4; i++) {
                if (i > 0) {
                    rotateBlock = rotateBlock.map(v => [max - v[1], v[0]]) // 90도 회전
                }
                let normalRotate = this.normalizeBlock(rotateBlock)
                let existElement = false;
                this.allBlockType[k].forEach(v => {
                    if (JSON.stringify(normalRotate) === JSON.stringify(v)) {
                        existElement = true
                    }
                })
                if (!existElement) {
                    this.allBlockType[k].push(normalRotate)
                }
            }
            // 뒤집어서 다시 4번 회전.
            let transBlock = baseBlockElement.map(v => [v[1], v[0]])
            for (let i = 0; i < 4; i++) {
                if (i > 0) {
                    transBlock = transBlock.map(v => [max - v[1], v[0]]) // 90도 회전
                }
                let transNormalRotate = this.normalizeBlock(transBlock)
                let existElement = false;
                this.allBlockType[k].forEach(v => {
                    if (JSON.stringify(transNormalRotate) === JSON.stringify(v)) {
                        existElement = true
                    }
                })
                if (!existElement) {
                    this.allBlockType[k].push(transNormalRotate)
                }
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

    normalizeBlock(block) {
        let minX = Math.min(...block.map(v => v[0]))
        let minY = Math.min(...block.map(v => v[1]))

        return block.map(v => [v[0] - minX, v[1] - minY]).sort()
    }
}

export default BlockType;