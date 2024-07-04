import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import Providers from './providers';
import UpButton from '@/components/UpButton';

// 메인데이터 설정
export const metadata: Metadata = {
    title: '포켓몬 도감',
    description: 'next.js로 만드는 포켓몬 도감 리스트가 있는 메인페이지 입니다',
    keywords: ['포켓몬', 'Pokemon', '도감', 'react', 'nextjs', '프론트앤드개발자'],
    authors: [{ name: '이보아' }],
    icons: {
        icon: '/favicon/favicon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <Providers>
                <body className="font-chicken">
                    <UpButton />
                    {children}
                </body>
            </Providers>
        </html>
    );
}
