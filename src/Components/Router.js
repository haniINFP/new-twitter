import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from './Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
               {
                    isLoggedIn ? (
                        <>
                        <Route path="/" element={< Home />} />
                        <Route path='/profile' element={ <Profile />}/>
                    </>
                ) : (
                        <Route path="/" element={< Auth />} />

                    )
                }
                <Route path="*" element={<Navigate replace to="/" /> }/>
                {/* 어떤 경로든 간에 replace 써서 "/"페이지로 가게끔 함. 허가되지 않은 주소로의 접근을 막아줄 수 있음 */}
            </Routes>
        </Router>
    )
}

export default AppRouter;