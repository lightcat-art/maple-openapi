import * as React from 'react';
import './index.css'
import { useNavigate } from "react-router-dom";
import { Menu, Footer, PageLayout } from '../common'

export function Faq() {
    return (
        <PageLayout>
            <Menu page='faq'></Menu>
            <FaqContent />
        </PageLayout>
    )
}

function FaqContent() {
    return (
        <>
        </>
    );
}


