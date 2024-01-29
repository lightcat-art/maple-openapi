import './index.css'
import searchLogo from '../static/icons/search_FILL0_wght600_GRAD0_opsz24.svg';

export function Home() {
    return (
        <HomeLayout>
            <HomeContent />
        </HomeLayout>
    )
}

function HomeContent() {
    return (
        <>
        </>
    );
}

function HomeLayout() {
    return (
        <div className="container-fluid">
            <div className="layout-home">
                {/* <div className="container-fluid main-bg-monotone"></div> */}

                <nav className="navbar navbar-expand-sm navbar-group" style={{ backgroundColor: '#e0e0e0' }}>
                    {/* <div class="collapse navbar-collapse" id="navbarCollapse"> */}
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-md-auto">
                            <div className="navbar-nav">
                                <a href="/" className="nav-item nav-link active">홈</a>
                                <a href="/union" className="nav-item nav-link">유니온</a>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </nav>

                <div className="main">
                    <h1 className="display-3 mb-3 text-center animate__animated animate__slideInDown" style={{ color: '#000000' }}>MP.GG</h1>
                    <div className="position-relative mx-auto">
                        <input className="form-control border-0 rounded-pill py-3 ps-4 pe-5" type="text" placeholder="닉네임 입력"
                            style={{ backgroundColor: '#f3f3f3' }}></input>
                        <button type="button" className="btn rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2" style={{ marginTop: '7px' }}>
                            <img src={searchLogo} alt=""></img>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}