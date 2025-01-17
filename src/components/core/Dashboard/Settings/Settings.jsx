import React from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

export default function Settings() {
    return(
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
                Edit profile
            </h1>
            <ChangeProfilePicture/>
            <EditProfile/>
            <UpdatePassword/>
            <DeleteAccount/>
        </>
    )
}