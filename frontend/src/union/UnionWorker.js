// onmessage = function (event) {
//   console.log('Received message from main thread : ', event.data)
//   console.log('union worker thread execute')
//   this.postMessage(true)
// }
import UnionRaiderSetting2 from './UnionRaiderSetting2';

export default () => {
  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
    if (!e) return;
    let cnt = e.data.cnt;

    console.log('Received message from main thread : ', e.data)
    console.log('Received union block : ', e.data.unionBlock)
    console.log('Received table : ', e.data.table)
    console.log('Received cnt : ', e.data.cnt)
    console.log('union worker thread execute')


    while (true) {
      // postMessage(cnt++);
      cnt++
      if (cnt % 98924 === 0) {
        postMessage(cnt)
      }
      if (cnt >= 100000000) {
        break
      }
    }
    postMessage(cnt++);

    const setting = new UnionRaiderSetting2(e.data.unionBlock, JSON.parse(JSON.stringify(e.data.table)))
    setting.parseRaider()
    console.log('parse blocks Size= ', setting.blocksSize)
    console.log('parse blocks= ', setting.blocks)
    console.log('parse blocks binary = ', setting.blocksBinary)
    console.log('parse count = ', setting.blocksCount)
    setting.classify()
    console.log('result count = ', setting.resultBlocksCount)
    console.log('result table= ', setting.resultTable)
    console.log('result domiBlocks=', setting.resultDomiBlocks)


    console.log('worker end')

  })
}