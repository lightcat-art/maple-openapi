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

// 유니온 등급
import n1 from '../static/img/union/novice-union-1.png'
import n2 from '../static/img/union/novice-union-2.png'
import n3 from '../static/img/union/novice-union-3.png'
import n4 from '../static/img/union/novice-union-4.png'
import n5 from '../static/img/union/novice-union-5.png'
import v1 from '../static/img/union/veteran-union-1.png'
import v2 from '../static/img/union/veteran-union-2.png'
import v3 from '../static/img/union/veteran-union-3.png'
import v4 from '../static/img/union/veteran-union-4.png'
import v5 from '../static/img/union/veteran-union-5.png'
import m1 from '../static/img/union/master-union-1.png'
import m2 from '../static/img/union/master-union-2.png'
import m3 from '../static/img/union/master-union-3.png'
import m4 from '../static/img/union/master-union-4.png'
import m5 from '../static/img/union/master-union-5.png'
import gm1 from '../static/img/union/grand-master-union-1.png'
import gm2 from '../static/img/union/grand-master-union-2.png'
import gm3 from '../static/img/union/grand-master-union-3.png'
import gm4 from '../static/img/union/grand-master-union-4.png'
import gm5 from '../static/img/union/grand-master-union-5.png'
import s1 from '../static/img/union/supreme-union-1.png'
import s2 from '../static/img/union/supreme-union-2.png'
import s3 from '../static/img/union/supreme-union-3.png'
import s4 from '../static/img/union/supreme-union-4.png'
import s5 from '../static/img/union/supreme-union-5.png'

export const WorldImage = ({ server, className }) => {
    return (
            server === '오로라' ?
            <img className={className ? className : ''} src={orora} alt={server}></img> :
            server === '레드' ?
            <img className={className ? className : ''} src={red} alt={server}></img> :
            server === '이노시스' ?
            <img className={className ? className : ''} src={inosis} alt={server}></img> :
            server === '유니온' ?
            <img className={className ? className : ''} src={union} alt={server}></img> :
            server === '스카니아' ?
            <img className={className ? className : ''} src={skania} alt={server}></img> :
            server === '루나' ?
            <img className={className ? className : ''} src={lunar} alt={server}></img> :
            server === '제니스' ?
            <img className={className ? className : ''} src={zenis} alt={server}></img> :
            server === '크로아' ?
            <img className={className ? className : ''} src={croa} alt={server}></img> :
            server === '베라' ?
            <img className={className ? className : ''} src={vera} alt={server}></img> :
            server === '엘리시움' ?
            <img className={className ? className : ''} src={ellisium} alt={server}></img> :
            server === '아케인' ?
            <img className={className ? className : ''} src={arcane} alt={server}></img> :
            server === '노바' ?
            <img className={className ? className : ''} src={nova} alt={server}></img> :
            server === '버닝' ?
            <img className={className ? className : ''} src={burning} alt={server}></img> :
            server === '버닝2' ?
            <img className={className ? className : ''} src={burning2} alt={server}></img> :
            server === '버닝3' ?
            <img className={className ? className : ''} src={burning3} alt={server}></img> :
            server === '리부트' ?
            <img className={className ? className : ''} src={reboot} alt={server}></img> :
            server === '리부트2' ?
            <img className={className ? className : ''} src={reboot2} alt={server}></img> :
            <></>
    )
}

export const UnionGradeImage = ({ grade, className }) => {
    return (
    grade === '슈프림 유니온 1' ?
    <img className={className ? className : ''} src={s1} alt={grade}></img> :
    grade === '슈프림 유니온 2' ?
    <img className={className ? className : ''} src={s2} alt={grade}></img> :
    grade === '슈프림 유니온 3' ?
    <img className={className ? className : ''} src={s3} alt={grade}></img> :
    grade === '슈프림 유니온 4' ?
    <img className={className ? className : ''} src={s4} alt={grade}></img> :
    grade === '슈프림 유니온 5' ?
    <img className={className ? className : ''} src={s5} alt={grade}></img> :    
    grade === '그랜드 마스터 유니온 1' ?
    <img className={className ? className : ''} src={gm1} alt={grade}></img> :
    grade === '그랜드 마스터 유니온 2' ?
    <img className={className ? className : ''} src={gm2} alt={grade}></img> :
    grade === '그랜드 마스터 유니온 3' ?
    <img className={className ? className : ''} src={gm3} alt={grade}></img> :
    grade === '그랜드 마스터 유니온 4' ?
    <img className={className ? className : ''} src={gm4} alt={grade}></img> :
    grade === '그랜드 마스터 유니온 5' ?
    <img className={className ? className : ''} src={gm5} alt={grade}></img> :
    grade === '마스터 유니온 1' ?
    <img className={className ? className : ''} src={m1} alt={grade}></img> :
    grade === '마스터 유니온 2' ?
    <img className={className ? className : ''} src={m2} alt={grade}></img> :
    grade === '마스터 유니온 3' ?
    <img className={className ? className : ''} src={m3} alt={grade}></img> :
    grade === '마스터 유니온 4' ?
    <img className={className ? className : ''} src={m4} alt={grade}></img> :
    grade === '마스터 유니온 5' ?
    <img className={className ? className : ''} src={m5} alt={grade}></img> :
    grade === '베테랑 유니온 1' ?
    <img className={className ? className : ''} src={v1} alt={grade}></img> :
    grade === '베테랑 유니온 2' ?
    <img className={className ? className : ''} src={v2} alt={grade}></img> :
    grade === '베테랑 유니온 3' ?
    <img className={className ? className : ''} src={v3} alt={grade}></img> :
    grade === '베테랑 유니온 4' ?
    <img className={className ? className : ''} src={v4} alt={grade}></img> :
    grade === '베테랑 유니온 5' ?
    <img className={className ? className : ''} src={v5} alt={grade}></img> :
    grade === '노비스 유니온 1' ?
    <img className={className ? className : ''} src={n1} alt={grade}></img> :
    grade === '노비스 유니온 2' ?
    <img className={className ? className : ''} src={n2} alt={grade}></img> :
    grade === '노비스 유니온 3' ?
    <img className={className ? className : ''} src={n3} alt={grade}></img> :
    grade === '노비스 유니온 4' ?
    <img className={className ? className : ''} src={n4} alt={grade}></img> :
    grade === '노비스 유니온 5' ?
    <img className={className ? className : ''} src={n5} alt={grade}></img> :
    <></>
    )
}