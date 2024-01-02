
import { Layout } from '../common'
import './index.css'

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
            dfef
        </>
    );
}

function HomeLayout() {
    return (
        <div className="layout-home">
            <div className="container-fluid bg-primary main-bg d-none d-sm-block">
            </div>
            {/* <div className="container-fluid bg-primary main-bg-tab d-none d-md-block d-xl-none">
            </div> */}
            <div className="container-fluid bg-primary main-bg-mob d-sm-none">
            </div>

            <nav className="navbar navbar-expand-lg navbar-light">
                {/* <div class="collapse navbar-collapse" id="navbarCollapse"> */}
                <div className="navbar-nav ms-auto">

                    <a href="/" className="nav-item nav-link active">홈</a>
                    <a href="/union" className="nav-item nav-link">유니온</a>

                    {/* <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu m-0">
                                <a href="destination.html" className="dropdown-item">Destination</a>
                                <a href="booking.html" className="dropdown-item">Booking</a>
                                <a href="team.html" className="dropdown-item">Travel Guides</a>
                                <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                <a href="404.html" className="dropdown-item">404 Page</a>
                            </div>
                        </div>
                        <a href="contact.html" className="nav-item nav-link">Contact</a> */}
                </div>
                {/* <a href="" className="btn btn-primary rounded-pill py-2 px-4">Register</a> */}
                {/* </div> */}
            </nav>

            <div className="search-form">
                <h1 className="display-3 text-white mb-3 text-center animate__animated animate__slideInDown">MP.GG</h1>
                {/* <input className="form-control border-0 rounded-pill" type="text" placeholder="캐릭터명"></input>
                <button type="button" className="btn btn-primary rounded-pill">Search</button> */}
                <div className="input-group md-form form-sm form-1 pl-0">
                    <div className="input-group-prepend">
                        <span className="input-group-text cyan lighten-2" id="basic-text1"><i className="fas fa-search text-white"
                            aria-hidden="true"></i></span>
                    </div>
                    <input className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" />
                </div>
            </div>
        </div>

    )
}