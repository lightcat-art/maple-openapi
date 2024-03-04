import { Menu } from '../common'
import './index.css'
import * as React from 'react'
import { AfterImageButton, AfterImageLink } from '../common/clickable'
import expandMoreIcon from '../static/icons/expand_more_FILL0_wght400_GRAD0_opsz20.svg'
import expandLessIcon from '../static/icons/expand_less_FILL0_wght400_GRAD0_opsz20.svg'
import { useParams, Outlet } from 'react-router-dom'
import axios from 'axios';
import { ContentLayout } from '../common';
import { WorldImage } from '../common/image.jsx'

export const CharacterLayout = () => {
    const [charBasicInfo, setCharBasicInfo] = React.useState(null)
    const [charUnionInfo, setCharUnionInfo] = React.useState(null)

    const [loading, setLoading] = React.useState(true)
    const [unionLoading, setUnionLoading] = React.useState(true)
    const { cname } = useParams();
    const param = { nickname: cname }
    // getCharInfo(param, setCharInfo)
    React.useEffect(() => {
        axios.get('/api/char/banner', { params: param })
            .then(response => {
                setCharBasicInfo(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error));
    }, [])


    const test = 1;
    return (
        <>
            <Menu page='not-home'></Menu>
            <CharacterBasic charBasicInfo={charBasicInfo} loading={loading}></CharacterBasic>
            <Outlet context={[charUnionInfo, setCharUnionInfo, unionLoading, setUnionLoading]} />
            <div>footer</div>
        </>
    )
}

export const CharMenu = ({ page }) => {
    const { cname } = useParams();
    return (
        <>
            <ContentLayout>
                <ul className="nav char-menu">
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
            </ContentLayout>
        </>
    );
}

export const LoadingCharBasic = () => {
    return (
        <div className="row">
            <div className="col-auto char-img">
                <img className="placeholder" src="http://via.placeholder.com/96x96?text=" alt="" />
            </div>
            <div className="col-auto">
                <div className='container placeholder-glow char-ph'>
                    <div className='row'>
                        <span className='char-name-ph placeholder bg-secondary col-auto rounded-pill'>
                        </span>
                        <span className='char-class-ph placeholder bg-secondary col-auto rounded-pill'>
                        </span>
                    </div>
                    <div className='row'>
                        <div className='placeholder bg-secondary char-world-ph rounded-pill col-auto'>
                        </div>
                        <div className='placeholder bg-secondary char-level-ph rounded-pill col-auto'>
                        </div>
                        <div className='placeholder bg-secondary char-guild-ph rounded-pill col-auto'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const CharacterBasic = ({ charBasicInfo, loading }) => {
    const [isDetailView, setIsDetailView] = React.useState(true)

    const handleDetailView = () => {
        setIsDetailView(!isDetailView)
    }

    return (
        <ContentLayout>
            <div className="char-basic container-fluid">

                {/* 캐릭터 정보 표시 */}
                {loading ?
                    <LoadingCharBasic></LoadingCharBasic>
                    : !charBasicInfo ?
                        <div className="row justify-content-center">검색 결과가 없습니다.</div> :
                        isDetailView ?
                            <div className="row">
                                <div className="col-auto char-img">
                                    <img src={charBasicInfo.basicResponse.characterImage} alt="" />
                                </div>
                                <div className="col-auto">
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='col'>
                                                <span className="char-name">{charBasicInfo.basicResponse.characterName}</span>
                                                <span className="char-class">&nbsp;&nbsp;&nbsp;{charBasicInfo.basicResponse.characterClass}</span>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='char-world col-auto'>
                                                <WorldImage className='char-world-img' server={charBasicInfo.basicResponse.worldName}></WorldImage> {charBasicInfo.basicResponse.worldName}
                                            </div>
                                            <div className='char-level col-auto'>
                                                {charBasicInfo.basicResponse.characterLevel}Lv
                                            </div>
                                            <div className='char-guild col-auto'>
                                                {charBasicInfo.guildBasicResponse && charBasicInfo.guildBasicResponse.guildMarkCustom ? 
                                                <img className='char-guild-img' src={`data:image/jpeg;base64, ${charBasicInfo.guildBasicResponse.guildMarkCustom}`} /> : null} {charBasicInfo.basicResponse.characterGuildName}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            :
                            <>
                                <div className='row'>
                                    <div className='col-auto char-name-fold'>
                                        <span>{charBasicInfo.basicResponse.characterName}</span>
                                    </div>
                                    <div className='col-auto char-class-fold'>
                                        <span>&nbsp;&nbsp;&nbsp;{charBasicInfo.basicResponse.characterClass}</span>
                                    </div>
                                    <div className='col-auto char-world-fold'>
                                        <span>&nbsp;<WorldImage server={charBasicInfo.basicResponse.worldName}></WorldImage> {charBasicInfo.basicResponse.worldName}</span>
                                    </div>
                                    <div className='col-auto char-level-fold'>
                                        <span> {charBasicInfo.basicResponse.characterLevel}Lv</span>
                                    </div>
                                    <div className='col-auto char-guild-fold'>
                                        <span> {charBasicInfo.basicResponse.characterGuildName}</span>
                                    </div>
                                </div>
                            </>
                }
            </div>
            {/* <div className="char-fold-btn-wrapper justify-content-center">
                <AfterImageButton className="char-fold-btn ps-3" action={handleDetailView}
                    title={isDetailView ? '기본정보 접기' : '기본정보 펼치기'}
                    imgsrc={isDetailView ?
                        <img className="char-fold-btn-img ps-2" src={expandLessIcon} alt=""></img> :
                        <img className="char-fold-btn-img ps-2" src={expandMoreIcon} alt=""></img>}>
                </AfterImageButton>
            </div> */}
        </ContentLayout>
    )
}