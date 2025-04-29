import React, { useEffect, useState} from 'react';
import { CompanyProfile } from '../../company';
import { useParams } from 'react-router-dom';
import { getCompanyProfile } from '../../api';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tile/Tile';
import Spinner from '../../Components/Spinners/Spinner';

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();  // Extract the ticker parameter from the URL
  const [company, setCompany] = useState<CompanyProfile>(); //Initialize company state to hold the company data after fetching

  useEffect(() => {
    const getProfileInit = async () => {  //Define an async function inside the useEffect to fetch data from the API.
      const result = await getCompanyProfile(ticker!); //Call the getCompanyProfile function with the ticker parameter. ticker is not null
      setCompany(result?.data[0]); //Sets the first item from the API response into the company state.
    };                             //if result and result.data exist, get the first item.
    getProfileInit();
  }, []);

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company.companyName} />
            <Tile title="Price" subTitle={"$" + company.price.toString()} />
            <Tile title="DCF" subTitle={"$" + company.dcf.toString()} />
            <Tile title="Sector" subTitle={company.sector} />
            <p className="bg-white shadow rounded text-medium font-medium text-gray-900 p-3 mt-1 m-4">
              Company Description:{company.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyPage;


