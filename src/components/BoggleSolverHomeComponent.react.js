import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import InputComponent from "./InputComponent.react";
import Toast from "react-bootstrap/Toast";
import BoardComponent from "./BoardComponent.react";
import { generateGrid } from "../utils/BoggleSolverUtils";

export function BoggleSolverHomeComponent(props): React.MixedElement | Null {
  const { setGrid, grid, validWords } = props;
  const [hasStarted, setStarted] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [wordsFound, setWordsFound] = useState([]);
  const [word, setWord] = useState("");

  const styles = {
    section: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      height: "100vh",
      alignItems: "center",
      columnGap: "20px",
    },
    view: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-Start",
      columnGap: "10px",
    },
    view2: {
      display: "flex",
      flexDirection: "column",
      rowGap: "20px",
    },
  };

  const handleSubmit = () => {
    console.log(word);
    if (wordsFound.includes(word.toUpperCase())) {
      setShowToast(true);
    } else if (validWords.includes(word.toLowerCase())) {
      setWordsFound(wordsFound.concat(word.toUpperCase()));
    } else {
      console.log("NO");
    }
    // evt.preventDefault();
  };
  const handleClick = () => {
    if (hasStarted === null) {
      setStarted(true);
    } else if (hasStarted) {
      setWordsFound([]);
      setStarted(false);
    } else {
      setGrid(generateGrid());
      setStarted(true);
    }
  };

  return (
    <div>
      <Toast
        bg="primary"
        position="top-start"
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Boggle Solver</strong>
        </Toast.Header>
        <Toast.Body>Word already Submitted! Try another word</Toast.Body>
      </Toast>
      <div style={styles.section}>
        <div style={styles.view2}>
          <div>
            <Button variant="primary" onClick={handleClick}>
              {hasStarted ? "Stop" : "Start"}
            </Button>
          </div>
          {hasStarted != null && <BoardComponent grid={grid}></BoardComponent>}
          {hasStarted && (
            <InputComponent
              setWord={setWord}
              handleSubmit={handleSubmit}
            ></InputComponent>
          )}
        </div>
        {hasStarted === false && (
          <div style={styles.view}>
            {validWords.map((item) => {
              if (!wordsFound.includes(item)) {
                return <span> {item} </span>;
              }
              return null;
            })}
          </div>
        )}
        {hasStarted && (
          <div style={styles.view}>
            {wordsFound.map((item) => (
              <span> {item} </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default BoggleSolverHomeComponent;
