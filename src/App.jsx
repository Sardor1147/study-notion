import { Routes, Route } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import HomePage from "./pages/HomePage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import CourseDetails from "./pages/CourseDetails"
import OpenRoute from "./components/core/Auth/OpenRoute"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import VerifyEmail from "./pages/VerifyEmail"
import MyProfile from "./components/core/Dashboard/MyProfile"
import ForgotPassword from "./pages/ForgotPassword"
import ProtectedRoute from "./components/core/Auth/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import UpdatePassword from "./pages/UpdatePassword"
import Settings from "./components/core/Dashboard/Settings/Settings"
import { useSelector } from "react-redux"
import { ACCOUNT_TYPE } from "./utils/constants"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import Cart from "./components/core/Dashboard/cart/Cart"
import PageNotFound from "./pages/PageNotFound"
import ViewCourse from "./pages/ViewCourse"
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import CatalogPage from "./pages/CatalogPage"

function App() {
  const {user} = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route path="catalog/:catalogName" element={<CatalogPage />} />

          <Route path="signup" element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }/>

          <Route path="login" element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }/>

          <Route path="/forgot-password" element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          } />


          <Route path="verify-email" element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }/>

          <Route path="update-password/:id" element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }/>

          <Route element={
            <ProtectedRoute>
              <Dashboard/>
          </ProtectedRoute>
          }>
            <Route path="dashboard/my-profile" element={<MyProfile/>}></Route>
            <Route path="dashboard/settings" element={<Settings/>}></Route>

            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />}/>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
              </>
            )}
          </Route>

            <Route
              element={
                <ProtectedRoute>
                  <ViewCourse/>
                </ProtectedRoute>
              }
            >
              {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
              )}
            </Route>

            <Route path="*" element={<PageNotFound />}/>
        </Routes>
    </div>
  )
}

export default App