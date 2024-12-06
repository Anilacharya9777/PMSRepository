import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'; // Import the React wrapper
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios'
import { FaEdit, FaPlus } from 'react-icons/fa';
//import { Button } from 'reactstrap';
import AddEditCategoryMaster from './AddEditCategoryMaster';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CommonModal from '../Common/CommonModal'


function CategoryMaster() {
    const [reloadGrid, setReloadGrid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);

    const [columnDefs] = useState([
        { field: 'categoryId', sortable: true, filter: true, flex: 2 },
        { field: 'categoryName', sortable: true, filter: true, flex: 2 },
        { field: 'isActive', sortable: true, filter: true, flex: 2 },
        {
            headerName: 'Actions', // Action column header
            cellRenderer: (params) => (
               
                <button
                    onClick={() => openModal("Add/Edit Category Master", <AddEditCategoryMaster closeModal={closeModal} paramData={params.data} gridReload={gridReload}/>)}
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
        debugger;
        axios.get('https://localhost:7252/api/CategoryMaster')
            .then((res) => {

                setCategories(res.data);
                setError('');
                setLoading(false);
                console.log(loading)
            })

            .catch((err) => {
                setError(err);
                setLoading(false);
            })
    }, [reloadGrid])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", body: "" });

    const openModal = (title, body) => {
        setModalContent({ title, body });
        setIsModalOpen(true);
    };
    //const gridReload = () => setReloadGrid(!reloadGrid)
    const gridReload = () => {
        setReloadGrid((prevState) => !prevState); // Toggle the state to trigger a re-render
        //console.log("Reload Brand Grid "+ reload)
      };

    const closeModal = () => {
        setIsModalOpen(false);
        //setReloadGrid(!reloadGrid)
    };
    
    return (
        <div className="ag-theme-alpine" style={{ height: '85vh', width: '100%', paddingRight: '15px' }}>
            {loading ? (
                <div>Loading... Please wait.</div>
            ) : (
                <div className="ag-theme-alpine" style={{ height: '85vh', width: '100%', paddingRight: '15px' }}>


                    <Button className='flex bg-lightgreen-500 w-30 h-7 items-center  text-sm font-bold rounded px-2-py-1'
                    onClick={() => openModal("Add/Edit Category Master", <AddEditCategoryMaster closeModal={closeModal} paramData={""} gridReload={gridReload}/>)}
                     ><FaPlus className='pr-1' /> Add New</Button>
                    <AgGridReact
                        rowData={categories}
                        columnDefs={columnDefs}
                        pagination={true}
                        paginationPageSize={20} // Default page size
                        paginationPageSizeOptions={[20, 50,100]} // Define dropdown options
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


        </div>
    )
}

export default CategoryMaster
