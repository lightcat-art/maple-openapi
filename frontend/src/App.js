import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import * as React from 'react';
import { UnionRaider } from './union';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path='/union' element={<UnionRaider />} /> */}
      </Routes>
    </BrowserRouter>
  )
}


// 반응형 컨텐츠 관리
export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
export const NotMobile = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export default App;
