//file CombinedEvents
import { useEffect, useState } from "react";

export const CombinedEvents = ({ user, transactions, events, isAdmin }) => {
  const [combinedEvents, setCombinedEvents] = useState([]);

  useEffect(() => {
    let combinedEvents = [];

    // Filter user transactions or all if the user is an admin
    const userTransactions = transactions.filter(
      (trans) =>
        isAdmin ||
        (trans.from === user.email && trans.type === "send") ||
        (trans.to === user.email && trans.type === "receive")
    );

    userTransactions.forEach((trans) => {
      combinedEvents.push({
        title:
          trans.type === "send" ? "Money transfer" : "Wallet replenishment",
        info: `${
          trans.from === user.email
            ? `To: ${trans.to}; from: ${user.email} `
            : `To: ${user.email}; from: ${trans.from} `
        }, ${trans.type === "receive" ? "+" : "-"}$${trans.amount}, ${new Date(
          trans.time
        ).toLocaleString()}`,
        time: new Date(trans.time),
        type: "transaction",
      });
    });

    if (Array.isArray(events)) {
      combinedEvents = [
        ...combinedEvents,
        ...events
          .filter((event) => event.user === user.email || isAdmin)
          .map((event) => ({
            ...event,
            time: new Date(event.time),
            type: "userEvent",
          })),
      ];
    } else if (typeof events === "object") {
      combinedEvents = [
        ...combinedEvents,
        ...Object.values(events)
          .filter((event) => event.user === user.email || isAdmin)
          .map((event) => ({
            ...event,
            time: new Date(event.time),
            type: "userEvent",
          })),
      ];
    }

    combinedEvents.sort((a, b) => new Date(b.time) - new Date(a.time));

    setCombinedEvents(combinedEvents);

    console.log("Combined events loaded and sorted:", combinedEvents);
  }, [user.email, transactions, events, isAdmin]);

  return combinedEvents;
};

export default CombinedEvents;
