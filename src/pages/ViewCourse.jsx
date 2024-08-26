import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../redux/slices/viewCourseSlice";
import { setCourseViewSidebar } from "../redux/slices/sidebarSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";


export default function ViewCourse() {
    const courseId = useParams()
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [ reviewModal, setReviewModal ] = useState(false)

    useEffect(() => {
        ; (async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token)

            dispatch(setCourseSectionData(courseData.CourseDetails.courseContent))
            dispatch(setEntireCourseData(courseData.CourseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos))
            let lectures = 0;
            courseData?.CourseDetails?.courseContent.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        })()
    }, [])

    const {courseViewSidebar} = useSelector(state => state.sidebar)
    const [screenSize, setScreenSize] = useState(undefined)
    
    useEffect(() => {
        const handleScreenSize = () => setScreenSize(window.innerWidth)

        window.addEventListener("resize", handleScreenSize);
        handleScreenSize();
        return () => window.removeEventListener("resize", handleScreenSize)
    })

    useEffect(() => {
        if(screenSize <= 640 ) {
            dispatch(setCourseViewSidebar(false))
        } else dispatch(setCourseViewSidebar(true))
    }, [screenSize])


    return(
        <>
            <div className="relative flex min-h-[calc(100vh-3.5rem)]">
                {courseViewSidebar && <VideoDetailsSidebar setReviewModal={setReviewModal}/>}

                <div className="flex-1 overflow-auto mt-14 h-[calc(100vh-3.5rem)]">
                    <div className="mx-6">
                        <Outlet/>
                    </div>
                </div>
            </div>

            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
        </>
    )
}