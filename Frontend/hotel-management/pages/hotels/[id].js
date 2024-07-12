import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getHotelByIdAPI } from "../api/hotelAPI";

const SingleHotel = () => {
  const id = useParams()?.id;
  console.log(id, "hotel id page");
  const [hotel, setHotel] = useState({});

  const rooms = hotel?.rooms;

  useEffect(() => {
    async function getHotel() {
      await getHotelByIdAPI(id).then((data) => {
        setHotel(data.hotel);
      });
    }
    getHotel();
  }, [id]);

  console.log(hotel, "hotel ada");

  const filePath = hotel?.image;

  const fileName = filePath?.split("/").pop();

  return (
    <div>
      
      {/* <div>

    <p>{id}</p>
      <h1 className="text-4xl font-bold "> {hotel?.hotelName}</h1>
      <p> Address: {hotel?.address}</p>
      <p> Description: {hotel?.description}</p>
      <p> Phone: {hotel?.phone}</p>

      <p> Category: {hotel?.category}</p>

      <h3 className="text-2xl">Rooms</h3>
      <p>Number Of Rooms: {rooms?.length} </p>
      <p> Room Number: {rooms?.map((room) => room.roomNumber)}</p>
    </div> */}



      <div className="container max-w-6xl mx-auto px-3">
        <img
          // src={hotel?.image}
          src={`/images/uploads/${fileName}`}
          alt="hotel"
          className="w-full h-96 object-cover"
        />

        <div className="bg-gray-300 flex justify-between items-center px-4 py-2 mb-5">
          <p className="font-bold bg-orange-500 px-4 py-2 rounded-xl text-white">
            {hotel?.category} <span className="font-light">

            Hotel
            </span>
          </p>{" "}
          <p>
            <span className="font-bold">Phone:</span> {hotel?.phone}
          </p>
          <p>Number Of Rooms: {rooms?.length} </p>
          <p> Room Number: {rooms?.map((room) => room.roomNumber)}</p>
        </div>

        {/*  */}
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold">
              {" "}
              Address:{" "}
              <span className="text-gray-500 font-medium">
                {hotel?.address}
              </span>
            </p>
            <h1 className="text-4xl font-bold my-10"> {hotel?.hotelName}</h1>

            <h1 className="text-2xl font-bold mt-5"> Description</h1>
            <div dangerouslySetInnerHTML={{ __html: hotel?.description }} />
          </div>

          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all">
              Book Now
            </button>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default SingleHotel;
