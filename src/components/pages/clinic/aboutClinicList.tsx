'use client'
import DialogBox from '@/components/ui/diologBox';
import IconArrow from '@/icons/arrowLeft';
import React, { useState } from 'react';
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import IconHeart from '@/icons/heart';


export default function AboutClinicList() {



    return (
        <div className='rounded-md'>
            <div className='block w-full pb-4'>
                <div className="mt-5 pb-4 px-4 text-xl ml-6 font-extrabold font-poppins">
                    Klinik Hakkında
                </div></div>
            <div>
                <span className='text-sm' data-id='dentgruop hakkimizda'>
                </span>
            </div>
        </div>
    );
};
