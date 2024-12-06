import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'

function AddEditBrandMaster({ closeModal, paramData, gridReload }) {
    const [formData, setFormData] = useState({
        brandId: 0,
        categoryId: 0,
        //categoryName: "",
        brandName: "",
        isActive: true,

    });
    const [dropdownOptions, setDropdownOptions] = useState([]);
    //const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        if (paramData != "") {
            setFormData(paramData);
        }

    }, [paramData])

    // Fetch dropdown options
    useEffect(() => {
        axios
            .get("https://localhost:7252/api/CategoryMaster/GetDropdownOptions")
            .then((response) => {
                setDropdownOptions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching dropdown options:", error);
            });
    }, []);

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
            if(formData.brandId!=0){
                // Update record
                const response = await axios.put(
                  `https://localhost:7252/api/BrandMaster/${formData.brandId}`,
                  formData
              );
              console.log("Updated successfully:", response.data);
          }
          else{
               // Add new record
               const response = await axios.post(
                  "https://localhost:7252/api/BrandMaster",
                  formData
              );
              console.log("Added successfully:", response.data);
          }
          closeModal();
          gridReload()

    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="categoryId">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                        style={{ borderColor: '#a3a3e5fa' }}
                    >
                        <option value="">
                            -- Select a Category --
                        </option>
                        {dropdownOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formText" >
                    <Form.Label>Brand Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleChange}
                        placeholder="Enter Brand"
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
                    <Button variant="secondary" onClick={() => closeModal()}>
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

export default AddEditBrandMaster
