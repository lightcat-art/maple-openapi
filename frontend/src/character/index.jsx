
import { Outlet } from 'react-router-dom'
import { Menu } from '../common'
import './index.css'
import searchLogo from '../static/img/wallpaper/arcana/arcanadesktop_1.jpg';

export const CharacterLayout = ({ children }) => {
    return (
        <>
            <Menu item='not-home'></Menu>
            <CharacterBasic></CharacterBasic>
            <Outlet />
            <div>footer</div>
        </>
    )
}

export const CharacterBasic = () => {
    return (
        <>
            <div className="char-basic container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-2"></div>
                    <div className="col-md-auto">
                        <div class="card" style={{ width: '18rem' }}>
                            <img class="card-img-top" src={searchLogo} alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>

                        <div class="card flex-row flex-wrap">
                            <div class="card-header border-0">
                                <img src="//placehold.it/200" alt="" />
                            </div>
                            <div class="card-block px-2">
                                <h4 class="card-title">Title</h4>
                                <p class="card-text">Description</p>
                                <a href="#" class="btn btn-primary">BUTTON</a>
                            </div>
                            <div class="w-100"></div>
                            <div class="card-footer w-100 text-muted">
                                FOOTER
                            </div>
                        </div>


                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </>
    )
}