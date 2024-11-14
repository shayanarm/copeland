import React from 'react';

export default function BrowserOnly({ children }: {children: React.ReactNode | (() => React.ReactNode)}) {
    return (typeof window !== "undefined") ? (
        typeof children === "function" ? children() : children
    ) :
        <></>;
};