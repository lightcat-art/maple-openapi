// onmessage = function (event) {
//   console.log('Received message from main thread : ', event.data)
//   console.log('union worker thread execute')
//   this.postMessage(true)
// }
import * as React from 'react'

var UnionRaiderSetting2 = ''
if ('function' === typeof importScripts) {
  UnionRaiderSetting2 = self.importScripts('UnionRaiderSetting2.js') // eslint-disable-line no-restricted-globals
}
// if (navigator.serviceWorker) {
//   navigator.serviceWorker.register('src/union/UnionWorker.js', { scope: 'src/union' })
//     .then(function(reg) {
//       console.log('[Companion]', 'Service worker registered!');
//     });
// }
export default () => {
  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
    if (!e) return;
    let cnt = e.data.cnt;
    console.log('Received message from main thread : ', e.data)
    console.log('Received union block : ', e.data.unionBlock)
    console.log('Received table : ', e.data.table)
    console.log('Received cnt : ', e.data.cnt)
    console.log('UnionRaiderSetting2 : ',UnionRaiderSetting2 ) 
    // console.log('Received unionRaider : ', JSON.parse(e.data.setting)
    console.log('union worker thread execute')

    // console.log('setting = ',setting)
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

    // const setting = new UnionRaiderSetting2(e.data.unionBlock, JSON.parse(JSON.stringify(e.data.table)))
    // setting.parseRaider()
    // console.log('parse blocks Size= ', setting.blocksSize)
    // console.log('parse blocks= ', setting.blocks)
    // console.log('parse blocks binary = ', setting.blocksBinary)
    // console.log('parse count = ', setting.blocksCount)
    // setting.classify()
    // console.log('result count = ', setting.resultBlocksCount)
    // console.log('result table= ', setting.resultTable)
    // console.log('result domiBlocks=', setting.resultDomiBlocks)



    console.log('worker end')

  })

}


