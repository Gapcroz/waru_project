import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function aSignin() {
  const navigate = useNavigate();
  // VARIABLES
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // FUNCIONES
  const signin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/signin", {
        username,
        password,
        email,
      });
      if (response.data.success === true) {
        console.log(response.data);
        navigate("/BMenu");
      } else {
        console.log(response.data);
        alert("No ingresaste");
      }
    } catch (error) {
      setError("Correo usado, cambiar de correo electronico");
    }
  };

  return (
    <div>
      <h1>Bienvenido a Warú</h1>
      <h2>Sign In</h2>
      <form onSubmit={signin}>
        <h3>Usuario</h3>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Nombre de usuario"
        />
        <h3>Contraseña</h3>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Ingresa tu contraseña"
        />
        <h3>Correo electronico</h3>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="example@gmail.com"
        />
        <br />
        <br />
        <button className="button" type="submit">
          Ingresar
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default aSignin;
