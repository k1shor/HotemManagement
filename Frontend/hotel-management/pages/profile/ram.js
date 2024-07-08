import React, { useEffect } from "react";

const ram = () => {
  useEffect(() => {
    console.log("hello");
    let token = localStorage.getItem("token");
    console.log(token);
  }, []);

  return <div>ram</div>;
};

export default ram;
