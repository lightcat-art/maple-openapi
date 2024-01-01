
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
        <>
            <div className="container-fluid bg-primary py-5 mb-5 main-bg"></div>
        </>

    )
}