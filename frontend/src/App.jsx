import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handlePrompt = async (e) => {
   if(e) e.preventDefault();
    try {

      
      const apiResponse = await axios.post("http://localhost:8080/", {
        prompt,
      });
      setResponse(apiResponse.data);
      setPrompt("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Assistant</h1>

      <form onSubmit={handlePrompt} style={styles.form}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePrompt();
            }
          }}
          placeholder="Ask something..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>

      <div style={styles.responseBox}>
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
};

export default App;

const styles = {
  container: {
    width: "60%",
    margin: "40px auto",
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #999",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#4A8FFF",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
  responseBox: {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    minHeight: "150px",
    border: "1px solid #ddd",
  },
};
