import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import type { Data, Config, Props } from "./types";
import { BASE_PATH } from "../services";
import configData from "../config.json";

const DataTableComponent: React.FC<Props> = ({ reportName }) => {
  const [filterText, setFilterText] = useState("");
  const [data, setData] = useState<Data[]>([]);
  const config: Config = configData;

  const { isLoading, isError, error } = useQuery({
    queryKey: [reportName],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_PATH}/api/reports?report_type=${reportName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      return responseData;
    },
    onSuccess: (data) => {
      setData(data.results);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const filteredData = data?.filter((row) => {
    return Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const csvData = filteredData?.map((row) => {
    return Object.fromEntries(
      config.columns.map((column) => {
        return [column.name, row[column.selector]];
      })
    );
  });

  const pdfData = {
    data: filteredData,
    columns: config.columns,
  };

  return (
    <div>
      <div className="filter">
        <label>
          Filter
          <input
            type="text"
            placeholder="Filter by value or name"
            value={filterText}
            onChange={handleFilter}
          />
        </label>
      </div>
      <DataTable columns={config.columns} data={filteredData} />
      <div className="download">
        <CSVLink data={csvData} filename={`${reportName}.csv`}>
          Download CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default DataTableComponent;
