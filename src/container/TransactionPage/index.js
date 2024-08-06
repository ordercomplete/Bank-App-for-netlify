// Файл TransactionPage
import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../modul/AuthContext";
import TitleComponent from "../../component/TitleComponent";
import UsersBlock from "../../component/UsersBlock";
import "./style.css";

const TransactionPage = () => {
  const { transactionId } = useParams();
  const { user, transactions } = useContext(AuthContext);
  const navigate = useNavigate();

  const transaction = transactions.find(
    (tran) => String(tran.transactionId) === String(transactionId) // Ensure both are strings for comparison Переконайтеся, що обидва є рядками для порівняння
  );

  if (!transaction) {
    return (
      <div className="default-container">
        <TitleComponent pageTitle={pageTitle} />
        <h3>Transaction not found</h3>
      </div>
    );
  }

  // Check if the user is the sender or receiver of the transaction
  const isSenderOrReceiver =
    transaction.from === user.email || transaction.to === user.email;

  // Redirect if the user is not an admin and not the sender or receiver
  if (!user?.isAdmin && !isSenderOrReceiver) {
    navigate("/");
    return null;
  }
  const pendingTransactions = transactions.filter(
    (t) => t.from === user.email && t.isPending
  );

  const handleTransactionClick = (transactionId) => {
    navigator.clipboard
      .writeText(transactionId)
      .then(() => {
        alert("Transaction ID copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy transaction ID:", err);
      });
  };
  const pageTitle = "Transaction details"; // передати  заголовок
  return (
    <div className="default-container-auth">
      <TitleComponent pageTitle={pageTitle} />
      <div className="transaction-block">
        <div className="transaction-table">
          <p>
            <span>Transaction ID:</span>
            <span>{transaction.transactionId}</span>
          </p>
          <p>
            <span>Date:</span>
            <span>{new Date(transaction.time).toLocaleString()}</span>
          </p>
          <p>
            <span>Users:</span>
            <span>
              to {transaction.to} from {transaction.from}
            </span>
          </p>
          <p>
            <span>Amount:</span>
            <span>${transaction.amount}</span>
          </p>
          <p>
            <span>Type:</span>
            <span>{transaction.type}</span>
          </p>
          <p>
            <span>Payment method:</span>
            <span>{transaction.paymentMethod}</span>
          </p>
        </div>

        {transaction.isPending && (
          <div className="reserved-block">
            <h4>Transaction Pending - click to copy id</h4>
            <p
              className="reserved-transactionId"
              onClick={() => handleTransactionClick(transaction.transactionId)}
            >
              ${transaction.amount} reserved for transaction ID:{" "}
              {transaction.transactionId}
            </p>
          </div>
        )}
        <div className="UsersBlockSpace">
          <UsersBlock user={user} />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
