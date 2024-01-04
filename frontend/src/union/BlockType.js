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
            '#330707',
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

    /**
     * map형태 ex) [{x: 24, y: 25}, ...] 로 되어있는 유니온 초기 오브젝트를 normalize
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

export default BlockType;