export default class BlockType {
    static instance;
    constructor() {
        if (BlockType.instance) return BlockType.instance;
        this.baseBlockType = [
            [[0,0],[0,1],[1,1],[1,2],[1,3]], // z-asym
            [[0,0],[0,1],[1,1],[2,1],[2,2]], // z-sym
            [[0,1],[1,0],[1,1],[1,2],[2,1]], // +
            [[0,0],[1,0],[1,1],[1,2],[2,0]], // T
            [[0,0],[0,1],[0,2],[0,3],[0,4]], // I
            [[0,0],[0,1],[0,2],[1,1],[1,2]], // thumb
            [[0,0],[0,1],[1,1],[1,2]], // z
            [[0,0],[1,0],[1,1],[2,0]], // T
            [[0,0],[0,1],[0,2],[1,2]], // L
            [[0,0],[0,1],[0,2],[0,3]], // I
            [[0,0],[0,1],[1,0],[1,1]], // square
            [[0,0],[0,1],[0,2]], // I
            [[0,0],[0,1],[1,0]], // L
            [[0,0],[0,1]], // I
            [[0,0]], // dot
        ]
        this.sortedAllBlockType = {
            1: [], 
            2: [], 
            3: [], 
            4: [], 
            5: [] }
        BlockType.instance = this;
    }

    getInstance() {
        return this;
    }

    getAllBlockType() {
        block
    }

    rotate() {

    }


}