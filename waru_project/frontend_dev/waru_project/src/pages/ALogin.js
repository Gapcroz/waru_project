import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/Header";


function ALogin() {
  const navigate = useNavigate();
  // VARIABLES
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // FUNCIONES
  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
        email,
      });
      if (response.data.success === true) {
        console.log(response.data);
        alert("Log in exitoso");
        navigate("/BMenu");
      } else {
        console.log(response.data);
        alert("No ingresaste");
      }
    } catch (error) {
      setError("LogIn Failed");
    }
  };

  return (
    <div>
      <Header />
      <header className="App">
        <h1>Bienvenido a Warú</h1>
      </header>
      <body>
        <h2>Log In</h2>
        <form onSubmit={login}>
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
            placeholder="ejemplo@gmail.com"
          />
          <br />
          <br />
          <button className="button" type="submit">
            Ingresar
          </button>
          {error && <p>{error}</p>}
        </form>
      </body>
      <footer>
        <h1>terminos y condiciones</h1>
      </footer>
    </div>
  );
}

export default ALogin;
