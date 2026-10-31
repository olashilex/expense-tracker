import { useEffect, useState } from "react";
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

const TRANSACTIONS_STORAGE_KEY = "expense-tracker-transactions";

const loadTransactions = () => {
  try {
    const savedTransactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (!savedTransactions) return [];

    const parsedTransactions = JSON.parse(savedTransactions);
    return Array.isArray(parsedTransactions) ? parsedTransactions : [];
  } catch (error) {
    console.error("Could not load saved transactions from local storage.", error);
    return [];
  }
};

const HomeComponent = () => {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error("Could not save transactions to local storage.", error);
    }
  }, [transactions]);

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

  const updateTransaction = (updatedTransaction) => {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === editingTransaction.id
          ? { ...transaction, ...updatedTransaction }
          : transaction,
      ),
    );
    setEditingTransaction(null);
  };

  const deleteTransaction = (transactionId) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== transactionId),
    );
  };

  return (
    <Dashboard>
      <OverviewComponent
        balance={balance}
        income={income}
        expenses={expenses}
        onAddTransaction={addTransaction}
        editingTransaction={editingTransaction}
        onUpdateTransaction={updateTransaction}
        onCancelEdit={() => setEditingTransaction(null)}
      />
      <TransactionComponent
        transactions={transactions}
        onEdit={setEditingTransaction}
        onDelete={deleteTransaction}
      />
    </Dashboard>
  );
};

export default HomeComponent;
