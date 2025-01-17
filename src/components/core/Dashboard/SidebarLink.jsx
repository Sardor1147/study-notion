import * as Icons from "react-icons/vsc"
import React from "react";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState } from "../../../redux/slices/courseSlice";
import PropTypes from "prop-types"
import { setOpenSideMenu } from "../../../redux/slices/sidebarSlice";
export default function SidebarLink(link, iconName) {
    const Icon = Icons[iconName]
    const location = useLocation()
    const dispatch = useDispatch()
    const { openSideMenu, screenSize } = useSelector(state => state.sidebar)

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname)
    }

    const handleClick = () => {
        dispatch(resetCourseState())
        if(openSideMenu && screenSize <= 640) dispatch(setOpenSideMenu(false))
    }

    return(
        <NavLink
            to={link.path}
            onClick={handleClick}
            className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)
            ? "bg-yellow-800 text-yellow-50" 
            : "text-richblack-300 hover:bg-richblack-700 duration-200"
            } transition-all`}
        >
            <span
                className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
            >
            </span>

            <div className="flex items-center gap-x-2">
                <Icon className="text-lg"/>
                <span>{link.name}</span>
            </div>
        </NavLink>
    )
}

SidebarLink.propTypes = {
    link: PropTypes.object.isRequired,
    iconName: PropTypes.string.isRequired
}