// import React from 'react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteredux';

export default function Viewpaste() {   
  const {id}=useParams();
  const dispatch=useDispatch();
  const allpass=useSelector((state)=>state.paste.pastes);
  const paste=allpass.filter((p)=>p.id===id)[0];
  
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (paste) {
      setTitle(paste.title || '');
      setContent(paste.content || '');
      setIsEditing(false); // Reset edit mode when paste changes
    }
  }, [paste, id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (paste) {
      const updatedPaste = {
        ...paste,
        title: title.trim(),
        content: content.trim(),
        createAt: paste.createAt || new Date().toISOString()
      };
      dispatch(updateToPaste(updatedPaste));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (paste) {
      setTitle(paste.title || '');
      setContent(paste.content || '');
    }
    setIsEditing(false);
  };

  if (!paste) {
    return <div>Paste not found</div>;
  }

  return (
   <div>
        <div className='flex flex-row gap-7 items-center'>
        <input
        className='p-2 rounded-md mt-4 border-2 border-gray-300 w-[80%]'     
         type="text" 
        placeholder="title" 
        value={title}
        disabled={!isEditing}
         onChange={(e) => setTitle(e.target.value)} />
        
        {!isEditing ? (
          <button 
            onClick={handleEdit}
            className='px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600'
          >
            Edit
          </button>
        ) : (
          <div className='flex gap-2 mt-4'>
            <button 
              onClick={handleSave}
              className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600'
            >
              Cancel
            </button>
          </div>
        )}
         </div>
         <div>
            <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='p-2 rounded-md mt-6 border-2 border-gray-300 w-full '
            placeholder="content"
            disabled={!isEditing}
            rows={20}
            />
         </div>
    </div>
  )
}
