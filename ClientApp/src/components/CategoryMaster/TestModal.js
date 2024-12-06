import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import 'ag-grid-enterprise';

const GroupingExample = () => {
  const rowData = [
    { country: "USA", year: "2020", sales: 500 },
    { country: "USA", year: "2021", sales: 700 },
    { country: "Canada", year: "2020", sales: 300 },
    { country: "Canada", year: "2021", sales: 400 },
    { country: "Canada", year: "2020", sales: 300 },
  ];

  const columnDefs = [
    { field: "country", rowGroup: true }, // Group by country
    { field: "year", rowGroup: true },
    { field: "sales" },
  ];

  const autoGroupColumnDef = {
    headerName: "Group",
    minWidth: 200,
    cellRendererParams: {
      suppressCount: false, // Show item count in groups
    },
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 400, width: "100%" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={autoGroupColumnDef}
        groupDisplayType="groupRows"
        animateRows={true}
      />
    </div>
  );
};

export default GroupingExample;
