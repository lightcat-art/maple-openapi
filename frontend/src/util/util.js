// Array의 prototype을 지정해주고, shuffle이라는 이름을 가진 함수를 생성
// 다차원배열이면 제일 앞에 존재하는 차원의 인덱스를 셔플
Array.prototype.shuffle = function () {
    var length = this.length;

    // 아래에서 length 후위 감소 연산자를 사용하면서 결국 0이된다.
    // 프로그래밍에서 0은 false를 의미하기에 0이되면 종료.
    while (length) {

        // 랜덤한 배열 index 추출
        var index = Math.floor((length--) * Math.random());

        // 배열의 끝에서부터 0번째 아이템을 순차적으로 대입
        var temp = this[length];

        // 랜덤한 위치의 값을 맨뒤(this[length])부터 셋팅
        this[length] = this[index];

        // 랜덤한 위치에 위에 설정한 temp값 셋팅
        this[index] = temp;
    }

    // 배열을 리턴해준다.
    return this;
};

export default class util {
    /** 2차원 배열 compare */
    compareObj2D(a, b) {
        let sameTF = true
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                if (a[i][j] !== b[i][j]) {
                    sameTF = false
                    break
                }
            }
            if (!sameTF) { break }
        }
        return sameTF
    }

    /** 3차원 배열 compare */
    compareObj3D(a, b) {
        let sameTF = true
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                for (let k = 0; k < a[i][j].length; k++) {
                    if (a[i][j][k] !== b[i][j][k]) {
                        sameTF = false
                        break
                    }
                }
                if (!sameTF) { break }
            }
            if (!sameTF) { break }
        }
        return sameTF
    }

    /** 2차원 배열 copy */
    copyObj2D(arr) {
        let copy = [];
        for (let i = 0; i < arr.length; i++) {
            copy.push(arr[i].slice());
        }
        return copy;
    }

    /** 3차원 배열 copy */
    copyObj3D(arr) {
        let copy = [];
        for (let i = 0; i < arr.length; i++) {
            let copyCol = []
            for (let j = 0; j < arr[i].length; j++) {
                copyCol.push(arr[i][j].slice());
            }
            copy.push(copyCol)
        }
        return copy;
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
        console.log('map key list = ', map1KeyList)  // Array(0)
    }

    testDeepCopy() {
        // let a = new Array(10000).fill(0)

        // console.time('slice')
        // let b = a.slice()
        // console.timeEnd('slice')
        // b[0] = 1
        // console.log('a = ',a)

        // let c = new Array(10000).fill(0)

        // console.time('json')
        // let d = JSON.parse(JSON.stringify(c))
        // console.timeEnd('json')
        // d[0] = 1
        // console.log('c = ',c)

        let a = Array.from(Array(4), () => Array(2).fill(0))
        // let a = Array.from(Array(10), () => Array(4).fill([0,0]))
        console.log('a = ', a)
        console.time('slice')
        let b = this.copyObj2D(a)
        console.timeEnd('slice')
        // b[0][0][0] = 1
        b[0][0] = 1
        console.log('a = ', a)
        console.log('b = ', b)


        console.time('json')
        let c = JSON.parse(JSON.stringify(a))
        console.timeEnd('json')
        // console.log('a = ',a)


        let sameTF = false
        console.time('json-compare')
        sameTF = (JSON.stringify(a) === JSON.stringify(b))
        console.timeEnd('json-compare')
        console.log(sameTF)

        console.time('for compare')
        sameTF = this.compareObj2D(a, b)
        console.timeEnd('for compare')
        console.log(sameTF)

    }
}
