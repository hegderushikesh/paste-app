import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteredux';


export default function Home() {
  const [title, setTitle] = useState('');
  const [value, setValues] = useState('');
  const [searchId, setSearchId] = useSearchParams();
  const pasteId=searchId.get("id");
  const dispatch=useDispatch();
  const allpass=useSelector((state)=>state.paste.pastes);
useEffect(() => {
        if (pasteId) {
          const Paste = allpass.find((p) => p.id === pasteId);
        
            setTitle(Paste.title);
            setValues(Paste.content);
          
        }}), [pasteId];

  function createpaste(){
        const paste={
            title:title,
            content:value,
            id:pasteId || Date.now().toString(36),
            createAt:new Date().toISOString()
        }

        if(pasteId){
            dispatch(updateToPaste(paste))
        }else{
            dispatch(addToPaste(paste))
        }   
        setTitle('');
        setValues('');
        setSearchId('');
  }
  return (
    <div>
        <div className='flex flex-row gap-7 '>
        <input
        className='p-2 rounded-md mt-4 border-2 border-gray-300 w-[80%]'     
         type="text" 
        placeholder="title" 
        value={title}
         onChange={(e) => setTitle(e.target.value)  } />
         <button 
         onClick={createpaste}
         className=' px-2 bg-blue-500 text-white rounded-md w-[10%] mt-4'>
            {
                pasteId ? `Update Paste ${pasteId}` : 'Create Paste'
            }
         </button>
         </div>
         <div>
            <textarea
            value={value}
            onChange={(e) => setValues(e.target.value)}
            className='p-2 rounded-md mt-6 border-2 border-gray-300 w-full '
            placeholder="content"
            rows={20}
            />
         </div>
    </div>
  
  )
}
