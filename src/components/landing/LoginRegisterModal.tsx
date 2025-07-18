"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isLogin: boolean;
    onClose: () => void;
    onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    username: string;
    email: string;
    password: string;
    onRegister: () => void;
    onLogin: () => void;
}

export default function LoginRegisterModal({ 
    isLogin, 
    onClose, 
    onChangeUsername,
    onChangeEmail,
    onChangePassword,
    username, 
    email,
    password,
    onLogin,
    onRegister
}: ModalProps){
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
        document.body.style.overflow = "";
        };
    }, []);
    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >✕</button>
                {isLogin ? (
                    <>
                    <h2 className="text-xl font-semibold mb-4 text-center text-black">Login</h2>
              
                    <input
                        type="email"
                        placeholder="Email"
                        className="border w-full p-2 mb-4 rounded"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border w-full p-2 mb-4 rounded"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <button 
                        onClick={onLogin}
                        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                    </>
                ):(
                    <>
                    <h2 className="text-xl font-semibold mb-4 text-center text-black">Register</h2>
                    <input
                        type="username"
                        placeholder="Username"
                        className="border w-full p-2 mb-4 rounded"
                        value={username}
                        onChange={onChangeUsername}
                        />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border w-full p-2 mb-4 rounded"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border w-full p-2 mb-4 rounded"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <button
                        onClick={onRegister} 
                        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
                        Register
                    </button>
                </>
            )}
                
            </div>
                
        </div>,
        document.getElementById("modal-root")!
    );
}