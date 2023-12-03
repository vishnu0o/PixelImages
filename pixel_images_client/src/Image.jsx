import React, { useEffect, useState } from "react";
import image from "./assets/image.jpg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import background from "./assets/image.jpg";
import { useDispatch, useSelector } from "react-redux";
import { doRefresh } from "./redux/data";

const Image = () => {
  const { data } = useSelector((state) => state.data);
  const dispatch = useDispatch()

  useEffect(() => {
    if(location.state?.refresh){
      dispatch(doRefresh())
    }
  }, []);

  console.log(location.state?.refresh);

  // const loadImage = async () => {
  //   const docRef = doc(db, "data", "PXIMAGE1");

  //   getDoc(docRef).then((docSnapshot) => {
  //     if (docSnapshot.exists()) {
  //       dispatch(saveData(docSnapshot.data()));
  //     } else {
  //       console.log("No such document!");
  //     }
  //   });
  // };

  return (
    <div className="w-full flex justify-center items-center pt-3 m-0">
      <img src={data?.image || image} width="1057px" useMap="#mainImage" />

      <map name="mainImage">
        {data?.link_cordinates?.map((c) => {
          return (
            <area
              shape="rect"
              coords={c.cordinate}
              alt="Computer"
              href={c.url}
            />
          );
        })}
      </map>
    </div>
  );
};

export default Image;
