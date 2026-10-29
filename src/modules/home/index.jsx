import { useState } from "react";
import styled from "styled-components";
import OverviewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 20px;
  align-items: start;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const transactionsInitialState = [];

const HomeComponent = () => {
  const [transactions, setTransactions] = useState(transactionsInitialState);

  const balance = transactions.reduce(
    (total, transaction) =>
      total + (transaction.type === "INCOME" ? transaction.amount : -transaction.amount),
    0,
  );
  const income = transactions.reduce(
    (total, transaction) =>
      total + (transaction.type === "INCOME" ? transaction.amount : 0),
    0,
  );
  const expenses = transactions.reduce(
    (total, transaction) =>
      total + (transaction.type === "EXPENSE" ? transaction.amount : 0),
    0,
  );

  const addTransaction = (transaction) => {
    setTransactions((currentTransactions) => [
      { ...transaction, id: crypto.randomUUID() },
      ...currentTransactions,
    ]);
  };

  return (
    <Dashboard>
      <OverviewComponent
        balance={balance}
        income={income}
        expenses={expenses}
        onAddTransaction={addTransaction}
      />
      <TransactionComponent transactions={transactions} />
    </Dashboard>
  );
};

export default HomeComponent;
