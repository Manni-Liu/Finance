import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { PortfolioGet } from "../../Models/Portfolio";



interface Props {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[]>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

    // useEffect(() => {
    //   getPortfolio();
    // }, []);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };

    // const getPortfolio = () => {
    //   portfolioGetAPI()
    //     .then((res) => {
    //       if (res?.data) {
    //         setPortfolioValues(res?.data);
    //       }
    //     })
    //     .catch((e) => {
    //       setPortfolioValues(null);
    //     });
    // };
  
    // const onPortfolioCreate = (e: any) => {
    //   e.preventDefault();
    //   const exists = portfolioValues.find((value) => value === e.target[0].value);
    //   if (exists) return;
    //   const updatedPortfolio = [...portfolioValues, e.target[0].value];
    //   setPortfolioValues(updatedPortfolio);
    // };

    const onPortfolioCreate = (e: SyntheticEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const symbol = (form.elements[0] as HTMLInputElement).value;
      const company = searchResult.find((company) => company.symbol === symbol);
      if (!company) return; 
      const exists = portfolioValues.find((value) => value.symbol === symbol);
      if (exists) return;
      const newPortfolio: PortfolioGet = {
        id: Math.floor(Math.random() * 1000), // 假设你生成一个临时的 id
        symbol: company.symbol,
        companyName: company.name,
        purchase: 0,
        lastDiv: 0,
        industry: "",
        marketCap: 0,
        comments: undefined
      };
      const updatedPortfolio = [...portfolioValues, newPortfolio];
      setPortfolioValues(updatedPortfolio);
    };

    // const onPortfolioDelete = (e: any) => {
    //   e.preventDefault();
    //   const valueToDelete = e.target.getAttribute("data-value");
    //   const removed = portfolioValues.filter((value) => value !== valueToDelete);
    //   setPortfolioValues(removed);
    // };
    const onPortfolioDelete = (e: SyntheticEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const input = form.querySelector("input");
      const valueToDelete = input?.value;
    
      if (valueToDelete) {
        const removed = portfolioValues.filter((value) => value.symbol !== valueToDelete);
        setPortfolioValues(removed);
      }
    };

    const onSearchSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
      const result = await searchCompanies(search);
      if (typeof result === "string") {
        setServerError(result);
      } else if (Array.isArray(result.data)) {
        setSearchResult(result.data);
      }
    };
  
    
    return (
      <>
        <Search
          onSearchSubmit={onSearchSubmit}
          search={search}
          handleSearchChange={handleSearchChange}
        />
        <ListPortfolio
          portfolioValues={portfolioValues}
          onPortfolioDelete={onPortfolioDelete}
        />
        <CardList
          searchResults={searchResult}
          onPortfolioCreate={onPortfolioCreate}
        />
        {serverError && <div>Unable to connect to API</div>}
      </>
    );
  }; 
  
  export default SearchPage;
  