import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    pastes:localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : []
  },
  reducers: {
    addToPaste: (state, action) => {
      const newPaste = action.payload;
      state.pastes.push(newPaste);
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
     toast.success("Paste added successfully!");
    },
    updateToPaste: (state, action) => {
      const newPaste = action.payload;
      const index = state.pastes.findIndex(paste => paste.id === newPaste.id);
      if (index !== -1) {
        state.pastes[index] = newPaste;
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success("Paste updated successfully!");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
    },
    removeToPaste: (state, action) => {
    const id = action.payload;
    state.pastes = state.pastes.filter(paste => paste.id !== id);
    localStorage.setItem('pastes', JSON.stringify(state.pastes));
    toast.success("Paste removed successfully!");
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPastes, removeToPaste } = pasteSlice.actions

export default pasteSlice.reducer