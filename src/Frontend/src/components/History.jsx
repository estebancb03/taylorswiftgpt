import { useState } from 'react';
import { FaGuitar } from 'react-icons/fa6';
import { LuPenSquare } from 'react-icons/lu';

import User from './User';

const History = () => {
  return (
    <div className='w-full max-w-[260px] bg-[#000000] px-3 py-3.5'>
      <div className='flex items-center rounded-lg px-1.5 py-2 cursor-pointer hover:bg-[#202123]'>
        <FaGuitar size={'28px'}/>
        <h1 className='text-sm mx-2'>New chat</h1>
        <LuPenSquare className='ml-[100px]' size={'18px'} />
      </div>
      <div className='h-[84.5%] py-8 px-3'>
        
      </div>
      <User />
    </div>
  );
};

export default History;