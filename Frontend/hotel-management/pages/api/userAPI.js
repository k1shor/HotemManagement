export const registerUserApi = (user) => {
  // return fetch(`${process.env.BACKEND_URL}/user/auth/register`, {
  return fetch(`http://localhost:4000/api/v1/user/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(data));
  }
};

export const loginUserApi = (user) => {
  return fetch(`http://localhost:4000/api/v1/user/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      // console.log(response, " login resopne");
      // localStorage.setItem("token", response.token);

      return response.json();
    })
    .catch((err) => console.log(err));
};

export const isAuthenticated = async () => {
  return localStorage.getItem("token")
    ? await JSON.parse(localStorage.getItem("token"))
    : false;
};

export const getAllUsers = () => {
  return fetch(`http://localhost:4000/api/v1/user`)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getSingleUser = () => {
  return fetch(`http://localhost:4000/api/v1/user/${id}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
