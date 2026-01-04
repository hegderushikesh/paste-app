import React, { use, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeToPaste } from '../redux/pasteredux';
import toast from 'react-hot-toast';

export default function Paste() {
  const [searchTerm, setSearchTerm] = useState('');
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const filterData = pastes.filter(paste => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(id) {
    dispatch(removeToPaste(id))

  }

  return (
    <div>
      <input
        className='p-2 rounded-2xl mt-4 border-2 border-gray-300 w-[80%]'
        type="text"
        placeholder="Search paste"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5'>
        {
          filterData.length > 0 &&
          filterData.map((paste) =>
          (
            <div key={paste.id} className='border-2 border-gray-300 rounded-md p-4'>
              <div className='font-bold text-start text-lg mb-2'>
                {paste.title}
              </div>
              <div className='text-start text-gray-700'>
                {paste.content}
              </div>
              <div className='flex flex-row gap-4 place-content-evenly'>
                <button>
                  <a href={`/?pasteId=${paste.id}`}>Edit</a>

                </button>
                <button
                >
                  <a href={`/paste/${paste.id}`}>
                  View</a>
              </button>
                <button onClick={() => handleDelete(paste.id)}>Delete</button>
                <button onClick={() => {
                  navigator.clipboard.writeText(paste.content)
                  toast.success("copied sucessfully")
                }}>copy</button>
                <button 
                >Share</button>

              </div>
              <div>
                Created At: {new Date(paste.createAt).toLocaleString()}
              </div>

            </div>

          ))}
      </div>

    </div>
  )
}
