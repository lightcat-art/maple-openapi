import * as React from 'react';
import './index.css'
import { useNavigate } from "react-router-dom";
import { Menu } from '../common'
import logo from '../static/img/logo/logo.svg'

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

    const handleSubmit = (e) => {
        if (input) {
            navigate(`/c/${input}/union`); // Redirect to new page
        } else {
            e.preventDefault();
        }
    }

    return (

        <div className="home">
            {/* <div className="container-fluid bg-primary main-bg d-none d-sm-block">
            </div>
            <div className="container-fluid bg-primary main-bg-tab d-none d-md-block d-xl-none">
            </div>
            <div className="container-fluid bg-primary main-bg-mob d-sm-none">
            </div> */}
            {/* <div className="main-bg"></div> */}

            <Menu page='home' />

            <div className="home-inner container-fluid">
                <div className="main">

                    <h1 className="main-logo mb-3 text-center animate__animated animate__slideInDown" style={{ color: '#000000' }}>
                        <p><img className="mb-1 homepage-logo" src={logo} alt="" />&nbsp;&nbsp;Union Block Allocator</p>
                    </h1>
                    <h5 className="main-logo-desc mb-4 text-center animate__animated animate__slideInDown" style={{ color: '#000000' }}>유니온 배치 계산기</h5>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-3"></div>
                            <div className="col position-relative w-75 mx-auto">
                                <form onSubmit={(e)=> {handleSubmit(e)}}>
                                    <input className="search-bar form-control border-0 rounded-pill py-3 ps-4 pe-5" type="text" placeholder="닉네임 입력"
                                        value={input} onChange={(e) => handleChange(e.target.value)} />
                                    <button type="submit" className="btn rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2" style={{ marginTop: '7px' }}>
                                        {/* <img src={searchLogo} alt=""></img> */}
                                        <span className="material-symbols-outlined fill-thick-icon icon-darkgray">search</span>
                                    </button>
                                </form>
                            </div>
                            <div className="col-xl-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}