import {createSlice} from '@reduxjs/toolkit'

const initialState= {
    status: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        LogIn: (state, action)=> {
            state.status = true,
            state.user = action.payload.user
            console.log(`user information ${state.userData}`)
        },
        logout: (state)=> {
            state.status = false,
            state.user = null
        }
    }
})

export const {LogIn, logout} = authSlice.actions
export default authSlice.reducer