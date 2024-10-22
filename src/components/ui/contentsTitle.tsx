/* eslint-disable react/no-unescaped-entities */
'use client'
import IconArrow from '@/icons/arrowLeft';
import React from 'react';

export default function ContentsTitle(
    {
        title,
        propertiesArr

    }: {
        title: string,
        propertiesArr: any
    }
) {

    return (
        <div>
            <div className="treatmentCls justify-start items-center p-2">
                <div dangerouslySetInnerHTML={{ __html: propertiesArr }} /></div>
        </div>
    );
};
