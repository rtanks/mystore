import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface LoginState {
    userId: string;
}
const initialState: LoginState = {
    userId: '',
}
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers :{
        getUserId: (state, action: PayloadAction<{ id: string }>) => {
            state.userId = action.payload.id
            
        }
    }
})
export const {getUserId} = loginSlice.actions;

export default loginSlice.reducer