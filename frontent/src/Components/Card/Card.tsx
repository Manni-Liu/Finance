import React, { JSX } from 'react'

interface Props {
  // Define any props you want to pass to the Card component here
  companyName: string;
  ticker: string;
  price: number;
}

const Card:React.FC<Props> = ({ companyName, ticker, price }: Props):JSX.Element => {
  return (
    <div className="details">
      <h2>
        {companyName}({ticker})
      </h2>
      <p>${price}</p>
    </div>
  )
}

export default Card