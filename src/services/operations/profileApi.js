import toast from "react-hot-toast";
import { profileEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../redux/slices/profileSlice";
import { logout } from "./authAPI";
import { setLoading } from "../../redux/slices/authSlice";


const { 
    GET_USER_DETAILS_API, 
    GET_USER_ENROLLED_COURSES_API, 
    GET_INSTRUCTOR_DATA_API 
} = profileEndpoints


export function getUserDetails (token, navigate) { 
    return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading (true))
        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_API, {token}, {Authorization: `Bearer ${token}`})
            console.log("GET_USER_DETAILS_API RESPONSE........", response);

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            const userImage = response.data.data.image
                ? response.data.data.image
                : `https://api.dicebear.com/5.x/initials/svg?=seed=${response.data.data.firstName} ${response.data.data.lastName}`
            dispatch(setUser({ ...response.data.data, image: userImage }))
            } catch (error) {
                dispatch(logout(navigate))
            console.log("GET_USER_DETAILS_API ERROR........", error);
            toast.error("Could not GET USER DETAILS")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export async function getUserEnrolledCourses(token) {
    let result = []
    try {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, {token}, {Authorization: `Bearer ${token}`})
        console.log("GET_USER_ENROLLED_COURSES_API RESPONSE........", response);

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API ERROR........", error);
        toast.error("Could not GET ENROLLED COURSES")
    }
}


export async function getInstructorData(token) {
    let result = []
    try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, { 
        Authorization: `Bearer ${token}`,
    })
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE..........", response) 
    result = response?.data?.courses
    } catch (error) { I
    
    console.log("GET_INSTRUCTOR_DATA_API API ERROR..........", error)
    toast.error("Could Not Get Instructor Data")
    }
    return result
}