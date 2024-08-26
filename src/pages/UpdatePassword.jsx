import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

export default function UpdatePassword() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const {loading} = useSelector((state) => state.auth)

    const { formData, setFormData } = useState({
        password:"",
        confirmPassword:""
    })
    const {showPassword, setShowPassword} = useState(false)
    const {showConfirmPassword, setShowConfirmPassword} = useState(false)

    const {password, confirmPassword} = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const token = location.pathname.split("/".at(-1))
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }

    return(
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-3xl font-semibold leading-[2.375rem] text-richblack-5">
                        Choose a new password
                    </h1>
                    <p className="my-4 text-lg leading-relaxed text-richblack-100">
                        Almost done. Enter your new password and you're all set
                    </p>

            <form onSubmit={handleOnSubmit}>
                <label className='relative'>
                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        New Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                        required
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={password}
                        onChange={handleOnChange}
                        placeholder='Enter Password'
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none'
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                    >
                        {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                        ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                        )}
                    </span>
                </label>

                <label className='relative'>
                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        Confirm Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                        required
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder='Confirm Password'
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none'
                    />
                    <span
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                    >
                        {showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                        ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                        )}
                    </span>
                </label>

                <button 
                    type="submit" 
                    className="mt-6 w-full rounded-lg bg-yellow-50 py-3 px-3 font-medium text-richblack-900">
                    Reset password
                </button>
            </form>

            <div className="mt-6 flex items-center justify-between">
                <Link to="/login">
                <p className="flex items-center gap-x-2 text-richblack-5">
                    <BiArrowBack/> Back to login
                </p>
                </Link>
            </div>
                </div>
            )}
        </div>
    )
}