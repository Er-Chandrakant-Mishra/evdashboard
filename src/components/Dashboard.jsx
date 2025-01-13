import React, { useState, useEffect } from "react";
import { FaCar, FaDollarSign } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GoOrganization } from "react-icons/go";
import useLoadCSV from "../hooks/useLoadCSV";
import Datatable from "./Datatable";
import Pegination from "./Pegination";
import Piech from "./Piech";
import Chart from "./Chart";

const ON_PAGE_ITEMS = 10;

function Dashboard() {
  const { fetchedData, loading, error } = useLoadCSV("/Electric_Vehicle_Population_Data.csv");

  const [filteredCity, setFilteredCity] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredData = filteredCity
    ? fetchedData.filter((item) => item.city === filteredCity)
    : fetchedData;

  const totalEVs = filteredData.length;
  const avgRange = totalEVs
    ? Math.round(
        filteredData.reduce(
          (acc, item) => acc + Number(item.electricRange || 0),
          0
        ) / totalEVs
      )
    : 0;

  const totalPages = Math.ceil(filteredData.length / ON_PAGE_ITEMS);
  const displayedData = filteredData.slice(
    currentPage * ON_PAGE_ITEMS,
    (currentPage + 1) * ON_PAGE_ITEMS
  );

  const availableCities = Array.from(new Set(fetchedData.map((item) => item.city)));

  const handleCityChange = (e) => {
    setFilteredCity(e.target.value);
    setCurrentPage(0);
  };

  // EV Types Pie Chart Data
  const evTypesCounts = filteredData.reduce((acc, item) => {
    acc[item.evType] = (acc[item.evType] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(evTypesCounts).map((evType) => ({
    name: evType,
    value: evTypesCounts[evType],
    percentage: ((evTypesCounts[evType] / filteredData.length) * 100).toFixed(2),
  }));

  // EVs Per Year Bar Chart Data
  const yearCounts = filteredData.reduce((acc, item) => {
    const year = item.modelYear;
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(yearCounts).map(([year, count]) => ({
    Year: year,
    count: count,
  }));

  return (
    <div className="rounded-lg bg-secondary">
      <header className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Electric Vehicle Dashboard
        </h2>
      </header>

      <section className="flex flex-row items-center justify-between w-full px-6 py-4 mb-4 text-center bg-gray-400 rounded-lg">
        <div className="flex gap-1">
          <select
            onChange={handleCityChange}
            className="max-w-xs p-2 text-base font-normal border rounded shadow-md bg-slate-300"
          >
            <option value="">All Cities</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid gap-4 mb-4 md:grid-cols-4 sm:grid-cols-2 w-[95%] ml-10">
        <div className="metric-box bg-red-200 hover:bg-blue-200 transition-colors duration-300 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-[1.02]">
          <FaCar className="mb-2 text-2xl text-blue-500 icon" />
          <h2 className="text-lg font-bold">Total EVs</h2>
          <p className="text-xl font-semibold">{totalEVs}</p>
        </div>
        <div className="metric-box bg-orange-200 hover:bg-yellow-200 transition-colors duration-300 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-[1.02]">
          <GoOrganization className="mb-2 text-2xl text-yellow-500 icon" />
          <h2 className="text-lg font-bold">EV Makes</h2>
          <p className="text-xl font-semibold">{new Set(fetchedData.map(item => item.make)).size}</p>
        </div>

        <div className="metric-box bg-pastle hover:bg-green-200 transition-colors duration-300 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-[1.02]">
          <IoSpeedometerOutline className="mb-2 text-2xl text-green-500 icon" />
          <h2 className="text-lg font-bold">Avg Range</h2>
          <p className="text-xl font-semibold">{avgRange} km</p>
        </div>

        <div className="metric-box bg-yellow-100 hover:bg-purple-200 transition-colors duration-300 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-[1.02]">
          <FaDollarSign className="mb-2 text-xl text-purple-500 icon" />
          <h2 className="text-base font-bold">Price Range</h2>
          <p className="text-xl font-semibold">
            {Math.round(Math.min(...filteredData.map((item) => item.baseMsrp)))} -{" "}
            {Math.round(Math.max(...filteredData.map((item) => item.baseMsrp)))} USD
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <Piech pieData={pieData} COLORS={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]} />
        <Chart displayData={chartData} />
      </section>

      <section className="m-5">
        <Datatable displayData={displayedData} className="ml-10" />
        <section className="pb-5">
          <Pegination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </section>
    </div>
  );
}

export default Dashboard;
