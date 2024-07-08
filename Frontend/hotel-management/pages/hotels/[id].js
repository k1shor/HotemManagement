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
  return (
    <div className="container max-w-6xl mx-auto">
      <p>{id}</p>
      <h1 className="text-4xl font-bold "> {hotel?.hotelName}</h1>
      <p> Address: {hotel?.address}</p>
      <p> Description: {hotel?.description}</p>
      <p> Phone: {hotel?.phone}</p>

      <p> Category: {hotel?.category}</p>

      <h3 className="text-2xl">Rooms</h3>
      <p>Number Of Rooms: {rooms?.length} </p>
      <p> Room Number: {rooms?.map((room) => room.roomNumber)}</p>
    </div>
  );
};

export default SingleHotel;
