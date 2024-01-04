import axios from "axios";
import React, { useState } from "react";

function BRespuestas() {
  const [error, setError] = useState("");
  const answerAll = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/respuestas");
      if (response.data.success === true) {
        console.log(response.data);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      setError("Algo salio mal");
    }
  };

  return (
    <div>
      <h1>respuestas</h1>
      <form onClick={answerAll}>
        <button className="button">respuestas</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default BRespuestas;
