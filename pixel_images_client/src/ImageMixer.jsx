import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import background from "./assets/image.jpg";
import { useSelector } from "react-redux";
import SuccessAlert from "./SuccessAlert";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

const ImageMixer = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const images = location?.state?.images;
  const sIndex = location?.state?.sIndex;
  const userPrefferedPayMethod = location?.state?.userPrefferedPayMethod || true;
  const { data } = useSelector((state) => state.data);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  // const {images,sIndex,url} = useParams()
console.log(images,"ssssssssssssssssssssssss")
console.log(sIndex,"sssssaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  useEffect(() => {
    data && imageMix();
  }, [images, data]);
  useEffect(() => {
   setSuccess("added successfully");
    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  }, []);
  const imageMix = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    const bg = new Image();
    bg.src = data.image || background;
    // Loop through each image and draw it onto the canvas
    images?.forEach((image, index) => {
      const img = new Image();
      img.src = image.image;
      img.width = image.width;
      img.height = image.height;

      // Adjust the position based on the image size and index
      const x = image.x; // Adjust this value as needed
      const y = image.y;
      // Draw the image onto the canvas
      img.onload = () => {
        bg.onload = () => {
          context.drawImage(bg, 0, 0, 1152, 1020);
          context.drawImage(img, x, y, img.width, img.height);
        };
      };
    });
  };
  const saveImage = async () => {
    let indexes = data?.pixel_index || [];
    let linkCordinates = data?.link_cordinates || [];
    indexes = [...indexes, ...sIndex];
    const url = location.state.url;
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const docRef = doc(db, "data", "PXIMAGE1");
    const im = images?.[0];

    if (!im) {
      return;
    }
    let co = { cordinate: `${im.co}`, url };
    linkCordinates = [...linkCordinates, co];

    const value = {
      id: "dfdsfsdfsd",
      image,
      pixel_index: indexes,
      link_cordinates: linkCordinates,
    };
    await setDoc(docRef, value);
    setSuccess(null);
    if(userPrefferedPayMethod === 'Stripe'){
        const response = await axiosInstance.post("/", {
          amount:1000
        });
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      };
      if(userPrefferedPayMethod === 'Paypal'){
      }
      if(userPrefferedPayMethod === 'Crypto'){
        console.log('reached');
        const response = await axiosInstance.post("/checkout", {
          amount:1000,
          currency: 'INR',
        })
        console.log(response.data);
        if (response.data.charge.hosted_url) {
        window.location.href = response.data.charge.hosted_url;
        }
      }
  };

  return (
    <div className="w-full mt-2 mb-5">
      {success && <SuccessAlert closeHandler={() => setSuccess(null)} />}
      <div className="flex items-center justify-center flex-col">
        <canvas
          ref={canvasRef}
          width="1152px"
          height="1020px"
          className="image-canvas"
        />
        {/* <button
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={saveImage}
        >
          Save Image
        </button> */}
      </div>
    </div>
  );
};

export default ImageMixer;
