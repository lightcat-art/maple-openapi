import * as React from 'react';
import './index.css'
import searchLogo from '../static/icons/search_FILL0_wght600_GRAD0_opsz24.svg';
import { useNavigate } from "react-router-dom";
import { Menu } from '../common'

export function Home() {
    return (
        <HomeLayout>
            {/* <HomeContent /> */}
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

    const [input, setInput] = React.useState("")
    const navigate = useNavigate()

    const handleChange = (value) => {
        setInput(value)
    }

    const handleSubmit = () => {
        console.log('submit value=', input)

        navigate(`/c/${input}/union`); // Redirect to new page
    }

    return (

        // <div className="container-fluid">
        <div className="home">
            {/* <div className="container-fluid bg-primary main-bg d-none d-sm-block">
            </div> */}
            {/* <div className="container-fluid bg-primary main-bg-tab d-none d-md-block d-xl-none">
            </div> */}
            {/* <div className="container-fluid bg-primary main-bg-mob d-sm-none">
            </div> */}
            {/* <div className="main-bg"></div> */}

            <Menu page='home' />

            <div className="container-fluid">
                <div className="main">
                    <h1 className="main-logo display-3 mb-3 text-center animate__animated animate__slideInDown" style={{ color: '#000000' }}>MP.GG</h1>
                    <div className="position-relative w-75 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <input className="search-bar form-control border-0 rounded-pill py-3 ps-4 pe-5" type="text" placeholder="닉네임 입력"
                                value={input} onChange={(e) => handleChange(e.target.value)} />
                            <button type="submit" className="btn rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2" style={{ marginTop: '7px' }}>
                                <img src={searchLogo} alt=""></img>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        // </div>

    )
}