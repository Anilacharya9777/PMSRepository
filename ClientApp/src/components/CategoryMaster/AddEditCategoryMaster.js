import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from "axios";

function AddEditCategoryMaster({closeModal,paramData,gridReload}) {
    
    const [formData, setFormData] = useState({
        categoryId:0,
        categoryName: "",
        isActive: true,
        
    });

    useEffect(()=>{
        if(paramData!=""){
            setFormData(paramData);
        }
        
    },[paramData])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
   
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log("Data to submit:", formData);
        if(formData.categoryId!=0){
            // Update record
            const response = await axios.put(
              `https://localhost:7252/api/CategoryMaster/${formData.categoryId}`,
              formData
          );
          console.log("Updated successfully:", response.data);
      }
      else{
           // Add new record
           const response = await axios.post(
              "https://localhost:7252/api/CategoryMaster",
              formData
          );
          console.log("Added successfully:", response.data);
      }
      closeModal();
      gridReload()
       
      };
    
  
    //    // e.preventDefault();
       
    //     console.log("Saved Data:", formData);
    //     if(formData.categoryId!=0){
    //           // Update record
    //           const response = await axios.put(
    //             `https://localhost:7252/api/CategoryMaster/${formData.categoryId}`,
    //             formData
    //         );
    //         console.log("Updated successfully:", response.data);
    //     }
    //     else{
    //          // Add new record
    //          const response = await axios.post(
    //             "https://localhost:7252/api/CategoryMaster",
    //             formData
    //         );
    //         console.log("Added successfully:", response.data);
    //     }
    //     closeModal();
    //     gridReload()
    // };
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formText" >
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="categoryName"
                         value={formData.categoryName}
                         onChange={handleChange}
                        placeholder="Enter Category"
                        required
                        style={{ borderColor: '#a3a3e5fa' }}
                    />
                </Form.Group>
                <Form.Group className="mt-3" controlId="formCheckbox" style={{ borderColor: '#a3a3e5fa' }}>
                    <Form.Check
                        type="checkbox"
                        name="isActive"
                        label="Is Active"
                        style={{ borderColor: '#a3a3e5fa' }}
                     checked={formData.isActive}
                     onChange={handleChange}
                    />
                </Form.Group>
                <hr className='p-2 mt-2' />

                <div className="mt-3 float-right">
                    <Button variant="secondary"  onClick={()=>closeModal()}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        //type="button"
                        type="submit"
                        className="ms-2"
                        //onClick={()=>handleSave()}
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddEditCategoryMaster
