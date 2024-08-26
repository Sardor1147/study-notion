import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../services/operations/profileApi";
import Img from "../../common/Img";
import {ProgressBar} from "@ramonak/react-progress-bar"

export default function EnrolledCourses() {
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [ enrolledCourses, setEnrolledCourses ] = useState(null)

    const getEnrolledCourses = async () => {
        try {
            const res = await getUserEnrolledCourses(token);
            setEnrolledCourses(res)
        } catch (error) {
            console.log("Could not fetch user enrolled courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, [])

    const sklItem = () => {
        return(
            <div className="flex border border-richblack-700 px-5 py-3 w-full">
                <div className="flex flex-1 gap-x-4">
                    <div className="h-14 w-14 rounded-lg skeleton"></div>

                    <div className="flex flex-col w-2/5">
                        <p className="h-2 w-1/2 rounded-xl skeleton"></p>
                        <p className="h-2 w-1/2 rounded-xl skeleton mt-3"></p>
                    </div>
                </div>

                <div className="flex flex-col flex-[0.4]">
                    <p className="h-2 w-1/5 rounded-xl mt-2 skeleton"></p>
                    <p className="h-2 w-2/5 rounded-xl skeleton mt-3"></p>
                </div>
            </div>
        )
    }

    if(enrolledCourses?.length == 0) {
        return(
            <p className="grid h-[50vh] w-full place-content-center text-center text-richblack-5 text-3xl">
                You have not enrolled in any course yet.
            </p>
        )
    }

    return(
        <>
            <div className=" text-4xl text-richblack-5 font-boogaloo text-center sm:text-left">Enrolled Courses</div>
            {
                <div className="my-8 text-richblack-5">
                    <div className="flex rounded-t-2xl bg-richblack-800">
                        <p className="w-[45%] px-5 py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-3">Duration</p>
                        <p className="px-2 py-3 flex-1">Progress</p>
                    </div>

                    {!enrolledCourses && <div>
                        {sklItem()}    
                        {sklItem()}    
                        {sklItem()}    
                        {sklItem()}    
                        {sklItem()}    
                    </div>}

                    {
                        enrolledCourses?.map((course, i, arr) => (
                            <div
                                className={`flex flex-col sm:flex-row sm:items-center border border-richblack-700
                                ${i === arr.length - 1 ? "rounded-b-2xl" : "rounded-none"}`}
                                key={i}
                            >
                                <div
                                    className="flex sm:w-[45%] cursor-pointer items-center gap-4 py-3"
                                    onClick={() => {
                                        navigate(`
                                            /view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}    
                                        `)
                                    }}
                                >
                                    <Img
                                        src={course.thumbnail}
                                        alt="course_img"
                                        className="h-14 w-14 rounded-lg object-cover"
                                    />

                                    <div className="flex max-w-xs flex-col gap-2">
                                        <p className=" font-semibold">{course.courseName}</p>
                                        <p className=" text-xs text-richblack-300">
                                            {course.courseDescription.length > 50
                                            ? `${course.courseDescription.slice(0, 50)}...`
                                            : course.courseDescription}
                                        </p>
                                    </div>
                                </div>

                                <div className="sm:hidden">
                                    <div className=" px-2 py-3">{course?.totalDuration}</div>

                                    <div className="flex sm:w-2/5 flex-col px-2 py-3 gap-2">
                                        <p>Progress: {course.progressPercentage || 0}%</p>
                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible={false}
                                        />
                                    </div>
                                </div>

                                <div className="hidden w-1/5 sm:flex px-2 py-3">{course?.totalDuration}</div>
                                <div className="hidden w-1/5 sm:flex gap-2 px-2 py-3">
                                    <p>Progress: {course.progressPercentage || 0}%</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </>
    )
}