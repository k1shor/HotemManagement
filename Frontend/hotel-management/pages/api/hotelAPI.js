// export const addHotelAPI = (hotel) => {
//   console.log(hotel, 'api hotelllll')
//   // return fetch(`${process.env.BACKEND_URL}/product/auth/register`, {
//   return fetch(`http://localhost:4000/api/v1/hotels`, {
//     method: "POST",
//     headers: {
//       // "Accept": "application/json",
//       // "Content-Type": "application/json",
//     },
 
//     body: JSON.stringify(hotel),

//   })
//     .then((response) => {


//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

export const addHotelAPI = (formData) => {
  console.log(formData, 'api hotelllll');
  return fetch(`http://localhost:4000/api/v1/hotels`, {
    method: "POST",
    // No need to set headers for FormData; the browser does it automatically
    body: formData,
  })
    .then((response) => response.json())
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
