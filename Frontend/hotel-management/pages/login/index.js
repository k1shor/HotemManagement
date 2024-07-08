import React, { useEffect, useState } from "react";
import { authenticate, isAuthenticated, loginUserApi } from "../api/userAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
// import { setCredentials } from "@/reduxStore/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  console.log(userDetails, "USER DETAILS");
  // if (userDetails?.user?.role === 1) {
  //   router.push("/admin");
  // }

  // if (userDetails?.user?.role === 0) {
  //   router.push("/");
  // }

  useEffect(() => {
    isAuthenticated().then((data) => {
      setUserDetails(data);
    });
  }, []);

  const handleInputChange = (e) => {
    // setUserData({ ...userData, [e.target.name]: e.target.value });
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const loginUser = (e) => {
    e.preventDefault();
    console.log("user logged in");
    // dispatch(setCredentials(userData));
    loginUserApi(userData)
      .then((data) => {
        if (data.error) {
          console.log(data.error, "Error in login");
          toast.error(data.error);
        } else {
          authenticate(data);
          isAuthenticated().then((data) => {
            if (data.user.role == 1) {
              router.push("/admin/");
            } else {
              router.push("/home");
            }
          });

          toast.success("Login success");
          router.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (userDetails) {
  //   router.push("/home");
  // }
  return (
    <div>
      <section className=" h-screen ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Login
              </h1>
              <form
                // onSubmit={loginUser}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     "
                    placeholder="name@company.com"
                    required=""
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     "
                    required=""
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  onClick={loginUser}
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="font-medium text-blue-900 hover:underline "
                  >
                    Register Here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
