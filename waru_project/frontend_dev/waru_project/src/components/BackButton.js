import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  return (
    <div>
      <button onClick={() => window.history.back()}>
        <FaArrowLeft /> Volver
      </button>
    </div>
  );
};
export default BackButton;
