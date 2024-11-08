import { createSlice } from '@reduxjs/toolkit'
import { clearLocalStorage, getItemLocalStorage, persistInLocalStorage } from '../../utils/localStorage'

const initialState = {
    id: null,
    nombre: '',
    apellido: '',
    email: '',
    role: ''
}

export const KEY_USER = 'user'

const userSlice = createSlice({
    name: 'user',
    initialState: getItemLocalStorage(KEY_USER) ?
        JSON.parse(getItemLocalStorage(KEY_USER)) : initialState,
    reducers: {
        createUser: (state, action) => {
            persistInLocalStorage(KEY_USER, action.payload)              
            return action.payload
        },
        updateUser: (state, action) => {
            const result = { ...state, ...action.payload }                        
            persistInLocalStorage(KEY_USER, result)
            return result
        },
        resetUser: () => {
            clearLocalStorage(KEY_USER)
            return initialState
        }
    }
})

export const { createUser, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;