import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/userAPI";

const index = () => {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((data) => {
      //   if (data.error) {
      //     console.log(data.error);
      //   } else {
      console.log(data);
      return setUsers(data);
      //   }
    });
  }, []);
  return (
    <>
      <h1>Hello Profile</h1>
      {users.length > 0 &&
        users.map((user, index) => {
          return <div key={index}>{user.name}</div>;
        })}
    </>
  );
};

export default index;
