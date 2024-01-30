import React from "react";
import Image from "next/image";
import { removeCity } from "../services/cookieUtils";

const CloseIcon = (props: { index: number; refreshCities: VoidFunction }) => {
  const { index, refreshCities } = props;

  const handleClick = () => {
    removeCity(index);
    refreshCities();
  };

  return (
    <div onClick={() => handleClick()}>
      <Image
        src="close-icon.svg"
        className="absolute top-2 right-2 cursor-pointer"
        alt="close icon"
        width="20"
        height="20"
        title="Apagar Cidade"
      />
    </div>
  );
};
export default CloseIcon;
