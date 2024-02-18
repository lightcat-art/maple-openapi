import orora from '../static/img/server/orora.png'
import red from '../static/img/server/red.png'
import inosis from '../static/img/server/inosis.png'
import union from '../static/img/server/union.png'
import skania from '../static/img/server/skania.png'
import lunar from '../static/img/server/lunar.png'
import zenis from '../static/img/server/zenis.png'
import croa from '../static/img/server/croa.png'
import vera from '../static/img/server/vera.png'
import ellisium from '../static/img/server/ellisium.png'
import arcane from '../static/img/server/arcane.png'
import nova from '../static/img/server/nova.png'
import burning from '../static/img/server/burning.png'
import burning2 from '../static/img/server/burning2.png'
import burning3 from '../static/img/server/burning3.png'
import reboot from '../static/img/server/reboot.png'
import reboot2 from '../static/img/server/reboot2.png' 

export const WorldImage = ({server}) => {
    return (
            server === '오로라' ?
            <img src={orora} alt={server}></img> :
            server === '레드' ?
            <img src={red} alt={server}></img> :
            server === '이노시스' ?
            <img src={inosis} alt={server}></img> :
            server === '유니온' ?
            <img src={union} alt={server}></img> :
            server === '스카니아' ?
            <img src={skania} alt={server}></img> :
            server === '루나' ?
            <img src={lunar} alt={server}></img> :
            server === '제니스' ?
            <img src={zenis} alt={server}></img> :
            server === '크로아' ?
            <img src={croa} alt={server}></img> :
            server === '베라' ?
            <img src={vera} alt={server}></img> :
            server === '엘리시움' ?
            <img src={ellisium} alt={server}></img> :
            server === '아케인' ?
            <img src={arcane} alt={server}></img> :
            server === '노바' ?
            <img src={nova} alt={server}></img> :
            server === '버닝' ?
            <img src={burning} alt={server}></img> :
            server === '버닝2' ?
            <img src={burning2} alt={server}></img> :
            server === '버닝3' ?
            <img src={burning3} alt={server}></img> :
            server === '리부트' ?
            <img src={reboot} alt={server}></img> :
            server === '리부트2' ?
            <img src={reboot2} alt={server}></img> :
            <></>
    )
}