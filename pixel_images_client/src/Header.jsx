import React, { useEffect } from "react";
import instagram from "./assets/instagram.webp";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { saveData } from "./redux/data";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { useLocation } from "react-router";

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const {data} = useSelector(state => state.data)
  const { refresh } = useSelector((state) => state.data);

  useEffect(() => {
    loadImage();
  }, [refresh]);

  const loadImage = async () => {
    const docRef = doc(db, "data", "PXIMAGE1");

    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        dispatch(saveData(docSnapshot.data()));
      } else {
        console.log("No such document!");
      }
    });
  };
  return (
    <>
      <div class="flex items-center justify-center ">
        <div class="gold-gradient">
          <h1 class="text-4xl font-bold gold-gradient-text stroke-1-black">
            A Billion Dollar Page
          </h1>
        </div>
      </div>
      <div class="flex items-center justify-center ">
        <div class="gold-gradient">
          <h1 class="text-2xl font-bold gold-gradient-text stroke-1-black">
            $1 per page
          </h1>
        </div>
        <div class="gold-gradient">
          <div class="text-sm font-bold gold-gradient-text py-3 px-20">
            <div className="py-2 px-4 rounded-md border border-black text-gray-950">
              Sold : { data && data?.pixel_index?.length}
              <br />
              Available: {data &&  8160 - data?.pixel_index?.length}
            </div>
          </div>
        </div>
        <div class="gold-gradient">
          <h1 class="text-2xl font-bold gold-gradient-text stroke-1-black">
            1 Billion pixels
          </h1>
        </div>
      </div>
      <div class="flex items-center justify-center ">
        <div class="gold-gradient">
          <h1 class="text-2xl font-bold gold-gradient-text stroke-1-black">
            Be part of internet history for more than 50 years
          </h1>
        </div>
      </div>
      <div class="flex items-center justify-center bg-yellow-400 w-full">
        <div class="container">
          <div className="px-60">
            <nav class="bg-gray-800 p-2 w-full">
              <div class="container mx-auto flex justify-between items-center">
                <div class="text-white text-lg font-bold">
                  <div className="py-2 px-2 rounded-md border bg-white text-gray-950 flex align-middle justify-center">
                    <Icon className="side-icons" icon="skill-icons:instagram" />
                    <h2 class="mt-1 ml-1">sahad_azod</h2>
                  </div>
                </div>
                <ul class="flex space-x-4">
                  <li>  
                    <a href="/" class="text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/upload" class="text-white">
                      Buy Pixels
                    </a>
                  </li>
                  <li>
                    <a href="/image" class="text-white">
                      About
                    </a>
                  </li>
                </ul>
                <div class="text-white text-lg font-bold">
                  <div className="py-2 px-2 rounded-md border bg-white text-gray-950 flex align-middle justify-center">
                    <Icon className="side-icons" icon="skill-icons:twitter" />
                    <h2 class="mt-1 ml-1">sahad_azod</h2>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
