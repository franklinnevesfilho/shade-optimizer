import React from 'react';
import Title from './Title.tsx';

export interface PopUpProps {
    children: React.ReactNode;
    title?: string;
    style?: string;
    onClose: (state: boolean) => void;
}

function PopUp({ children, style, onClose, title }: PopUpProps) {
    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
            <div className={`border border-white rounded-lg ${style}  flex flex-col`} style={{ width: 'max-content', height: 'max-content' }}>
                <div className="w-full flex flex-row items-center bg-neutral-700 bg-opacity-35 rounded-t-lg border-b border-white">
                    <div className="flex-grow text-center ms-10">
                        <Title>
                            {title}
                        </Title>
                    </div>
                    <button
                        className="btn btn-square bg-transparent text-red-400 text-xl hover:bg-red-700 hover:bg-opacity-35 hover:text-neutral-100"
                        onClick={() => onClose(false)}
                    >
                        X
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PopUp;