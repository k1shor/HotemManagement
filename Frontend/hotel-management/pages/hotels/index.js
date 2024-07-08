import React, { useEffect, useState } from "react";
import { getAllHotelsAPI } from "../api/hotelAPI";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function getAllHotel() {
      await getAllHotelsAPI().then((data) => {
        setHotels(data.hotels);
      });
    }

    getAllHotel();
  }, []);
  console.log(hotels, "hotels");
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          All Hotels
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {hotels.map((hotel) => {
            console.log(hotel._id, "hotel page");
            const hotelId = hotel._id;
            return (
              <div key={hotel._id} className="group relative">
                <a href={`/hotels/${hotelId}`}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      alt={hotel.imageAlt}
                      // src={hotel.imageSrc}
                      src="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg  text-gray-700 ">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {hotel.hotelName}
                      </h3>
                      <h3>
                        <p className="text-sm font-medium text-gray-500">
                          {hotel.address}
                        </p>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-white bg-orange-500 rounded-xl px-2 py-1">
                      {hotel.category}
                    </p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    // <div className="container max-w-6xl mx-auto my-4">
    //   <h1>Hotels</h1>
    //   <div>
    //     {hotels.map((hotel) => (
    //       <div key={hotel._id}>
    //         <h1 className="text-xl font-bold">{hotel.hotelName}</h1>
    //         <p>{hotel.description}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Hotels;
