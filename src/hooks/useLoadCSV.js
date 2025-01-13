// import { csv } from "d3-fetch";

// const useLoadCSV = async () => {
//   const data = await csv("/Electric_Vehicle_Population_Data.csv");
//   const fetchedData = data.map((item) => ({
//     vin: item["VIN (1-10)"],
//     county: item.County,
//     city: item.City,
//     state: item.State,
//     postalCode: item["Postal Code"],
//     modelYear: item["Model Year"],
//     make: item.Make,
//     model: item.Model,
//     evType: item["Electric Vehicle Type"],
//     electricRange: item["Electric Range"],
//     cafvEligibility: item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"],
//     baseMsrp: item["Base MSRP"],
//     electricUtility: item["Electric Utility"],
//   }));

//   return fetchedData;
// };

// export default useLoadCSV;
//
import { useState, useEffect } from "react";
import { csv } from "d3-fetch";

const useLoadCSV = (csvPath) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await csv(csvPath);

        const processedData = data.map((item) => ({
          vin: item["VIN (1-10)"],
          county: item.County,
          city: item.City,
          state: item.State,
          postalCode: item["Postal Code"],
          modelYear: item["Model Year"],
          make: item.Make,
          model: item.Model,
          evType: item["Electric Vehicle Type"],
          electricRange: item["Electric Range"],
          cafvEligibility: item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"],
          baseMsrp: item["Base MSRP"],
          electricUtility: item["Electric Utility"],
        }));

        setFetchedData(processedData);
      } catch (err) {
        setError("Error fetching or parsing CSV data.");
        console.error("Error fetching CSV data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [csvPath]);

  return { fetchedData, loading, error };
};

export default useLoadCSV;
