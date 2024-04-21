import axios from 'axios';
import { WorldImage } from '../common/image.jsx'
import * as React from 'react';

const backDomain = process.env.REACT_APP_BACK_URL || ''
export function UnionTopRanking() {
    const [topRank, setTopRank] = React.useState(null)
    React.useEffect(() => {
        axios.get(`${backDomain}/api/ranking/union-top`)
            .then(response => {
                setTopRank(response.data.ranking)
            })
            .catch(error => console.log(error));
    }, [])

    const rankRender = () => {
        const result = [];
        if (topRank) {
            for (let i = 0; i < 10; i++) {

                result.push(
                    <tr key={i}>
                        <th>{topRank[i].ranking}</th>
                        <td>
                            <a
                                className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover'
                                href={`/c/${topRank[i].characterName}/union`}>
                                {topRank[i].characterName}
                            </a>
                        </td>
                        <td>{topRank[i].subClassName? topRank[i].subClassName : topRank[i].className}</td>
                        <td>Lv.{topRank[i].unionLevel}</td>
                        <td>
                            <WorldImage className='world-img' server={topRank[i].worldName} /> {topRank[i].worldName}
                        </td>
                    </tr>
                )
            }
        }
        return result
    }
    return (
        <>
            {topRank ?
                <table class="rank-table table table-hover">
                    <thead className='ranking-head'>
                        <tr>
                            <th></th>
                            <th>유니온 랭킹</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='ranking-body'>
                        {rankRender()}
                    </tbody>
                </table>
                :
                null}

        </>
    )
}


export function OverallTopRanking() {
    const [topRank, setTopRank] = React.useState(null)
    React.useEffect(() => {
        axios.get(`${backDomain}/api/ranking/overall-top`)
            .then(response => {
                setTopRank(response.data.ranking)
            })
            .catch(error => console.log(error));
    }, [])


    const rankRender = () => {
        const result = [];
        if (topRank) {
            for (let i = 0; i < 10; i++) {

                result.push(
                    <tr key={i}>
                        <th>{topRank[i].ranking}</th>
                        <td>
                            <a
                                className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover'
                                href={`/c/${topRank[i].characterName}/union`}>
                                {topRank[i].characterName}
                            </a>
                        </td>
                        <td>{topRank[i].subClassName? topRank[i].subClassName : topRank[i].className}</td>
                        <td>Lv.{topRank[i].characterLevel}</td>
                        <td>
                            <WorldImage className='world-img' server={topRank[i].worldName} /> {topRank[i].worldName}
                        </td>
                    </tr>
                )
            }
        }
        return result
    }

    return (
        <>
            {topRank ?
                <table class="rank-table table table-hover">
                    <thead className='ranking-head'>
                        <tr>
                            <th></th>
                            <th className="fixed-line">종합 랭킹</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='ranking-body'>
                        {rankRender()}
                    </tbody>
                </table>
                :
                null}

        </>
    )
}

export function GuildTopRanking() {
    const [topRank, setTopRank] = React.useState(null)
    const param = { rankingType: 0 }
    React.useEffect(() => {
        axios.get(`${backDomain}/api/ranking/guild-top`, { params: param })
            .then(response => {
                setTopRank(response.data.ranking)
            })
            .catch(error => console.log(error));
    }, [])


    const rankRender = () => {
        const result = [];
        if (topRank) {
            for (let i = 0; i < 10; i++) {

                result.push(
                    <tr key={i}>
                        <th>{topRank[i].ranking}</th>
                        <td>
                            <img src={topRank[i].guildMark} />{topRank[i].guildName}
                        </td>
                        <td>
                            <WorldImage className='world-img' server={topRank[i].worldName} /> {topRank[i].worldName}
                        </td>
                        <td>
                            <a
                                className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover'
                                href={`/c/${topRank[i].guildMasterName}/union`}>
                                {topRank[i].guildMasterName}
                            </a>
                        </td>
                    </tr>
                )
            }
        }
        return result
    }

    return (
        <>
            {topRank ?
                <table class="rank-table table table-hover">
                    <thead className='ranking-head'>
                        <tr>
                            <th></th>
                            <th>길드 랭킹</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='ranking-body'>
                        {rankRender()}
                    </tbody>
                </table>
                :
                null}

        </>
    )
}

export function DojangTopRanking() {
    const [topRank, setTopRank] = React.useState(null)
    const param = { rankingType: 1 }
    React.useEffect(() => {
        axios.get(`${backDomain}/api/ranking/dojang-top`, { params: param })
            .then(response => {
                setTopRank(response.data.ranking)
            })
            .catch(error => console.log(error));
    }, [])


    const rankRender = () => {
        const result = [];
        if (topRank) {
            for (let i = 0; i < 10; i++) {

                result.push(
                    <tr key={i}>
                        <th>{topRank[i].ranking}</th>
                        <td>
                            <a
                                className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover'
                                href={`/c/${topRank[i].characterName}/union`}>
                                {topRank[i].characterName}
                            </a>
                        </td>
                        <td>{topRank[i].subClassName? topRank[i].subClassName : topRank[i].className}</td>
                        <td>
                            <WorldImage className='world-img' server={topRank[i].worldName} /> {topRank[i].worldName}
                        </td>
                        <td>{topRank[i].dojangFloor}층</td>
                        <td>{topRank[i].dojangTimeRecord}초</td>
                    </tr>
                )
            }
        }
        return result
    }

    return (
        <>
            {topRank ?
                <table class="rank-table table table-hover">
                    <thead className='ranking-head'>
                        <tr>
                            <th></th>
                            <th>무릉도장 랭킹</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='ranking-body'>
                        {rankRender()}
                    </tbody>
                </table>
                :
                null}

        </>
    )
}



export function TheSeedTopRanking() {
    const [topRank, setTopRank] = React.useState(null)
    React.useEffect(() => {
        axios.get(`${backDomain}/api/ranking/theseed-top`)
            .then(response => {
                setTopRank(response.data.ranking)
            })
            .catch(error => console.log(error));
    }, [])


    const rankRender = () => {
        const result = [];
        if (topRank) {
            for (let i = 0; i < 10; i++) {

                result.push(
                    <tr key={i}>
                        <th>{topRank[i].ranking}</th>
                        <td>
                            <a
                                className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover'
                                href={`/c/${topRank[i].characterName}/union`}>
                                {topRank[i].characterName}
                            </a>
                        </td>
                        <td>{topRank[i].subClassName? topRank[i].subClassName : topRank[i].className}</td>
                        <td>
                            <WorldImage className='world-img' server={topRank[i].worldName} /> {topRank[i].worldName}
                        </td>
                        <td>{topRank[i].theseedFloor}층</td>
                        <td>{topRank[i].theseedTimeRecord}초</td>
                    </tr>
                )
            }
        }
        return result
    }

    return (
        <>
            {topRank ?
                <table class="rank-table table table-hover">
                    <thead className='ranking-head'>
                        <tr>
                            <th></th>
                            <th>더 시드 랭킹</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='ranking-body'>
                        {rankRender()}
                    </tbody>
                </table>
                :
                null}

        </>
    )
}



export function AchieveTopRanking() {
    const [topRank, setTopRank] = React.useState(null)
    React.useEffect(() => {
        axios.get(`${backDomain}/api/ranking/achieve-top`)
            .then(response => {
                setTopRank(response.data.ranking)
            })
            .catch(error => console.log(error));
    }, [])


    const rankRender = () => {
        const result = [];
        if (topRank) {
            for (let i = 0; i < 10; i++) {

                result.push(
                    <tr key={i}>
                        <th>{topRank[i].ranking}</th>
                        <td>
                            <a
                                className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover'
                                href={`/c/${topRank[i].characterName}/union`}>
                                {topRank[i].characterName}
                            </a>
                        </td>
                        <td>{topRank[i].subClassName? topRank[i].subClassName : topRank[i].className}</td>
                        <td>
                            <WorldImage className='world-img' server={topRank[i].worldName} /> {topRank[i].worldName}
                        </td>
                        <td>{topRank[i].trophyGrade}</td>
                        <td>{topRank[i].trophyScore}점</td>
                    </tr>
                )
            }
        }
        return result
    }

    return (
        <>
            {topRank ?
                <table class="rank-table table table-hover">
                    <thead className='ranking-head'>
                        <tr>
                            <th></th>
                            <th>업적 랭킹</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='ranking-body'>
                        {rankRender()}
                    </tbody>
                </table>
                :
                null}

        </>
    )
}