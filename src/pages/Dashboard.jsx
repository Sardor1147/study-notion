import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import Loading from "../components/common/Loading";
import SideBar from "../components/core/Dashboard/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    const { loading: authLoading } = useSelector(state => state.auth)
    const { loading: profileLoading } = useSelector(state => state.profile)

    if(profileLoading || authLoading) {
        return(
            <div className="mt-10">
                <Loading/>
            </div>
        )
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return(
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">

                <SideBar/>
            <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard