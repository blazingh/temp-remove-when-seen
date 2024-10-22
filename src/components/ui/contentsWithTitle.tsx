/* eslint-disable react/no-unescaped-entities */
'use client'
import IconArrow from '@/icons/arrowLeft';
import React from 'react';

export default function ContentsWithTitle(
    {
        title,
        content

    } : {
        title : string,
        content : string
    }
) {
    

    return (
        <div className='rounded-md border'>
            <div className='block px-2 py-4'>
                <div className='flex w-full items-center justify-between px-2'>
                    <span className='text-xl font-extrabold font-poppins'>{title}</span><IconArrow className={"transform -rotate-90"} />
                </div>
                <div className="block justify-start items-center p-2">
                    
                    {/* <ul>
                        {propertiesArr.map((item: any, index: any) => (
                                <li className='font-normal font-poppins leading-6 tracking-normal text-base w-full break-all' key={index}>
                                    {'\u2022'} {item.content.deneme}
                                </li>
                        ))}
                    </ul> */}
                    <span>
                        {content}</span>

                </div>
            </div>
        </div>
    );
};
