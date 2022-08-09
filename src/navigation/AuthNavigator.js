import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { Signin, Signup } from '../screens';

const AuthNavigator = () => {
    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<Navigate to="/signin" replace/>} />
        </Routes>
    )
}

export default AuthNavigator;