// import React, { useState } from "react";

// const NameChallenge = ({ nextStep }) => {
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name.trim().toLowerCase() === "dipshi karki") {
//       nextStep();
//     } else {
//       setMessage("Hmm... not quite right! Try again :)");
//     }
//   };

//   return (
//     <div className="step fade-in">
//       <h2>Enter my full name to continue:</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default NameChallenge;
import React, { useState } from "react";

const NameChallenge = ({ nextStep, setShowDialog, showDialog }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().toLowerCase() === "dipshi chhetri") {
      nextStep();
    } else {
      // setMessage("Hmm... not quite right! Try again :)");
      //setMessage("Natak garxau timi, feri lekha ta bebu :)");
      setShowDialog(true);
    }
  };

   const closeDialog = () => {
    setShowDialog(false);
    setMessage("");
  };
  
  return (
    <div className="step fade-in">
      <h2>Enter my full name to continue bebu:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <p>Natak garxau timi, feri lekha ta bebu :)</p>
            <button onClick={closeDialog}>huss bebu</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NameChallenge;