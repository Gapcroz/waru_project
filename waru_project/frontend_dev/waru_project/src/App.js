import "./App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  // VARIABLES
  const [error, setError] = useState("");

  // FUNCIONES
  const sign_in = async (event) => {
    event.preventDefault();
    try {
      navigate("/ASignin");
    } catch (error) {
      setError("Algo salio mal");
    }
  };

  const log_in = async (event) => {
    event.preventDefault();
    try {
      navigate("/ALogin");
    } catch (error) {
      setError("Algo salio mal");
    }
  };

  return (
    <div className="App">
      <h1>Bienvenido a Warú</h1>
      <h2>Sign In</h2>
      <form onSubmit={sign_in}>
        <button className="button" type="submit">
          Sign In
        </button>
      </form>
      <h2>Log In</h2>
      <form onSubmit={log_in}>
        <button className="button" type="submit">
          Log In
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
