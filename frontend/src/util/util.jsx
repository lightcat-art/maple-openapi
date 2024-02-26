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
export const getCSSProp = (element, propName) => getComputedStyle(element).getPropertyValue(propName)

// 다차원 배열 중복제거
export function removeDupND(arr) {
    return [...new Set(arr.join("|").split("|"))]
      .map((v) => v.split(","))
      .map((v) => v.map((a) => +a));
  }

export class ArrayUtil {
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
}
