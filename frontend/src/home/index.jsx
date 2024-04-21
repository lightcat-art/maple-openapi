import * as React from 'react';
import './index.css'
import { useNavigate } from "react-router-dom";
import { Menu, Footer } from '../common'
import logo from '../static/img/logo/logo.svg'
import axios from 'axios';
import { WorldImage } from '../common/image.jsx'


const backDomain = process.env.REACT_APP_BACK_URL || ''

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

function UnionTopRanking() {
    const [unionTopRank, setUnionTopRank] = React.useState(null)
    React.useEffect(() => {
        axios.get(`${backDomain}/api/ranking/union-top`)
            .then(response => {
                setUnionTopRank(response.data.ranking)
            })
            .catch(error => console.log(error));
    }, [])
    return (
        <>
            <table class="rank-table">
                {unionTopRank ?
                    <>
                        <thead className='ranking-head'>
                            <tr>
                                <th></th>
                                <th>유니온 랭킹</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='ranking-body'>
                            {unionTopRank.map((row, i) => (
                                <tr key={i}>
                                    {i < 10 ?
                                        <>
                                            <th>{row.ranking}</th>
                                            <td>
                                                <a
                                                    className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover'
                                                    href={`/c/${row.characterName}/union`}>
                                                    {row.characterName}
                                                </a>
                                            </td>
                                            <td>Lv.{row.unionLevel}</td>
                                            <td><WorldImage className='world-img' server={row.worldName}></WorldImage> {row.worldName}</td>
                                        </> : null}

                                </tr>
                            ))}
                        </tbody>
                    </>
                    :
                    <></>}

            </table>
        </>
    )
}

function OverallTopRanking() {
    const [overallTopRank, setOverallTopRank] = React.useState(null)
    React.useEffect(() => {
        axios.get(`${backDomain}/api/ranking/overall-top`)
            .then(response => {
                setOverallTopRank(response.data.ranking)
            })
            .catch(error => console.log(error));
    }, [])
    return (
        <>
            <table class="rank-table">
                {overallTopRank ?
                    <>
                        <thead className='ranking-head'>
                            <tr>
                                <th></th>
                                <th>종합 랭킹</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='ranking-body'>
                            {overallTopRank.map((row, i) => (
                                <tr key={i}>
                                    {i < 10 ?
                                        <>
                                            <th>{row.ranking}</th>
                                            <td>
                                                <a
                                                    className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover'
                                                    href={`/c/${row.characterName}/union`}>
                                                    {row.characterName}
                                                </a>
                                            </td>
                                            <td>{row.className}</td>
                                            <td>Lv.{row.characterLevel}</td>
                                            {/* <td>{row.characterExp}</td> */}
                                            <td><WorldImage className='world-img' server={row.worldName}></WorldImage> {row.worldName}</td>
                                        </> : null}

                                </tr>
                            ))}
                        </tbody>
                    </>
                    :
                    <></>}

            </table>
        </>
    )
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

        <div className="home page-layout">
            {/* <div className="container-fluid bg-primary main-bg d-none d-sm-block">
            </div>
            <div className="container-fluid bg-primary main-bg-tab d-none d-md-block d-xl-none">
            </div>
            <div className="container-fluid bg-primary main-bg-mob d-sm-none">
            </div> */}
            {/* <div className="main-bg"></div> */}

            <Menu page='home' />

            <div className="home-inner container-fluid wrapper">
                <div className="main">

                    <h1 className="main-logo mb-3 text-center animate__animated animate__slideInDown" style={{ color: '#000000' }}>
                        <p><img className="mb-1 homepage-logo" src={logo} alt="" />&nbsp;&nbsp;Maple Tetris</p>
                    </h1>
                    <h5 className="main-logo-desc mb-4 text-center animate__animated animate__slideInDown" style={{ color: '#000000' }}>메이플 유니온 배치 계산</h5>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-3"></div>
                            <div className="col position-relative w-75 mx-auto">
                                <form onSubmit={(e) => { handleSubmit(e) }}>
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
                    <div className="row mt-5">
                        <div className="col-xl-2"></div>
                        <div className="col-xl">
                            <UnionTopRanking></UnionTopRanking>
                        </div>
                        <div className="col-xl">
                            <OverallTopRanking></OverallTopRanking>
                        </div>
                        <div className="col-xl-2"></div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    )
}