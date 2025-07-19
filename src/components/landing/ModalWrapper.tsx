"use client";

import { useCallback, useState } from "react";
import LoginRegisterModal from "./LoginRegisterModal";

export default function ModalWrapper(){
    const [showLoginRegisterModal, setShowLoginRegisterModal] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLoginClick = () => {
        setShowLoginRegisterModal(true);
        setIsLogin(true);
    };

    const handleRegisterClick = () => {
        setShowLoginRegisterModal(true);
        setIsLogin(false);
    };

    const onChangeUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        console.log(username);
    }, [username]);
    const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        console.log(value);
    }, [email]);
    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        console.log(password);
    }, [password])

    const onLogin = useCallback(async () => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            console.log('Logged in successfully');
            setShowLoginRegisterModal(false);
            window.location.href = "/dashboard";  // Optional redirect
        } else {
            console.error('Failed to log in');
        }
    }, [email, password]);

    const onRegister = useCallback(async () => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            console.log('Registered successfully');
            setIsLogin(true);
        } else {
            console.error('Failed to register');
        }
    }, [username, email, password]);

    return (
        <>
            <button 
                onClick={handleLoginClick} 
                className="px-4 py-2 bg-blue-500 text-white rounded"
                >Login</button>
            <button 
                onClick={handleRegisterClick}
                className="px-4 py-2 bg-green-500 text-white rounded"
                >Register</button>
            {showLoginRegisterModal && (
                <LoginRegisterModal 
                    isLogin={isLogin} 
                    onClose={() => setShowLoginRegisterModal(false)}
                    onChangeEmail={onChangeEmail}
                    onChangePassword={onChangePassword}
                    onChangeUsername={onChangeUsername}
                    email={email}
                    password={password}
                    username={username}
                    onRegister={onRegister}
                    onLogin={onLogin}
                />
            )}
        </>
    );
}