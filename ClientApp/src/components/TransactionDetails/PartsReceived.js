
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function PartsReceived() {
  const navigateToNewUrl = useNavigate();

  const handleAddButtonClick = () => {
    navigateToNewUrl("/addEditNewParts");
  };

  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(true);

  useEffect(() => {
    axios.get("https://localhost:7252/api/ProductTransactionMaster/GetReceivedProductTransaction?ActionType=Received_Grid")
      .then((res) => {
        setLoading(false);
        setError("");
        setTransactions(res.data);
        // console.log(products)
      }).catch((err) => {
        setLoading(false);
        setError(err);
      })
  }, [reload]);

  const [columnDefs] = useState([
    { field: 'productId', sortable: true, filter: true, flex: 2, hide: true },
    { field: 'productType', sortable: true, filter: true, flex: 2 },
    { field: 'productName', sortable: true, filter: true, flex: 2 },
    { field: 'onhandQuantity', sortable: true, filter: true, flex: 2},
    { field: 'lastUpdatedDate', sortable: true, filter: true, flex: 2, 
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString(); // Customize this format
      },
    },
  ])



  return (
    <div className="ag-theme-alpine" style={{ height: '85vh', width: '100%', paddingRight: '15px' }}>
      <Button className='flex bg-lightgreen-500 w-30 h-7 items-center  text-sm font-bold rounded px-2-py-1'
        onClick={() => handleAddButtonClick()}
      ><FaPlus className='pr-1' /> Add New</Button>

      <AgGridReact
        rowData={transactions}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20} // Default page size
        paginationPageSizeOptions={[20, 50, 100]} // Define dropdown options
      />


    </div>
  )
}

export default PartsReceived
