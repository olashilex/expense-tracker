import styled from "styled-components";
import HomeComponent from "./modules/home/index.jsx";

const Page = styled.main`
  min-height: 100vh;
  padding: 48px 24px 64px;
`;

const AppShell = styled.div`
  width: min(100%, 920px);
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const BrandMark = styled.div`
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 14px;
  background: #dff4e9;
  color: #16794c;
  font-size: 21px;
  font-weight: 800;
`;

const BrandCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.h1`
  margin: 0;
  color: #17231d;
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.span`
  color: #7a8980;
  font-size: 13px;
`;
const Greeting = styled.h3`
font-size : 18px;
font-weight: 550;


`;

function App() {
  return (
    <Page>
      <AppShell>
        <Header>
          <BrandMark aria-hidden="true">$</BrandMark>
          <BrandCopy>
            <Title>Expense tracker</Title>
            <Greeting>Welcome</Greeting>
            <Subtitle>Your money, in balance.</Subtitle>
          </BrandCopy>
        </Header>
        <HomeComponent />
      </AppShell>
    </Page>
  );
}

export default App;
