// onmessage = function (event) {
//   console.log('Received message from main thread : ', event.data)
//   console.log('union worker thread execute')
//   this.postMessage(true)
// }

export default () => {
  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
    if (!e) return;
    let cnt = e.data;

    console.log('Received message from main thread : ', e.data)
    console.log('union worker thread execute')

    // if (type === "asc") {
    //   users = users.sort();
    // } else {
    //   users = users.reverse();
    // }

    while(true) {
      // postMessage(cnt++);
      cnt++
      if (cnt % 98924 === 0 ) {
        postMessage(cnt)
      }
      if (cnt >= 100000000){
        break
      }
    }
    postMessage(cnt++);
    console.log('worker end')

    // const setting = new UnionRaiderSetting2(param.nickname, response.data.userUnionRaiderResponse.unionBlock,
    //     JSON.parse(JSON.stringify(table)), setTable)
    //   setting.parseRaider()
    //   console.log('parse blocks Size= ', setting.blocksSize)
    //   console.log('parse blocks= ', setting.blocks)
    //   console.log('parse blocks binary = ', setting.blocksBinary)
    //   console.log('parse count = ', setting.blocksCount)
    //   setting.classify()
    //   console.log('result count = ', setting.resultBlocksCount)
    //   console.log('result table= ', setting.resultTable)
    //   console.log('result domiBlocks=', setting.resultDomiBlocks)
    //   setting.setTableStyleValue()
    //   setTableStyle(blockType.getTableStyle(setting.resultTableStyleValue))

  })
}