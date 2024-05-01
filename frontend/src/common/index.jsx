import './index.css';
import * as React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const TABLE_ROW_LEN = 20
export const TABLE_COL_LEN = 22

const homepageUrl = process.env.REACT_APP_HOMEPAGE_URL || ''

export const Menu = ({ page }) => {

    const [input, setInput] = React.useState("")
    const navigate = useNavigate()

    const handleChange = (value) => {
        setInput(value)
    }
    const handleSubmit = (e) => {
        if (input) {
            navigate(`/c/${input}/union`); // Redirect to new page
        } else {
            e.preventDefault();
        }
    }
    return (
        <>
            {/* top bar */}
            {/* <div className="container-xl navbar-expand-lg navbar-bg position-relative">
                <div className="row">
                    <div className="col-12 ml-5 mb-3">
                        <div className="navbar navbar-top d-inline-flex align-items-center">
                            <a href="/" className="navbar-brand text-light">
                                <h3 className="d-inline-block align-text-top">BEO.GG</h3>
                            </a>

                        </div>
                    </div>
                </div>
            </div> */}
            <div className="container-fluid p-0 navbar-wrapper">
                <nav className="navbar navbar-expand navbar-group">
                    {/* <div className="row"> */}
                    <div className="navbar-nav">
                        {page === 'home' ?
                            <>
                                <div>
                                    <Link to="/" className="nav-item nav-link active">홈</Link>
                                </div>
                                {/* <div>
                                    <Link to="/faq" className="nav-item nav-link">FAQ</Link>
                                </div> */}
                            </>
                            :
                            page === 'faq' ?
                            <>
                                <div>
                                    <Link to="/" className="nav-item nav-link">홈</Link>
                                </div>
                                {/* <div>
                                    <Link to="/faq" className="nav-item nav-link active">FAQ</Link>
                                </div> */}
                            </>
                            :
                            <>
                                <div>
                                    <Link to="/" className="nav-item nav-link">홈</Link>
                                </div>
                                {/* <div>
                                    <Link to="/faq" className="nav-item nav-link">FAQ</Link>
                                </div> */}
                            </>
                        }
                    </div>
                    <div className="navbar-divider"></div>
                    <form className="mt-1 menu-search-form" onSubmit={(e) => { handleSubmit(e) }}>
                        <input className="menu-search-input search-bar form-control border-0 rounded-pill py-2 ps-4 pe-3" type="text" placeholder="닉네임 입력"
                            value={input} onChange={(e) => handleChange(e.target.value)} />
                        {/* <button type="submit" className="btn rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2" style={{ marginTop: '7px' }}>
                                <span className="material-symbols-outlined fill-thick-icon icon-darkgray">search</span>
                            </button> */}
                    </form>
                    {/* </div> */}
                </nav>
            </div>
        </>
    );
}

export const Footer = () => {
    return (
        <div className="container-fluid footer">
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div>Copyright © mapletetris 2024.</div>
                    <span>Data based on </span>
                    <span><a
                        className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover'
                        href='https://openapi.nexon.com/'>
                        NEXON Open API.
                    </a></span>
                    
                </div>
            </div>
        </div>
    )
}

export const PageLayout = ({ children, className }) => {
    return (
        <div className={`page-layout ${className ? className : ''}`}>
            <div className="wrapper">
                {children}
            </div>
            <Footer />
        </div>
    )
}


// export const ContentLayout = ({ children, className, rowClassName, colClassName }) => {
//     return (
//         <>
//             <div className={`container-fluid ${className ? className : ''}`}>
//                 <div className={`row ${rowClassName ? rowClassName : ''}`}>
//                     <div className="col-xl-2"></div>
//                     <div className={`col ${colClassName ? colClassName : ''}`}>
//                         {children}
//                     </div>
//                     <div className="col-xl-2"></div>
//                 </div>
//             </div>
//         </>
//     )
// }

export const ContentLayout = ({ children, className }) => {
    return (
        <>
            <div className={`content-layout ${className ? className : ''}`}>
                {children}
            </div>
        </>
    )
}


export const NotFound = () => {
    return (
        <>
            <div>
                <p>페이지를 찾을수 없습니다.</p>
            </div>
        </>
    )
}

export const LoadingTable = ({ children, loading }) => {
    return (
        <>
            {loading ?
                <div className="loading">
                    로딩중입니다..
                    {children}
                </div> :
                <>{children}</>}
        </>
    )
}