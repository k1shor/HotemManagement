import { addHotelAPI } from "@/pages/api/hotelAPI";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const addHotelForm = () => {
  const editorRef = useRef(null);

  const [hotelImage, setHotelImage] = useState("");
  const [description, setDescription] = useState("");
  // const [editorDescription, setEditorDescription] = useState("");
  let editorDescription = "";

  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState(new FormData());

  // if (editorRef.current) {
  //   // console.log(editorRef.current.getContent());
  //   // console.log('valie')

  //   setEditorDescription(editorRef.current.getContent());
  // }
  // const handleChange = (e) => {

  //   setHotelName(e.target.value);
  //   setAddress(e.target.value);
  //   setPhone(e.target.value);
  //   setCategory(e.target.value);

  //   // const { name, value, files } = e.target;

  //   // if (e.target.name === "image") {
  //   //   formData.set("image", e.target.files[0]);
  //   // } else {
  //   //   setHotelDetails({ ...hotelDetails, [e.target.name]: e.target.value });
  //   //   formData.set(e.target.name, e.target.value);
  //   // }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log(hotelName, "hotel name");
  //   const hotelDetails = {
  //     hotelName: hotelName,
  //     address: address,
  //     phone: phone,
  //     category: category,
  //     formData: formData,
  //     description: editorDescription,
  //     image: hotelImage,
  //   };

  //   console.log(hotelDetails, "editor description");

  //   addHotelAPI(hotelDetails).then((data) => {
  //     console.log(hotelDetails, 'api hotel details')
  //     if (data) {
  //       toast.success("Hotel added successfully");
  //     } else {
  //       toast.error("Failed to add hotel");
  //       console.log("Error while adding hotels");
  //       // setHotelDetails({
  //       //   hotelName: "",
  //       //   description: "",
  //       //   address: "",
  //       //   phone: "",
  //       //   category: "",
  //       //   formData: new FormData(),
  //       // });
  //     }
  //   });

  //   console.log(formData, "form dataaaa");
  // };

  // console.log(hotelDetails, "hotelDetails");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setHotelImage(files[0]);
    } else {
      switch (name) {
        case "hotelName":
          setHotelName(value);
          break;
        case "address":
          setAddress(value);
          break;
        case "phone":
          setPhone(value);
          break;
        case "category":
          setCategory(value);
          break;
        default:
          break;
      }
    }
  };

  console.log(editorDescription, "description");

 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
      // console.log('valie')
  
      editorDescription = editorRef.current.getContent();
    }

    // console.log(editorDescription, 'description')

    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("category", category);
    formData.append("description", editorDescription);



    if (hotelImage) {
      formData.append("image", hotelImage);
    }

    console.log(formData, "form dataaaa");

    addHotelAPI(formData).then((data) => {
      if (data) {
        toast.success("Hotel added successfully");
      } else {
        toast.error("Failed to add hotel");
        console.log("Error while adding hotels");
      }
    });
  };

  return (
    <div>
      <div>{description}</div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Hotels
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="/upload"
            method="POST"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              type="file"
              name="image"
              id="file"
              // onChange={(e) => setHotelImage(e.target.files[0])}
              // onChange={uploadFileHandler}
              // onChange={(e) => setHotelImage(e.target.files[0]) }
              onChange={handleInputChange}
            />
            <div>
              <label
                htmlFor="hotelName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Hotel Name
              </label>
              <div className="mt-2">
                <input
                  // onChange={(e) => setHotelName(e.target.value)}
                  onChange={handleInputChange}
                  id="hotelName"
                  name="hotelName"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
              </div>
              <div className="mt-2">
                <input
                  // onChange={handleChange}
                  onChange={handleInputChange}
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>
              </div>
              <div className="mt-2">
                <input
                  // onChange={(e) => setPhone(e.target.value)}
                  onChange={handleInputChange}
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
              </div>
              <div className="mt-2">
                <select
                  name="category"
                  // onChange={(e) => setCategory(e.target.value)}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-2.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Please Select</option>
                  <option value="1 star">1 star</option>
                  <option value="2 star">2 star</option>
                  <option value="3 star">3 star</option>
                  <option value="4 star">4 star</option>
                  <option value="5 star">5 star</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
              </div>
              <div className="mt-2">
                {/* <textarea
                  onChange={handleChange}
                  id="description"
                  name="description"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                /> */}

                <Editor
                  name="editorDescription"
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
                {/* <button
                  onClick={log}
                  className="bg-orange-600 px-4 py-2 rounded-xl text-white my-6 "
                >
                  Log editor content
                </button> */}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Hotel
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default addHotelForm;
