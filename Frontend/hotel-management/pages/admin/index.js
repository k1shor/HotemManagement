import React, { useEffect, useState } from "react";
import { authenticate, isAuthenticated } from "../api/userAPI";
import { useRouter } from "next/router";
import { deleteHotelAPI, getAllHotelsAPI } from "../api/hotelAPI";
import toast from "react-hot-toast";

const Admin = () => {
  // let result = authenticate();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getAllHotelsAPI().then((data) => {
      setHotels(data.hotels);
    });
  }, [hotels]);
  console.log(hotels, "hotels admin");
  const router = useRouter();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function getUserDetail() {
      await isAuthenticated().then((data) => setUserDetails(data));
    }
    getUserDetail();
  }, []);

  // if (!userDetails) {
  //   router.push("/login");
  // }
  if (userDetails?.user?.role === 0) {
    router.push("/home");
  }
  if (userDetails == false) {
    router.push("/login");
  }

  //

  const handleHotelDelete = async (id) => {
    console.log(id, "id");

    await deleteHotelAPI(id).then((data) => {
      console.log(data, "data");
      toast.success(data.message);
    });
  };

  return (
    <div className="container max-w-6xl mx-auto mt-10">
      <button className="bg-orange-500 px-4 py-2 font-bold text-xl rounded-xl text-white hover:bg-orange-600">
        <a href="/admin/addHotel">Add Hotel</a>
      </button>

      <p className="text-xl my-10 font-bold">All Hotels</p>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Hotel name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => {
              return (
                <tr key={hotel._id} className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {hotel.hotelName}
                  </th>
                  <td className="px-6 py-4">{hotel.address}</td>
                  <td className="px-6 py-4">{hotel.category}</td>
                  <td className="px-6 py-4">{hotel.price}</td>
                  <td className="px-6 py-4 flex justify-between items-center">
                    <button
                      className="font-medium text-blue-600  hover:underline"
                      // className="font-medium text-blue-600 hover:underline"
                    >
                      <a href={`/admin/editHotel/${hotel._id}`}> Edit</a>
                    </button>
                    <button
                      onClick={() => handleHotelDelete(hotel._id)}
                      className="font-medium text-white px-2 py-1 bg-red-600 rounded-xl  hover:underline"
                    >
                      Delete
                    </button>
                    <a
                      href="#"
                      className="font-medium text-green-600  hover:underline"
                    >
                      Add Rooms
                    </a>
                  </td>
                </tr>
              );
            })}

            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600  hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;

// introduction to programming and programming langau ges
///
