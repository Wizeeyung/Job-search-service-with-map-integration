import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  appliedJobData: [],
  jobData: [],
  userInfo: null, 
  userSignUpInfo: null,
  userEmail: null
}

export const cartJobSlice = createSlice({
  name: 'cartJobs',
  initialState,
  reducers: {
    addToFavorites: (state, action)=>{
      const items = state.jobData.find((job)=>(
        job.id === action.payload.id
      ))

      if(!items){
        state.jobData.push({...action.payload})
       
      
        
      }else{
        state.jobData = state.jobData.filter((job)=> job.id !== action.payload.id)
        
      }
    },

    addToAppliedJobs: (state, action) => {
      const items = state.appliedJobData.find((job)=> (
        job.id === action.payload.id
      ))
      if(!items){
        state.appliedJobData.push({...action.payload})}
        
        
        
    },

    
    removeJobs: (state, action) =>{
      state.jobData = state.jobData.filter((job)=> (job.id !== action.payload))
    },

    clearJobs: (state)=>{
      state.jobData = []
      state.appliedJobData = []
    },

    addUser: (state, action)=>{
      state.userInfo = action.payload
    },

    removeUser: (state)=>{
      state.userInfo = null
      state.userSignUpInfo = null
    }, 

    adduserSignUpInfo: (state, action)=>{
      state.userSignUpInfo = action.payload
    },

    setActiveUser: (state, action)=>{
      state.userName = action.payload.userName
      state.userEmail = action.payload.userEmail
    },

    setUserLogOut: state => {
      state.userName = null
      state.userEmail = null
    }

  }
});

export const {addToFavorites,addToAppliedJobs, toggleLike, toggleApply ,adduserSignUpInfo, setActiveUser, setUserLogOut ,removeJobs, clearJobs, addUser, removeUser} = cartJobSlice.actions;
export const selectUserName = state => state.cartJobs.userName
export const selectUserEmail = state => state.cartJobs.userEmail
export default cartJobSlice.reducer;