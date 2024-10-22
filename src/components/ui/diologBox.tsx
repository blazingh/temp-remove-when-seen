import React from 'react';
import Image from "next/image";
import { cn } from '@/lib/utils';


interface Message {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

interface DialogBoxProps {
  messages: Message[];
  className: string
}

const DialogBox: React.FC<DialogBoxProps> = ({ messages , className} : {
  messages: Message[]
  className : string
}) => {
  return (
    <div className={cn(" mt-4 w-full", className)}>
      {messages.map((message) => (
     <div
     key={message.id}
     >
         <div
          className={`mb-4 flex justify-end`}
        >
          <div
            className={`p-2 text-base text-black max-w-xs  bg-[#F6FFF9] border  border-[#DFF7E9] self-end mr-[4px] rounded-bl-xl rounded-tr-xl rounded-tl-xl`}
          >
            {message.question}
            <div className="text-xs text-gray-300 mt-1">{message.created_at}</div>
          </div>
          
            <div className='relative mr-[26px]'>
              <div className="absolute bottom-0 w-[25px] h-[25px] ">
                <Image
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNF_afhaOLDxeKPhXHHfIpuBoNPx5Cty7byV5jPfLlhOcO9haAxAliwprKFhTlKfT-nY&usqp=CAU'

                  }
                  alt={'sait'}
                  fill
                />
              </div>
            </div>
        </div>
          <div
          key={message.id}
          className={`mb-4 flex justify-start`}
        >
          
            <div className='relative'>
              <div className="absolute bottom-0 w-[25px] h-[25px]">
                <Image
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNF_afhaOLDxeKPhXHHfIpuBoNPx5Cty7byV5jPfLlhOcO9haAxAliwprKFhTlKfT-nY&usqp=CAU'

                  }
                  alt={'sait'}
                  fill
                />
              </div>
            </div>
          <div
            className={`p-2 text-base text-black max-w-xs  bg-[#F9F9F9] ml-[28px] border-[#F4F4F4] self-start rounded-br-xl rounded-tl-xl rounded-tr-xl`}
          >
            {message.answer}
            <div className="text-xs text-gray-300 mt-1">{message.updated_at}</div>
          </div>
        </div>
     </div>
      ))}
    </div>
  );
};

export default DialogBox;
