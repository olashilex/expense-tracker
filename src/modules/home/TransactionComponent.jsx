import styled from "styled-components";

const Panel = styled.section`
  min-width: 0;
  padding: 23px;
  border: 1px solid #e8eee9;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(34, 57, 43, 0.045);
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
`;

const HeadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Heading = styled.h2`
  margin: 0;
  color: #23332a;
  font-size: 17px;
  font-weight: 720;
  letter-spacing: -0.3px;
`;

const Caption = styled.p`
  margin: 0;
  color: #849087;
  font-size: 12px;
`;

const Count = styled.span`
  display: grid;
  min-width: 28px;
  height: 28px;
  padding: 0 7px;
  place-items: center;
  border-radius: 9px;
  background: #eff5f0;
  color: #54705d;
  font-size: 12px;
  font-weight: 650;
`;

const TransactionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TransactionRow = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 12px 0;
  border-top: 1px solid #f0f3f0;
`;

const CategoryIcon = styled.div`
  display: grid;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 13px;
  background: ${({ $income }) => ($income ? "#e5f4e9" : "#f5f0e9")};
  color: ${({ $income }) => ($income ? "#27804f" : "#8b704b")};
  font-size: 16px;
  font-weight: 700;
`;

const TransactionInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
`;

const Description = styled.span`
  overflow: hidden;
  color: #293a30;
  font-size: 13px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Details = styled.span`
  color: #89948d;
  font-size: 11px;
`;

const Amount = styled.span`
  flex: 0 0 auto;
  color: ${({ $income }) => ($income ? "#26804f" : "#34433a")};
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

const EmptyState = styled.div`
  display: flex;
  min-height: 214px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const EmptyIcon = styled.div`
  display: grid;
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  place-items: center;
  border-radius: 16px;
  background: #f0f5f1;
  color: #668170;
  font-size: 22px;
`;

const EmptyTitle = styled.strong`
  margin-bottom: 5px;
  color: #35463b;
  font-size: 13px;
`;

const EmptyText = styled.span`
  max-width: 210px;
  color: #8a968e;
  font-size: 12px;
  line-height: 1.6;
`;

const icons = {
  "Food & drink": "✳",
  Transport: "↗",
  Shopping: "◇",
  Home: "⌂",
  Salary: "↙",
  Entertainment: "♫",
  Other: "· · ·",
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

const TransactionComponent = ({ transactions }) => (
  <Panel aria-label="Recent transactions">
    <PanelHeader>
      <HeadingGroup>
        <Heading>Transactions</Heading>
        <Caption>Your latest money movements</Caption>
      </HeadingGroup>
      <Count aria-label={`${transactions.length} transactions`}>{transactions.length}</Count>
    </PanelHeader>
    {transactions.length ? (
      <TransactionList>
        {transactions.map((transaction) => {
          const isIncome = transaction.type === "INCOME";
          return (
            <TransactionRow key={transaction.id}>
              <CategoryIcon $income={isIncome} aria-hidden="true">
                {icons[transaction.category] ?? icons.Other}
              </CategoryIcon>
              <TransactionInfo>
                <Description>{transaction.description}</Description>
                <Details>
                  {transaction.category} · {formatDate(transaction.date)}
                </Details>
              </TransactionInfo>
              <Amount $income={isIncome}>
                {isIncome ? "+" : "−"}
                {formatCurrency(transaction.amount)}
              </Amount>
            </TransactionRow>
          );
        })}
      </TransactionList>
    ) : (
      <EmptyState>
        <EmptyIcon aria-hidden="true">↗</EmptyIcon>
        <EmptyTitle>No transactions yet</EmptyTitle>
        <EmptyText>Add your first income or expense to start tracking your balance.</EmptyText>
      </EmptyState>
    )}
  </Panel>
);

export default TransactionComponent;
