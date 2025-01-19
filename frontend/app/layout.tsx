import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const jersey = localFont({
    src: '../public/fonts/Jersey10-Regular.ttf',
    variable: '--font-jersey',
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${jersey.variable}`}>
            <body>{children}</body>
        </html>
    );
}
