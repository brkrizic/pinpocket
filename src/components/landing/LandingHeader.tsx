"use client";

import ModalWrapper from "./ModalWrapper";

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 border-b bg-white shadow">
            <h1 className="text-xl font-bold text-black">PinPocket</h1>
            <nav className="space-x-4">
                <ModalWrapper/>
            </nav>
        </header>
    );
};
