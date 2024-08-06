// Файл FilterSortComponent.js
import React, { useEffect, useState } from "react";
import arrowDownIcon from "../../IconsSvg/arrow-down.svg";

const FilterSortComponent = ({
  transactions,
  setFilteredAndSortedTransactions,
}) => {
  const [sortBy, setSortBy] = useState("timeNew");
  const [filterBy, setFilterBy] = useState("all");
  const [timePeriod, setTimePeriod] = useState("all");

  const getSortedTransactions = (transactions, sortBy) => {
    const sortedTransactions = [...transactions];
    switch (sortBy) {
      case "timeNew":
        return sortedTransactions.sort(
          (a, b) => new Date(b.time) - new Date(a.time)
        );
      case "timeOld":
        return sortedTransactions.sort(
          (a, b) => new Date(a.time) - new Date(b.time)
        );
      case "alphabeticalReceiver":
        return sortedTransactions.sort((a, b) => a.to.localeCompare(b.to));
      default:
        return sortedTransactions;
    }
  };

  const getFilteredTransactions = (transactions, filterBy) => {
    if (filterBy === "sent") {
      return transactions.filter((transaction) => transaction.type === "send");
    } else if (filterBy === "received") {
      return transactions.filter(
        (transaction) => transaction.type === "receive"
      );
    }
    return transactions;
  };

  const getTransactionsByTimePeriod = (transactions, timePeriod) => {
    const now = new Date();
    const msDay = 24 * 60 * 60 * 1000;

    switch (timePeriod) {
      case "day":
        return transactions.filter(
          (transaction) => now - new Date(transaction.time) <= msDay
        );
      case "week":
        return transactions.filter(
          (transaction) => now - new Date(transaction.time) <= msDay * 7
        );
      case "month":
        return transactions.filter(
          (transaction) => now - new Date(transaction.time) <= msDay * 30
        );
      case "year":
        return transactions.filter(
          (transaction) => now - new Date(transaction.time) <= msDay * 365
        );
      default:
        return transactions;
    }
  };

  useEffect(() => {
    let filteredTransactions = getFilteredTransactions(transactions, filterBy);
    filteredTransactions = getTransactionsByTimePeriod(
      filteredTransactions,
      timePeriod
    );
    const sortedAndFilteredTransactions = getSortedTransactions(
      filteredTransactions,
      sortBy
    );
    setFilteredAndSortedTransactions(sortedAndFilteredTransactions);
  }, [transactions, sortBy, filterBy, timePeriod]);

  return (
    <div className="filter-container">
      <div className="sort-by">
        <div className="select-wrapper">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="timeNew">New...</option>
            <option value="timeOld">Old...</option>
            <option value="alphabeticalReceiver">Alphabet</option>
          </select>
          <div className="select-arrow">
            <img src={arrowDownIcon} alt="Arrow Down" />
          </div>
        </div>
      </div>
      <div className="filter-by">
        <div className="select-wrapper">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">All directions</option>
            <option value="sent">Sent</option>
            <option value="received">Received</option>
          </select>
          <div className="select-arrow">
            <img src={arrowDownIcon} alt="Arrow Down" />
          </div>
        </div>
      </div>
      <div className="filter-by">
        <div className="select-wrapper">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <option value="all">all time</option>
            <option value="day">Last 24h</option>
            <option value="week">Last 7d</option>
            <option value="month">Last 30d</option>
            <option value="year">Last 365d</option>
          </select>
          <div className="select-arrow">
            <img src={arrowDownIcon} alt="Arrow Down" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSortComponent;
