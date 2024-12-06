import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import CommonModal from '../Common/CommonModal';
import { Button } from 'react-bootstrap';
import AddEditTypeMaster from '../TypeMaster/AddEditTypeMaster'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function TypeMaster() {
    const[types,setTypes]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reload, setReload] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", body: "" });

    const [columnDefs] = useState([
        { field: 'productTypeId', sortable: true, filter: true, flex: 2 },
        { field: 'categoryId', sortable: true, filter: true, flex: 2,hide: true  },
        { field: 'categoryName', sortable: true, filter: true, flex: 2 },
        { field: 'brandName', sortable: true, filter: true, flex: 2 },
        { field: 'productType', sortable: true, filter: true, flex: 2 },
        { field: 'isActive', sortable: true, filter: true, flex: 2 },
        {
            headerName: 'Actions', // Action column header
            cellRenderer: (params) => (

                <button
                    onClick={() => openModal("Add/Edit Type Master", <AddEditTypeMaster closeModal={closeModal} paramData={params.data} gridReload={gridReload} />)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'blue',
                    }}
                >
                    <FaEdit size={16} /> {/* Edit icon */}
                </button>
            ),
            flex: 2
        },
    ])

    useEffect(() => {
        axios.get("https://localhost:7252/api/ProductTypeMaster/GetProductTypeDetails")
            .then((res) => {
                setLoading(false);
                setError("");
                setTypes(res.data);
                console.log(types)
            }).catch((err) => {
                setLoading(false);
                setError(err);
            })
    }, [reload]);

    const openModal = (title, body) => {
        setModalContent({ title, body });
        setIsModalOpen(true);
    };
    //const gridReload = () => setReload(!reload)
    const gridReload = () => {
        setReload((prevState) => !prevState); // Toggle the state to trigger a re-render
        //console.log("Reload Brand Grid "+ reload)
      };

    const closeModal = () => {
        setIsModalOpen(false);
        //setReloadGrid(!reloadGrid)
    };

    if (loading) {
        return <p>Loading...Please wait</p>
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

  return (
    <div className="ag-theme-alpine" style={{ height: '85vh', width: '100%', paddingRight: '15px' }}>

            <Button className='flex bg-lightgreen-500 w-30 h-7 items-center  text-sm font-bold rounded px-2-py-1'
                onClick={() => openModal("Add/Edit Product Type Master", <AddEditTypeMaster closeModal={closeModal} paramData={""} gridReload={gridReload} />)}
            ><FaPlus className='pr-1' /> Add New</Button>
            <AgGridReact
                rowData={types}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={20} // Default page size
                paginationPageSizeOptions={[20, 50,100]} // Define dropdown options
                //domLayout="autoHeight"
            />

            <CommonModal
                show={isModalOpen}
                handleClose={closeModal}
                title={modalContent.title}
                body={modalContent.body}
            //onChange={handleChange}
            >

            </CommonModal>

        </div>
  )
}

export default TypeMaster
