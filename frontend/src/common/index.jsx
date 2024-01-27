import './index.css';

export const Menu = () => {
    return (
        <>
            {/* top bar */}
            <div className="container-xl navbar-expand-lg navbar-bg position-relative">
                <div className="row">
                    <div className="col-12 ml-5 mb-3">
                        <div className="navbar navbar-top d-inline-flex align-items-center">
                            <a href="/" className="navbar-brand text-light">
                                <h3 className="d-inline-block align-text-top">BEO.GG</h3>
                            </a>

                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xl navbar-bg position-relative">
                <nav className="navbar navbar-expand-lg navbar-light ml-5 py-3 py-lg-0">
                    {/* <div class="collapse navbar-collapse" id="navbarCollapse"> */}
                    <div className="navbar-nav ms-auto py-0">
                        
                        <a href="/" className="nav-item nav-link active">홈</a>
                        <a href="/" className="nav-item nav-link">유니온</a>
                        <a href="service.html" className="nav-item nav-link">길드</a>
                        <a href="package.html" className="nav-item nav-link">캐릭터</a>
                        <div className="nav-link">유니온 Package</div>

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
                <div className="container-fixed bg-primary py-5 mb-5 background-header">
                </div>
            </div>

        </>
    );
}

export const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Menu></Menu>
            {children}
        </div>
    )
}

