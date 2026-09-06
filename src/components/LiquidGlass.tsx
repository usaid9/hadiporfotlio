import React from 'react';

type LiquidGlassProps = {
    children?: React.ReactNode;
    className?: string;
};

const LiquidGlass = ({ children, className = '' }: LiquidGlassProps) => {
    return (
        <div className={`relative overflow-hidden bg-transparent rounded-[2rem] ${className}`}>
            <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg"></div>
            <div className="absolute inset-0 border border-white border-opacity-20 rounded-lg"></div>
            <div className="relative z-10 p-4">
                {children}
            </div>
        </div>
    );
};

export default LiquidGlass;