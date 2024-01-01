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

    scan() {
        // 모든 블록에 대해 for문을 돌리고 그 내부에 재귀함수 삽입.

    }








}