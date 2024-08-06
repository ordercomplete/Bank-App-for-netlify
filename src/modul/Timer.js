// // File: Timer.js
// import React, { useEffect, useState } from "react";
// import { useContext } from "react";
// import { AuthContext } from "../../AuthContext";

// const Timer = ({ transactionId }) => {
//   const [timeRemaining, setTimeRemaining] = useState(15 * 60 * 1000); // 15 хвилин у мілісекундах
//   const { dispatch, pendingTransactions } = useContext(AuthContext);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeRemaining((prevTimeRemaining) => {
//         if (prevTimeRemaining <= 1000) {
//           clearInterval(interval);
//           const pendingTransaction = pendingTransactions.find(
//             (t) => t.transactionId === transactionId
//           );
//           if (pendingTransaction) {
//             dispatch({
//               type: "CANCEL_TRANSACTION",
//               payload: { transactionId },
//             });
//           }
//           return 0;
//         }
//         return prevTimeRemaining - 1000;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [transactionId, pendingTransactions, dispatch]);

//   const formatTime = (milliseconds) => {
//     const totalSeconds = Math.floor(milliseconds / 1000);
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <div className="timer">Залишилося часу: {formatTime(timeRemaining)}</div>
//   );
// };

// export default Timer;
