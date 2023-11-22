import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

const Chat = () => {
  const [message, setMessage] = useState('');

  return (
    <div className='w-full'>
      <div className='flex h-16 w-full px-5 items-center sticky top-0 bg-[#343541]'>
        <h1 className='text-lg font-bold'>TaylorSwiftGPT</h1>
      </div>
      <div className='min-h-[82%] flex flex-col items-center justify-center ml-[27%] mr-[26.5%] overflow-auto scroll-snap-type-y mandatory'>
        <h1 className='text-5xl font-bold'>TaylorSwiftGPT</h1>
      </div>
      <div className='ml-[27%] mr-[26.5%] mt-5'>
        <div className='w-full px-4 py-3 border border-[#464652] bg-[#343541] rounded-2xl'>
          <input 
            className='w-[95.8%] bg-[#343541] focus:outline-none'
            type='text' 
            placeholder='Message TaylorSwiftGPT...'
            onInput={(event) => setMessage(event.target.value)} 
          />
          {
            message === '' ? (
              <button className='w-[30px] h-[30px] bg-[#494A54] rounded-lg justify-center items-center'>
                <div className='flex justify-center items-center text-[#2F303A]'>
                  <FaArrowUp />
                </div>
              </button>
            ) : (
              <button className='w-[30px] h-[30px] bg-[#FFFFFF] rounded-lg justify-center items-center'>
                <div className='flex justify-center items-center text-[#2F303A]'>
                  <FaArrowUp />
                </div>
              </button>
            )
          }
        </div>
        <p className='mt-3 text-xs text-bold text-center text-[#8B8B92]'>TeylorSwiftGPT can make mistakes. Consider checking important information.</p>
      </div>
    </div>
  );
};

export default Chat;