import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Radio, Space } from "antd";

function BCuestionario() {
  const navigate = useNavigate();
  const [pregunta1, setPregunta1] = useState("");
  const [pregunta2, setPregunta2] = useState("");
  const [error, setError] = useState("");

  const respuestas = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/resp-a-neg",
        {
          pregunta1,
          pregunta2,
        }
      );
      if (response.data.success === true) {
        console.log(response.data);
        navigate("/Bmenu");
      } else {
        console.log(response.data);
        navigate("/Bmenu");
      }
    } catch (error) {
      setError("no ingresaron los datos");
      navigate("/Bmenu");
    }
  };
  return (
    <div>
      <h1>Cuestionario</h1>
      <form onSubmit={respuestas} layout="vertical" wrapperCol={{ span: 18 }}>
        <Form.Item
          name="pregunta1"
          label="¿como se llama tu empresa?"
          rules={[{ required: true, msg: "is required" }]}
          onChange={(event) => setPregunta1(event.target.value)}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="holamundo">hola mundo</Radio>
              <Radio value="holagibran">hola gibran</Radio>
              <Radio value="mundohola">mundo hola</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="pregunta2"
          label="¿porqué se llama así?"
          rules={[{ required: true, msg: "is required" }]}
          onChange={(event) => setPregunta2(event.target.value)}
        >
          <input />
        </Form.Item>
        <button className="button" type="submit">
          Finalizar
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default BCuestionario;
