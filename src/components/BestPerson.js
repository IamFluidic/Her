// import React, { useState } from "react";

// const candidates = [
//   { name: "Me", img: "/images/me.jpg" },
//   { name: "Friend", img: "/images/friend.jpg" },
//   { name: "Random", img: "/images/heart.gif" },
// ];

// const BestPerson = ({ nextStep }) => {
//   const [message, setMessage] = useState("");

//   const handleClick = (person) => {
//     if (person === "Me") {
//       setMessage("Correct! ❤️");
//       setTimeout(nextStep, 1000);
//     } else {
//       setMessage("Try again 😜");
//     }
//   };

//   return (
//     <div className="step fade-in">
//       <h2>Who is the best person?</h2>
//       <div className="candidates">
//         {candidates.map((c) => (
//           <div key={c.name} onClick={() => handleClick(c.name)}>
//             <img src={c.img} alt={c.name} width="100" className="avatar" />
//             <p>{c.name}</p>
//           </div>
//         ))}
//       </div>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default BestPerson;
import React, { useState } from "react";

const candidates = [
  { name: "Me", img: "/images/me.gif" },
  { name: "Friend", img: "/images/friend.gif" },
  { name: "Random", img: "/images/random.gif" },
];

const BestPerson = ({ nextStep }) => {
  const [message, setMessage] = useState("");

  const handleClick = (person) => {
    if (person === "Me") {
      setMessage("Kati maya garchey ni ❤️");
      setTimeout(nextStep, 1000);
    } 
    else if (person === "Friend") {
      setMessage("Jauu timi date aarkeii saga 😜");
    }
    else {
      setMessage("Nabola timi aaba ma saga 😜");
    }
  };

  return (
    <div className="step fade-in">
      <h2>Who is the best person?</h2>
      <div className="candidates">
        {candidates.map((c) => (
          <button key={c.name} onClick={() => handleClick(c.name)} className="candidate-button">
            <img src={c.img} alt={c.name} width="100" className="avatar" />
            <p>{c.name}</p>
          </button>
        ))}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default BestPerson;