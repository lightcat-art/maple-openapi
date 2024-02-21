import './index.css';
import { Link } from "react-router-dom";

export const TABLE_ROW_LEN = 20
export const TABLE_COL_LEN = 22

export const Menu = ({ page }) => {

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
                    <div className="row">
                        <div className="col col-2"></div>
                        <div className="col-auto">
                            <div className="navbar-nav">
                                {page === 'home' ?
                                    <>
                                        <Link to="/" className="nav-item nav-link active">홈</Link>
                                    </> :
                                    <>
                                        <Link to="/" className="nav-item nav-link">홈</Link>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="col col-2"></div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export const ContentLayout = ({ children, className, rowClassName, colClassName }) => {
    return (
        <>
            <div className={`container-fluid ${className ? className : ''}`}>
                <div className={`row ${rowClassName ? rowClassName : ''}`}>
                    <div className="col-xl-2"></div>
                    <div className={`col ${colClassName ? colClassName : ''}`}>
                        {children}
                    </div>
                    <div className="col-xl-2"></div>
                </div>
            </div>
        </>
    )
}

export const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Menu></Menu>
            {children}
        </div>
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

export const Loading = () => {
    return (
        <div className="row">
            <div className="col-auto char-img">
                <img className="placeholder" alt="" />
            </div>
            <div className="col-auto">
                <div className='container placeholder-glow'>
                    <div className='row'>
                        <div className='placeholder col rounded-pill'>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='placeholder rounded-pill col-auto'>
                        </div>
                        <div className='placeholder rounded-pill col-auto'>
                        </div>
                        <div className='placeholder rounded-pill col-auto'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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