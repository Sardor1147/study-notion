import { loadStripe } from "@stripe/stripe-js";
import { studentEndpoints } from "../api";
import { setPaymentLoading } from "../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import { resetCart } from "../../redux/slices/cartSlice";
import { CardElement } from "@stripe/react-stripe-js";
import { apiConnector } from "../apiConnector";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCES_EMAIL_API
} = studentEndpoints

const stripePromise = loadStripe(
    import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY
)


export async function buyCourse(dispatch, navigate, token, userDetails, stripe, coursesId) {
    const toastId = toast.loading("Loading...")
    
    try {
        const session = await apiConnector("POST", COURSE_PAYMENT_API,
            {coursesId},
            {
            Authorization: `Bearer ${token}`
            }
        );
        console.log("orderResponse........", session);

            if(!session.data.success) {
                throw new Error(session.data.message)
            }

            const sessionId = session.data

            const response = await stripe.redirectToCheckout({
                sessionId: sessionId,
            });
            console.log("response...", response);
            if(response.error) {
                toast.error("Payment failed");
                console.log("Payment failed: ", response.error);
            } else{
                sendPaymentSuccessEmail(session.data, token);

                verifyPayment(
                    {sessionId: session.data.sessionId, coursesId},
                    dispatch, 
                    navigate, 
                    token
                )
            }

        } catch (error) {
        console.log("PAYMENT API ERROR........", error);
        toast.error(error.response?.data?.message || "Could not make payment")
        }
        toast.dismiss(toastId)
    }

export async function sendPaymentSuccessEmail(response, token) {
    try {
        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCES_EMAIL_API,
            {
                orderId: response.orderId,
                paymentId: response.paymentIntentId,
                amount: response.amount
            },
            {
                Authorization: `Bearer ${token}`
            }
        );
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR........", error);
    }
}

export async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true));

    try {
        const session = await apiConnector("POST", COURSE_PAYMENT_API,
            {
            Authorization: `Bearer ${token}`
            }
        );

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Payment successfull, you are added to the couorses");
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR........", error);
        toast.error("Could not verify payment")
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false))
}