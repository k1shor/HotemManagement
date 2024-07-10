export const addHotelAPI = (hotel) => {
  // return fetch(`${process.env.BACKEND_URL}/product/auth/register`, {
  return fetch(`http://localhost:4000/api/v1/hotels`, {
    method: "POST",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "multipart/form-data",
    },
 
    body: hotel,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllHotelsAPI = () => {
  return fetch(`http://localhost:4000/api/v1/hotels`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getHotelByIdAPI = (id) => {
  return fetch(`http://localhost:4000/api/v1/hotels/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteHotelAPI = (id) => {
  return fetch(`http://localhost:4000/api/v1/hotels/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
