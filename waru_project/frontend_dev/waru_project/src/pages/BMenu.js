import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BMenu() {
  const navigate = useNavigate();
  //  VARIABLES
  const [error, setError] = useState("");
  // FUNCIONES
  const cuestionario = async (event) => {
    event.preventDefault();
    try {
      navigate("/BCuestionario");
    } catch (error) {
      setError("Algo salio mal");
    }
  };
  return (
    <div>
      <h1>Menú</h1>
      <form onSubmit={cuestionario}>
        <button className="button" type="submit">
          test
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default BMenu;
