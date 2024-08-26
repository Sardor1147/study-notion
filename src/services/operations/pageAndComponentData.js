import { setAllCourses, setPopularCourses, setTopEnrollCourses } from "../../redux/slices/courseSlice"
import { catalogData } from "../api"
import { apiConnector } from "../apiConnector"


export const getCatalogPageData = async (dispatch) => {
    try {
        const response = await apiConnector("GET", catalogData.POPULAR_COURSES_API)

        dispatch(setPopularCourses(response?.data?.data))
    } catch (error) {
        console.log("CATALOG PAGE DATA API ERROR....", error);
        throw new Error("could not fetch catalog page fata")
        
    }
}

export const getTopEnrollCoursesSlice = async (dispatch) => {
    try {
        const response = await apiConnector("GET", catalogData.TOP_ENROLL_COURSES_API)

        dispatch(setTopEnrollCourses(response?.data?.data))
    } catch (error) {
        console.log("TOP ENROLL COURSES API ERROR....", error);        
    }
}

export const getAllCourses = async (dispatch) => {
    const response = await apiConnector("GET", catalogData.ALL_COURSES_API)
    dispatch(setAllCourses(response?.data?.data))
}