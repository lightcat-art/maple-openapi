
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
                        {/* <div class="card" style={{ width: '18rem' }}>
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
                        </div> */}

                        <div className="card text">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="text-primary"> Name </div>
                                    </div>
                                    <div className="col-6">
                                    </div>
                                    <div className="col-3">
                                        <div className="float-right text-secondary"> Aug 21 2019 </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Average Rating (4.5) </h5>
                                <p className="card-text">Contrary to popular belief, Lorem Ipsum is not </p>
                            </div>
                            <div className="collapse" id="review">
                                <div className="card-body">
                                    <h5 className="card-title">More </h5>
                                    <p className="card-text">Contrary to popular belief, Lorem Ipsum is not </p>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">More </h5>
                                    <p className="card-text">Contrary to popular belief, Lorem Ipsum is not </p>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">More </h5>
                                    <p className="card-text">Contrary to popular belief, Lorem Ipsum is not </p>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">More </h5>
                                    <p className="card-text">Contrary to popular belief, Lorem Ipsum is not </p>
                                </div>
                            </div>
                            <div className="card-footer text-muted text-center">
                                <a href="#" className="btn" data-bs-toggle="collapse" data-bs-target="#review"
                                    role="button">
                                    <div className="row">
                                        <div> Click to see full review </div>
                                    </div>
                                    <span className="oi oi-caret-bottom"></span>
                                </a>
                                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#review" aria-expanded="false" aria-controls="review">Toggle</button>
                            </div>
                        </div>

                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </>
    )
}