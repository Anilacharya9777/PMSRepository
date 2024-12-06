import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios'


export default function AddEditTypeMaster({ closeModal, paramData, gridReload }) {
    const [formData, setFormData] = useState({
        productTypeId: 0,
        brandId: 0,
        categoryId: 0,
        productType: "",
        isActive: true,

    });

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [categoryDropdownOptions, setCategoryDropdownOptions] = useState([]);
    //const [selectedCategory, setSelectedCategory] = useState("");
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
                    setDropdownOptions(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching states:", error);
                });
        } else {
            setDropdownOptions([]); // Reset states if no country is selected
        }
    }, [formData.categoryId]);

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
            console.log(formData)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Data to submit:", formData);
        if (formData.productTypeId !== 0) {
            // Update record
            const response = await axios.put(
                `https://localhost:7252/api/ProductTypeMaster/${formData.productTypeId}`,
                formData
            );
            console.log("Updated successfully:", response.data);
        }
        else {
            // Add new record
            const response = await axios.post(
                "https://localhost:7252/api/ProductTypeMaster",
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
                                {dropdownOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="productType" >
                    <Form.Label>Product Type Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                        placeholder="Enter Product Type"
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
