import { useState } from "react";
import styled from "styled-components";

const Column = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BalanceCard = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 224px;
  padding: 26px;
  border-radius: 22px;
  background: linear-gradient(135deg, #163d2d 0%, #216446 100%);
  box-shadow: 0 16px 34px rgba(27, 86, 59, 0.18);
  color: #fff;

  &::after {
    position: absolute;
    top: -76px;
    right: -54px;
    width: 220px;
    height: 220px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    box-shadow: 0 0 0 26px rgba(255, 255, 255, 0.035),
      0 0 0 54px rgba(255, 255, 255, 0.025);
    content: "";
    pointer-events: none;
  }
`;

const BalanceLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 13px;
  font-weight: 500;
`;

const BalanceAmount = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 12px;
  font-size: clamp(32px, 5vw, 40px);
  font-weight: 700;
  letter-spacing: -1.5px;
  font-variant-numeric: tabular-nums;
`;

const Summary = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 28px;
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-left: 12px;
  border-left: 2px solid
    ${({ $income }) => ($income ? "rgba(147, 226, 180, 0.9)" : "rgba(255, 177, 164, 0.9)")};
`;

const SummaryLabel = styled.span`
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
`;

const SummaryAmount = styled.span`
  font-size: 15px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  min-height: 52px;
  padding: 12px 16px;
  border: 0;
  border-radius: 14px;
  background: #e2f4e9;
  color: #17613e;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  transition: background 160ms ease, transform 160ms ease;

  &:hover {
    background: #d3eddd;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid #8cc9a5;
    outline-offset: 3px;
  }
`;

const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border: 1px solid #e8eee9;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(34, 57, 43, 0.05);
`;

const FormHeading = styled.h2`
  margin: 0 0 1px;
  color: #24352b;
  font-size: 16px;
  font-weight: 700;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: #637168;
  font-size: 12px;
  font-weight: 600;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  min-height: 43px;
  padding: 10px 12px;
  border: 1px solid #e1e9e3;
  border-radius: 10px;
  background: #fbfcfb;
  color: #213128;
  font: inherit;
  font-size: 14px;

  &::placeholder {
    color: #a4afa8;
  }

  &:focus {
    border-color: #64a77d;
    outline: 3px solid rgba(100, 167, 125, 0.15);
  }
`;

const Select = styled.select`
  box-sizing: border-box;
  width: 100%;
  min-height: 43px;
  padding: 10px 12px;
  border: 1px solid #e1e9e3;
  border-radius: 10px;
  background: #fbfcfb;
  color: #213128;
  font: inherit;
  font-size: 14px;

  &:focus {
    border-color: #64a77d;
    outline: 3px solid rgba(100, 167, 125, 0.15);
  }
`;

const TypeToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  padding: 4px;
  border-radius: 11px;
  background: #f0f4f1;
`;

const TypeOption = styled.label`
  position: relative;
  display: grid;
  min-height: 38px;
  place-items: center;
  border-radius: 8px;
  background: ${({ $selected }) => ($selected ? "#fff" : "transparent")};
  box-shadow: ${({ $selected }) => ($selected ? "0 1px 4px rgba(24, 52, 35, .1)" : "none")};
  color: ${({ $selected, $income }) =>
    $selected ? ($income ? "#24804e" : "#b85c4d") : "#829087"};
  cursor: pointer;
  font-size: 13px;
  font-weight: 650;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  &:focus-within {
    outline: 2px solid #64a77d;
    outline-offset: 2px;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 9px;
`;

const SubmitButton = styled.button`
  flex: 1;
  min-height: 44px;
  border: 0;
  border-radius: 10px;
  background: #216446;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 700;

  &:hover {
    background: #194f36;
  }

  &:focus-visible {
    outline: 3px solid #8cc9a5;
    outline-offset: 2px;
  }
`;

const CancelButton = styled.button`
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid #e1e9e3;
  border-radius: 10px;
  background: #fff;
  color: #68766d;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 600;

  &:hover {
    background: #f7f9f7;
  }
`;

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

const AddTransactionForm = ({ onSubmit, onCancel }) => {
  const [type, setType] = useState("EXPENSE");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit({
      amount: Number(formData.get("amount")),
      description: formData.get("description").trim(),
      category: formData.get("category"),
      date: formData.get("date"),
      type,
    });
  };

  return (
    <FormCard onSubmit={handleSubmit}>
      <FormHeading>New transaction</FormHeading>
      <TypeToggle role="radiogroup" aria-label="Transaction type">
        <TypeOption $selected={type === "EXPENSE"} $income={false}>
          <input
            type="radio"
            name="type"
            value="EXPENSE"
            checked={type === "EXPENSE"}
            onChange={() => setType("EXPENSE")}
          />
          Expense
        </TypeOption>
        <TypeOption $selected={type === "INCOME"} $income>
          <input
            type="radio"
            name="type"
            value="INCOME"
            checked={type === "INCOME"}
            onChange={() => setType("INCOME")}
          />
          Income
        </TypeOption>
      </TypeToggle>
      <Field>
        Amount
        <Input
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          required
        />
      </Field>
      <Field>
        Description
        <Input
          name="description"
          type="text"
          placeholder="What was it for?"
          maxLength="80"
          required
        />
      </Field>
      <Field>
        Category
        <Select name="category" defaultValue="Other">
          <option>Other</option>
          <option>Food &amp; drink</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Home</option>
          <option>Salary</option>
          <option>Entertainment</option>
        </Select>
      </Field>
      <Field>
        Date
        <Input name="date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required />
      </Field>
      <FormActions>
        <CancelButton type="button" onClick={onCancel}>
          Cancel
        </CancelButton>
        <SubmitButton type="submit">Add transaction</SubmitButton>
      </FormActions>
    </FormCard>
  );
};

const OverviewComponent = ({ balance, income, expenses, onAddTransaction }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const submitTransaction = (transaction) => {
    onAddTransaction(transaction);
    setIsFormVisible(false);
  };

  return (
    <Column aria-label="Balance overview">
      <BalanceCard>
        <BalanceLabel>
          <span aria-hidden="true">◉</span>
          Total balance
        </BalanceLabel>
        <BalanceAmount>{formatCurrency(balance)}</BalanceAmount>
        <Summary>
          <SummaryItem $income>
            <SummaryLabel>Income</SummaryLabel>
            <SummaryAmount>{formatCurrency(income)}</SummaryAmount>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Expenses</SummaryLabel>
            <SummaryAmount>{formatCurrency(expenses)}</SummaryAmount>
          </SummaryItem>
        </Summary>
      </BalanceCard>
      {isFormVisible ? (
        <AddTransactionForm
          onSubmit={submitTransaction}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <AddButton type="button" onClick={() => setIsFormVisible(true)}>
          <span aria-hidden="true">＋</span>
          Add transaction
        </AddButton>
      )}
    </Column>
  );
};

export default OverviewComponent;
