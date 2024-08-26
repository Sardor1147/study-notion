import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const dispatch = useDispatch()
    const {loading} = useSelector((state) => state.auth)

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        dispatch(getPasswordResetToken(email, setEmailSent))
    }


    return(
        <div className="grid min-h-[calc(100vh-3,5rem)] place-items-center">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        {!emailSent ? "Reset your password" : "Check email"}
                    </h1>
                    <div className="my-4 text-lg leading-[1.625rem] text-richblack-100">
                        {!emailSent ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try accout recovery"
                        : <p>We have sent the reset email to <span className=" text-yellow-100">{email}</span></p>
                        }
                    </div>

                    <form onSubmit={handleOnSubmit}>
                        { !emailSent && (
                            <label className="w-full">
                                <p className="mb-1 text-sm leading-[1.375rem] text-richblack-5">
                                    Email address <sup className="text-pink-200">*</sup>
                                </p>
                                <input 
                                required
                                type="email" 
                                name="email"
                                value={email}
                                onChange={(e) =>setEmail(e.target.value)}
                                placeholder="Enter Email Adress"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
                                />
                            </label>
                        ) }

                        <button type="submit"
                        className="mt-6 w-full rounded-lg bg-yellow-50 py-3 px-3 font-medium text-richblack-900"
                        >
                            {!emailSent ? "Submit" : "Resend email"}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                        <p className="flex items-center gap-x-2 text-richblack-5">
                          ← Back to login
                        </p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}