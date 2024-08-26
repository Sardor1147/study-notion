import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step:1,
    course:null,
    popularCourses:[],
    topEnrollCourses:[],
    allCourses:[],
    editCourse:false,
    paymentLoading:false
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setStep:(state, action) => {
            state.step = action.payload
        },
        setCourse:(state, action) => {
            state.course = action.payload
        },
        setEditCourse:(state, action) => {
            state.editCourse = action.payload
        },
        setPaymentLoading:(state, action) => {
            state.paymentLoading = action.payload
        },
        resetCourseState: (state) => {
            state.step = 1,
            state.course = null,
            state.editCourse = false
        },
        setPopularCourses:(state, action) => {
            state.popularCourses = action.payload
        },
        setTopEnrollCourses:(state, action) => {
            state.topEnrollCourses = action.payload
        },

        setAllCourses: (state, action) => {
            state.allCourses = action.payload
        }
    }
})

export const {
    setStep,
    setAllCourses,
    setTopEnrollCourses,
    setCourse,
    setEditCourse,
    setPopularCourses,
    resetCourseState,
    setPaymentLoading,
} = courseSlice.actions

export default courseSlice.reducer