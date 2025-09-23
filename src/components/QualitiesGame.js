// import React, { useState } from "react";

// const qualities = ["Kind", "Funny", "Smart", "Sassy", "Brave", "Selfish"];

// const QualitiesGame = ({ nextStep }) => {
//   const [message, setMessage] = useState("");

//   const handleClick = (quality) => {
//     if (quality === "Selfish") {
//       setMessage("Oops, that's not nice!");
//     } else {
//       setMessage(`You picked ${quality}!`);
//       setTimeout(nextStep, 1000);
//     }
//   };

//   return (
//     <div className="step fade-in">
//       <h2>Select the qualities you like the most:</h2>
//       {qualities.map((q) => (
//         <button key={q} onClick={() => handleClick(q)}>
//           {q}
//         </button>
//       ))}
//       <p>{message}</p>
//     </div>
//   );
// };

// export default QualitiesGame;
import React, { useState } from "react";

const qualities = ["Kind", "Funny", "Smart", "Sassy", "Brave", "Selfish"];

const QualitiesGame = ({ nextStep }) => {
  const [message, setMessage] = useState("");

  const handleClick = (quality) => {
    if (quality === "Selfish") {
      setMessage("Oops, that's not nice!");
    } else {
      setMessage(`You picked ${quality}!`);
      setTimeout(nextStep, 1000);
    }
  };

  return (
    <div className="step fade-in">
      <h2>Select the qualities you like the most:</h2>
      {qualities.map((q) => (
        <button key={q} onClick={() => handleClick(q)}>
          {q}
        </button>
      ))}
      <p>{message}</p>
    </div>
  );
};

export default QualitiesGame;