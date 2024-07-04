'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const UpButton: React.FC = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        setShowButton(window.scrollY > 250 ? true : false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-10 right-10 p-0 m-0 z-10 border-none bg-transparent transition-opacity duration-300 ${
                showButton ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="스크롤 위로"
        >
            <Image src="/upbtn.png" alt="스크롤 업버튼" width={90} height={90} />
        </button>
    );
};

export default UpButton;
