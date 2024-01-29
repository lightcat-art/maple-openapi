
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


                        <div class="card text">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-3">
                                        <div class="text-primary"> Name </div>
                                    </div>
                                    <div class="col-6">
                                    </div>
                                    <div class="col-3">
                                        <div class="float-right text-secondary"> Aug 21 2019 </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Average Rating (4.5) </h5>
                                <p class="card-text">Contrary to popular belief, Lorem Ipsum is not </p>
                            </div>
                            <div class="collapse" id="review">
                                <div class="card-body">
                                    <h5 class="card-title">More </h5>
                                    <p class="card-text">Contrary to popular belief, Lorem Ipsum is not </p>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">More </h5>
                                    <p class="card-text">Contrary to popular belief, Lorem Ipsum is not </p>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">More </h5>
                                    <p class="card-text">Contrary to popular belief, Lorem Ipsum is not </p>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">More </h5>
                                    <p class="card-text">Contrary to popular belief, Lorem Ipsum is not </p>
                                </div>
                            </div>
                            <div class="card-footer text-muted text-center">
                                <a href="#" class="btn" data-bs-toggle="collapse" data-bs-target="#review"
                                    role="button" aria-expanded="false" aria-controls="review">
                                    <div class="row">
                                        <div> Click to see full review </div>
                                    </div>
                                    <span class="oi oi-caret-bottom"></span>
                                </a>
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#review" aria-expanded="false" aria-controls="review">Toggle</button>
                            </div>
                        </div>

                        <p>
                            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                                Toggle width collapse
                            </button>
                        </p>
                        <div style={{minHheight: '120px'}}>
                            <div class="collapse collapse-horizontal" id="collapseWidthExample">
                                <div class="card card-body" style={{width:'300px'}}>
                                    This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </>
    )
}