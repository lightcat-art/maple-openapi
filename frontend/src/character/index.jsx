import { Menu } from '../common'
import './index.css'
import arcana from '../static/img/wallpaper/arcana/arcanadesktop_1.jpg';
import * as React from 'react'
import { Button, AfterImageButton, AfterImageLink } from '../common/clickable'
import expandMoreIcon from '../static/icons/expand_more_FILL0_wght400_GRAD0_opsz20.png'
import expandLessIcon from '../static/icons/expand_less_FILL0_wght400_GRAD0_opsz20.png'
import { useParams, Link, Outlet } from 'react-router-dom'
import axios from 'axios';

export const CharacterLayout = () => {
    const { cname } = useParams();
    console.log('CharacterLayout cname=', cname)
    return (
        <>
            <Menu page='not-home'></Menu>
            <CharacterBasic></CharacterBasic>
            <Outlet />
            <div>footer</div>
        </>
    )
}

export const CharMenu = ({ page }) => {
    const { cname } = useParams();
    console.log('CharMenu cname=', cname)
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-2"></div>
                    <div className="col-auto">
                        <ul className="nav char-tab">
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
                    </div>
                    <div className="col col-2"></div>
                </div>
            </div>
        </>
    );
}

export const CharacterBasic = () => {
    const { cname } = useParams();
    console.log('CharacterBasic cname=', cname)
    const param = { nickname: cname }
    const [isDetailView, setIsDetailView] = React.useState(false)
    const [charInfo, setCharInfo] = React.useState(null)

    const handleDetailView = () => {
        setIsDetailView(!isDetailView)
    }
    React.useEffect(() => {
        axios.get('/api/char/overall', { params: param })
          .then(response => {
            console.log(response.data)
            setCharInfo(response.data)
          })
          .catch(error => console.log(error))
    
      }, []);

    return (
        <>
            <div className="char-basic container-fluid">
                <div className="row justify-content-center">
                    <div className="col-2"></div>
                    <div className="col-auto">
                        {/* 캐릭터 정보 표시 */}
                        {isDetailView ?
                            <>
                                {/* <div class="card" style={{ width: '18rem' }}>
                                    <img class="card-img-top" src={arcana} alt="Card image cap" />
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div> */}

                                <div className="char-card card flex-row flex-wrap">
                                    <div className="card-header border-0">
                                        <img src={charInfo.basicResponse.characterImage} alt="" />
                                    </div>
                                    <div className="card-block px-5">
                                        <h4 style={{fontSize: '30px'}} className="card-title">{charInfo.basicResponse.characterName}</h4>
                                        <p className="card-text">{charInfo.basicResponse.characterLevel} Lv. &nbsp;{charInfo.basicResponse.characterClass}</p>
                                        {/* <a href="#" className="btn btn-primary">BUTTON</a> */}
                                    </div>
                                    {/* <div class="w-100"></div> */}
                                    <div className="card-footer w-100 text-muted">
                                        FOOTER
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="card" style={{ width: '18rem', mineight: '2px' }}>
                                    dfdf
                                </div>
                            </>
                        }
                        <div className="char-fold-btn-wrapper text-center">
                            <AfterImageButton className="char-fold-btn ps-3" action={handleDetailView}
                                title={isDetailView ? '기본정보 접기' : '기본정보 펼치기'}
                                imgsrc={isDetailView ?
                                    <img className="char-fold-btn-img ps-2" src={expandLessIcon} alt=""></img> :
                                    <img className="char-fold-btn-img ps-2" src={expandMoreIcon} alt=""></img>}>
                            </AfterImageButton>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
            {/* <CharMenu page='union'></CharMenu> */}
        </>
    )
}