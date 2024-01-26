class Test {
    testMapDifferentOrderCompare() {
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

    testListSorting() {
        // const a = [[[1,2], [3,4],[5,6]], [[1,2], [3,4],[5,6], [7,8]]]
        // a.sort()
        // console.log('testListSorting=',a.sort())
        // const b = [[[1,2], [3,4],[5,6], [7,8]], [[1,2], [3,4],[5,6]]]
        // console.log('testListSorting=',b.sort())
        // const c = [[[1,1],[1,1],[1,1],[1,1]], [[1,1],[1,1],[1,1]]]
        // console.log('testListSorting=',c.sort())
        // const d = [[[1,1],[1,1],[1,1]],[[1,1],[1,1],[1,1],[1,1]]]
        // console.log('testListSorting=',d.sort())

        const a = [[[6, 6], [6, 6], [6, 6], [6, 6]], [[6, 6], [1, 1], [1, 1]]]
        console.log('testListSorting=', a.sort())
        const d = [[[1, 1], [1, 1], [1, 1], [1, 1]], [[9, 9], [9, 9], [9, 9]],]
        console.log('testListSorting=', d.sort())
    }

    testListSorting2() {
        let sortable = [[4,6],[1,6],[2,5],[3,5],[5,4]] // 2번째 원소를 기준으로 sorting
        
        sortable.sort(function(a,b) {
          return a[1] - b[1];
        })
        console.log(sortable)
    }

    testMapSorting() {
        const map1 = { 4: 1, 6: 2, 1:3, 2:4} // 키 자동 오름차순 정렬됨.
        console.log(map1)
        console.log(Object.keys(map1))
        Object.keys(map1).forEach((v) => {
            console.log(v)
        })
        // map1.sort()
        // console.log(map1)
    }
}