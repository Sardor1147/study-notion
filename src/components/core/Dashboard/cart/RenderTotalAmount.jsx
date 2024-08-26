import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";


export default function() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { total, cart } = useSelector((state) => state.cart)

    const handleBuyCourse = async () => {
        const courses = cart.map((courses) => courses._id)
        await buyCourse(dispatch, navigate, token, user, courses)
    }

    return(
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">Total: </p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">$ {total}</p>
            <IconBtn 
                text="Buy Now"
                onclick={handleBuyCourse}
                customClasses="w-full justify-center"
            /> 
        </div>
    )
}