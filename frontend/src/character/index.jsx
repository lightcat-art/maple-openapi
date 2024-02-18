import { Menu } from '../common'
import './index.css'
import * as React from 'react'
import { AfterImageButton, AfterImageLink } from '../common/clickable'
import expandMoreIcon from '../static/icons/expand_more_FILL0_wght400_GRAD0_opsz20.png'
import expandLessIcon from '../static/icons/expand_less_FILL0_wght400_GRAD0_opsz20.png'
import { useParams, Outlet } from 'react-router-dom'
import axios from 'axios';
import { Loading } from '../common';
import { WorldImage } from '../common/image.jsx'


export const CharacterLayout = () => {
    const [charInfo, setCharInfo] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const { cname } = useParams();
    const param = { nickname: cname }
    // getCharInfo(param, setCharInfo)
    React.useEffect(() => {
        axios.get('/api/char/overall', { params: param })
            .then(response => {
                setCharInfo(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error));
    }, [])


    const test = 1;
    return (
        <>
            <Menu page='not-home'></Menu>
            <CharacterBasic charInfo={charInfo} loading={loading}></CharacterBasic>
            <Outlet context={[charInfo, loading]} />
            <div>footer</div>
        </>
    )
}

export const CharMenu = ({ page }) => {
    const { cname } = useParams();
    return (
        <>
            <div className="char-main">
                <div className="char-main-inner">
                    {/* <div className="col col-2"></div>
                    <div className="col col-auto"> */}
                    <ul className="nav">
                        {page === 'union' ?
                            <>
                                <AfterImageLink to={`/c/${cname}/union`} className="nav-item nav-link active" title="유니온"></AfterImageLink>
                                <AfterImageLink to={`/c/${cname}/equip`} className="nav-item nav-link" title="능력치 · 장비"></AfterImageLink>
                            </> :
                            page === 'equip' ?
                                <>
                                    <AfterImageLink to={`/c/${cname}/union`} className="nav-item nav-link" title="유니온"></AfterImageLink>
                                    <AfterImageLink to={`/c/${cname}/equip`} className="nav-item nav-link active" title="능력치 · 장비"></AfterImageLink>
                                </>
                                :
                                <>
                                </>
                        }
                    </ul>
                    {/* </div> */}
                </div>
            </div>
        </>
    );
}

export const CharacterBasic = ({ charInfo, loading }) => {
    const [isDetailView, setIsDetailView] = React.useState(true)

    const handleDetailView = () => {
        setIsDetailView(!isDetailView)
    }

    return (
        <div>
            <div className="char-main">
                <div className="char-main-inner">
                    <div className="char-basic container-fluid">

                        {/* 캐릭터 정보 표시 */}
                        {loading ?
                            <Loading></Loading>
                            : !charInfo ?
                                <div className="row justify-content-center">검색 결과가 없습니다.</div> :
                                isDetailView ?
                                    <div className="row">
                                        <div className="col-auto">
                                            <img src={charInfo.basicResponse.characterImage} alt="" />
                                        </div>
                                        <div className="col-auto">
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <span className="char-name">{charInfo.basicResponse.characterName}</span>
                                                        <span className="char-class">&nbsp;&nbsp;&nbsp;{charInfo.basicResponse.characterClass}</span>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-auto'>
                                                        <WorldImage server={charInfo.basicResponse.worldName}></WorldImage> {charInfo.basicResponse.worldName}
                                                    </div>
                                                    <div className='col-auto'>
                                                        {charInfo.basicResponse.characterLevel}Lv
                                                    </div>
                                                    <div className='col-auto'>
                                                        {charInfo.basicResponse.characterGuildName}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    :
                                    <>
                                        <span>dfdfs</span>
                                    </>
                        }
                    </div>
                    <div className="char-fold-btn-wrapper text-center">
                        <AfterImageButton className="char-fold-btn ps-3" action={handleDetailView}
                            title={isDetailView ? '기본정보 접기' : '기본정보 펼치기'}
                            imgsrc={isDetailView ?
                                <img className="char-fold-btn-img ps-2" src={expandLessIcon} alt=""></img> :
                                <img className="char-fold-btn-img ps-2" src={expandMoreIcon} alt=""></img>}>
                        </AfterImageButton>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
            {/* <CharMenu page='union'></CharMenu> */}
        </div >
    )
}