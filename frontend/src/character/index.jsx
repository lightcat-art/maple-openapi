import { Menu } from '../common'
import './index.css'
import arcana from '../static/img/wallpaper/arcana/arcanadesktop_1.jpg';
import * as React from 'react'
import { Button, ContentButton } from '../common/button'
import expandMoreIcon from '../static/icons/expand_more_FILL0_wght400_GRAD0_opsz20.png'
import expandLessIcon from '../static/icons/expand_less_FILL0_wght400_GRAD0_opsz20.png'
import { useParams, Link, Outlet } from 'react-router-dom'

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
                        <ul className="nav nav-tabs char-tab">
                            {page === 'union' ?
                                <>
                                    <Link to={`/c/${cname}/union`} className="nav-item nav-link active">유니온</Link>
                                    <Link to={`/c/${cname}/equip`} className="nav-item nav-link">장비</Link>
                                </> :
                                page === 'equip' ?
                                    <>
                                        <Link to={`/c/${cname}/union`} className="nav-item nav-link">유니온</Link>
                                        <Link to={`/c/${cname}/equip`} className="nav-item nav-link active">장비</Link>
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
    const [isDetailView, setIsDetailView] = React.useState(false)

    const handleDetailView = () => {
        setIsDetailView(!isDetailView)
    }


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

                                <div class="char-card card flex-row flex-wrap">
                                    <div class="card-block px-5">
                                        <h4 class="card-title">Title</h4>
                                        <p class="card-text">Description</p>
                                        <a href="#" class="btn btn-primary">BUTTON</a>
                                    </div>
                                    <div class="card-header border-0">
                                        <img src="//placehold.it/100" alt="" />
                                    </div>
                                    <div class="card-block px-5">
                                        <h4 class="card-title">Title</h4>
                                        <p class="card-text">Description</p>
                                        <a href="#" class="btn btn-primary">BUTTON</a>
                                    </div>
                                    {/* <div class="w-100"></div> */}
                                    <div class="card-footer w-100 text-muted">
                                        FOOTER
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div class="card" style={{ width: '18rem', mineight: '2px' }}>
                                    dfdf
                                </div>
                            </>
                        }
                        <div className="char-fold-btn-wrapper text-center">
                            <ContentButton className="char-fold-btn ps-3" action={handleDetailView}
                                title={isDetailView ? '기본정보 접기' : '기본정보 펼치기'}
                                imgsrc={isDetailView ?
                                    <img className="char-fold-btn-img ps-2" src={expandLessIcon} alt=""></img> :
                                    <img className="char-fold-btn-img ps-2" src={expandMoreIcon} alt=""></img>}>
                            </ContentButton>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
            {/* <CharMenu page='union'></CharMenu> */}
        </>
    )
}