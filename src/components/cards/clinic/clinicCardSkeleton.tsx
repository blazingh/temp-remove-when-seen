'use client'
import React from 'react';

export default function ClinicCardSkeleton() {
    return (
        <div className="w-full h-[140px] border rounded-md overflow-hidden flex bg-white animate-pulse">
            <div className="w-[96px] max-w-[96px] h-full bg-gray-300"></div>
            <div className="flex flex-col gap-1 p-2">
                <div className="h-5 w-1/2 bg-gray-300"></div>
                <div className="h-3 w-3/4 bg-gray-300"></div>
                <div className="h-3 w-3/4 bg-gray-300"></div>
                <div className="h-5 w-2/3 bg-gray-300"></div>
                <div className="h-5 w-1/2 bg-gray-300"></div>
            </div>
        </div>
    );
}

