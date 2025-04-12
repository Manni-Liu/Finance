import React, { JSX } from 'react'
import Card from '../Card/Card';

interface Props {}

// Define the type of the whole CardList component 
// JSX.Element: Define return type of the function
const CardList: React.FC<Props> = (props: Props):JSX.Element => {
  return (
    <div>
        <Card companyName="Apple" ticker="AAPL" price={100} />
        <Card companyName="Micrsoft" ticker="MSFT" price={200} />
        <Card companyName="Tesla" ticker="TSLA" price={300} />
    </div>
  );
};

export default CardList;