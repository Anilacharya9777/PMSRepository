import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios'

function AddEditProductMaster({ closeModal, paramData, gridReload }) {
    const [formData, setFormData] = useState({
        productId:0,
        productTypeId: 0,
        brandId: 0,
        categoryId: 0,
        productName: "",
        isActive: true,

    });

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [categoryDropdownOptions, setCategoryDropdownOptions] = useState([]);
    const [brandDropdownOptions, setBrandDropdownOptions] = useState([]);
    const [productTypeDropdownOptions, setProductTypeDropdownOptions] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);

    useEffect(() => {
        debugger;
        if (paramData !== "") {
            setFormData(paramData);
        }

    }, [paramData])

    // Fetch Category dropdown options
    useEffect(() => {
        axios
            .get("https://localhost:7252/api/CategoryMaster/GetDropdownOptions")
            .then((response) => {
                setCategoryDropdownOptions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching category dropdown options:", error);
            });

    }, []);

     // Fetch Brand when a Category is selected
     useEffect(() => {
        if (formData.categoryId) {
            axios
                .get(`https://localhost:7252/api/BrandMaster/brandDetailsByCategoryId/${formData.categoryId}`)
                .then((response) => {
                    setBrandDropdownOptions(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching states:", error);
                });
        } else {
            setBrandDropdownOptions([]); // Reset states if no country is selected
        }
    }, [formData.categoryId]);

    // Fetch ProductType when a Brand is selected
    useEffect(() => {
        if (formData.brandId) {
            axios
                .get(`https://localhost:7252/api/ProductTypeMaster/ProductTypeDetailsByBrandId/${formData.brandId}`)
                .then((response) => {
                    setProductTypeDropdownOptions(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching states:", error);
                });
        } else {
            setProductTypeDropdownOptions([]); // Reset states if no country is selected
        }
    }, [formData.brandId]);

    const handleChange = (e) => {
        debugger;
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
        console.log(name)
        console.log(value)

        // Handle cascading logic for "Category" field
        if (name === "categoryId") {

            setFormData((prevData) => ({
                ...prevData,
                brandId: 0,
                
              }));
              
        }

         // Handle cascading logic for "Brand" field
         if (name === "brandId") {

            setFormData((prevData) => ({
                ...prevData,
                productTypeId: 0,
                
              }));
              
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Data to submit:", formData);
        if (formData.productId !== 0) {
            // Update record
            const response = await axios.put(
                `https://localhost:7252/api/ProductMaster/${formData.productId}`,
                formData
            );
            console.log("Updated successfully:", response.data);
        }
        else {
            // Add new record
            const response = await axios.post(
                "https://localhost:7252/api/ProductMaster",
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
        <Row className="mb-3">
            {/* First Control */}
            <Col md={6}>
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
                        {categoryDropdownOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>

            {/* Second Control */}
            <Col md={6}>
                <Form.Group controlId="brandId">
                    <Form.Label>Select Brand</Form.Label>
                    <Form.Select
                        name="brandId"
                        value={formData.brandId}
                        onChange={handleChange}
                        required
                        style={{ borderColor: '#a3a3e5fa' }}
                    >
                        <option value="">
                            -- Select a Brand --
                        </option>
                        {brandDropdownOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
        <Form.Group controlId="productTypeId">
                    <Form.Label>Select Product Type</Form.Label>
                    <Form.Select
                        name="productTypeId"
                        value={formData.productTypeId}
                        onChange={handleChange}
                        required
                        style={{ borderColor: '#a3a3e5fa' }}
                    >
                        <option value="">
                            -- Select a Type --
                        </option>
                        {productTypeDropdownOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
        <Form.Group controlId="productName" >
            <Form.Label>Product Name</Form.Label>
            <Form.Control
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        placeholder="Enter Product"
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

export default AddEditProductMaster
