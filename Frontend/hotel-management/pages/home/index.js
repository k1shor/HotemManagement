import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../api/userAPI";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function checkUser() {
      await isAuthenticated().then((data) => setUserDetails(data));
    }

    checkUser();
  }, []);

  if (userDetails?.user?.role === 1) {
    router.push("/admin");
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <h1 className="text-6xl font-bold">Welcome to the home page</h1>
    </div>
  );
};

export default Home;
