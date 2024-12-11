import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios'
import { FaTrash } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddEditNewParts() {
  const commonFormData={
    productId: 0,
    productTypeId: 0,
    brandId: 0,
    categoryId: 0,
  }
  const [formData, setFormData] = useState(commonFormData);

  const rowdata=[{
    barcodeNo: "",
    quantity: "",
    purchasePrice: "",
    sellingPrice: "",
    rackNo: "",
    shelfNo: "",
    purchaseDate: ""
  }]
  const [rows, setRows] = useState(rowdata);

  // Handle changes in the input fields
  const handleInputChange = (index, field, value) => {
    debugger;
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    // Allow only numbers and a single optional decimal point
    if((field === "purchasePrice" || field === "sellingPrice")  && value.trim() !== ""){
      if (/^\d*\.?\d*$/.test(value)) {
        updatedRows[index][field] = value;
        setRows(updatedRows);
      }
      else{
        updatedRows[index][field] = "";
        setRows(updatedRows);
      }
    }
    

    // Add a new row dynamically when the barcode field changes
    if (field === "barcodeNo" && value.trim() !== "" && index === rows.length - 1) {
      setRows([...rows,
      {
        barcodeNo: "",
        quantity: "",
        purchasePrice: "",
        sellingPrice: "",
        rackNo: "",
        shelfNo: "",
        purchaseDate: ""
      }
      ]);
    }
  };

  // Handle row removal
  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  // State to toggle visibility
  const [isVisibleLineItem, setIsVisibleLineItem] = useState(false);

  const handleLineItemVisibility = (props) => {
    if (props === "Add") {
      setIsVisibleLineItem(true);
    }
    else {
      setFormData(commonFormData);
      setRows(rowdata);
      setIsVisibleLineItem(false);
      setResetData(true);
    }

  }
  const [categoryDropdownOptions, setCategoryDropdownOptions] = useState([]);
  const [brandDropdownOptions, setBrandDropdownOptions] = useState([]);
  const [productTypeDropdownOptions, setProductTypeDropdownOptions] = useState([]);
  const [productDropdownOptions, setProductDropdownOptions] = useState([]);
  const [resetData, setResetData] = useState(false);

  const finalData = {
    ...formData,
    rows,
  };

  const handleSubmit = () => {
    
    axios.post("https://localhost:7252/api/ProductTransactionMaster/AddProductTransactionDetailsByProductId", finalData)
      .then((res) => {
        console.log(res);
        debugger
        if (res.data==="Success") {
          toast.success("Parts submitted successfully!");
          setRows([
            {
              barcodeNo: "",
              quantity: "",
              purchasePrice: "",
              sellingPrice: "",
              rackNo: "",
              shelfNo: "",
              purchaseDate: ""
            }
            ]);
        }
      }).catch((err) => { console.log(err) })
   
  }

  // Fetch Category dropdown options
  useEffect(() => {
    debugger;
    
    if (resetData===false) {
      axios
      .get("https://localhost:7252/api/CategoryMaster/GetDropdownOptions")
      .then((response) => {
        setCategoryDropdownOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category dropdown options:", error);
      });
    }
    else {
      setResetData(false);
      setCategoryDropdownOptions([]); // Reset states if no country is selected
    }
   
  }, [resetData])

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

  // Fetch Product when a Product Type is selected
  useEffect(() => {
    if (formData.productTypeId) {
      axios
        .get(`https://localhost:7252/api/ProductMaster/productDetailsByTypeId/${formData.productTypeId}`)
        .then((response) => {
          setProductDropdownOptions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    } else {
      setProductDropdownOptions([]); // Reset states if no country is selected
    }
  }, [formData.productTypeId]);


  const handleChange = (e) => {
    debugger;
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

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

    // Handle cascading logic for "Product" field
    if (name === "productTypeId") {

      setFormData((prevData) => ({
        ...prevData,
        productId: 0,

      }));
    }
  };

  return (
    <div className="p-1 font-sans">
      <h2 className="text-2xl font-bold mb-1">Add New Parts</h2>
      <form className="bg-white p-4 shadow-md rounded-md">
        <div className="grid grid-cols-5 gap-5 mb-4">
          {/* Dropdown Category*/}
          <div>
            <label htmlFor="Category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="Category"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              name="categoryId"
            >
              <option value="">
                -- Select a Category --
              </option>
              {categoryDropdownOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Brand*/}
          <div>
            <label htmlFor="Company" className="block text-sm font-medium text-gray-700 mb-1">
              Company/Make
            </label>
            <select
              id="Company"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              name="brandId"
            >
              <option value="">
                -- Select a Company --
              </option>
              {brandDropdownOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Product Type */}
          <div>
            <label htmlFor="ProductType" className="block text-sm font-medium text-gray-700 mb-1">
              Model Name
            </label>
            <select
              id="ProductType"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              name="productTypeId"
            >
              <option value="">
                -- Select a Model --
              </option>
              {productTypeDropdownOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Product*/}
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
              Parts Name
            </label>
            <select
              id="product"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              name="productId"
            >
              <option value="">
                -- Select a Parts --
              </option>
              {productDropdownOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons to add line item */}
          <div className='flex mt-4 space-x-4 p-1'>
            <Button className="bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" onClick={() => { handleLineItemVisibility("Add") }}>Add parts</Button>
            <Button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm" onClick={() => { handleLineItemVisibility("Reset") }}>Reset</Button>
          </div>

        </div >
        <hr className='mb-3' />

        {/*line item */}
        <div className={`${isVisibleLineItem ? "visible" : "hidden"} relative`}>

          {/* Button to toggle visibility */}




          <div className="p-2 border border-gray-300 rounded-md">
            <div className='flex justify-between'>
              <h2 className="text-lg font-bold mb-2">Parts Information</h2>
              <div className="flex justify-end mb-2 space-x-4">
                <button
                  type='button'
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  // onClick={toggleVisibility}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Exit
                </button>
              </div>
            </div>

            {/* Scrollable Container */}
            <div
              className="overflow-y-auto max-h-[360px] border border-gray-300 p-2 rounded-md"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #f1f1f1" }}
            >
              {rows.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-2 mb-2 items-center"
                >
                  {/* Barcode */}
                  <div className="p-2">
                    <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-1">
                      Barcode No#
                    </label>
                    <input
                      id="barcode"
                      type="text"
                      value={row.barcodeNo}
                      placeholder="Enter Barcode No"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => handleInputChange(index, "barcodeNo", e.target.value)}
                    />
                  </div>

                  {/* Quantity */}
                  <div className="p-2">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      value={row.quantity}
                      placeholder="Enter Quantity"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                    />
                  </div>

                  {/* Purchase Price */}
                  <div className="p-2">
                    <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Purchase Price
                    </label>
                    <input
                      id="purchasePrice"
                      type="text"
                      value={row.purchasePrice}
                      placeholder="Enter Purchase Price"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => handleInputChange(index, "purchasePrice", e.target.value)}
                    />
                  </div>

                  {/* Selling Price */}
                  <div className="p-2">
                    <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Selling Price
                    </label>
                    <input
                      id="sellingPrice"
                      type="text"
                      value={row.sellingPrice}
                      placeholder="Enter Selling Price"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => handleInputChange(index, "sellingPrice", e.target.value)}
                    />
                  </div>

                  {/* Rack No */}
                  <div className="p-2">
                    <label htmlFor="rackNo" className="block text-sm font-medium text-gray-700 mb-1">
                      Rack No#
                    </label>
                    <select
                      id="rackNo"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={row.rackNo}
                      onChange={(e) => handleInputChange(index, "rackNo", e.target.value)}
                    >
                      <option value="">-- Select Rack --</option>
                      <option value="R1">R1</option>
                      <option value="R2">R2</option>
                      <option value="R3">R3</option>
                      <option value="R4">R4</option>
                      <option value="R5">R5</option>
                      <option value="R6">R6</option>
                    </select>
                  </div>

                  {/* Shelf No */}
                  <div className="p-2">
                    <label htmlFor="shelfNo" className="block text-sm font-medium text-gray-700 mb-1">
                      Shelf No#
                    </label>
                    <select
                      id="shelfNo"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={row.shelfNo}
                      onChange={(e) => handleInputChange(index, "shelfNo", e.target.value)}
                    >
                      <option value="">-- Select Shelf --</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                      <option value="S4">S4</option>
                    </select>
                  </div>

                  {/* Purchase Date */}
                  <div className="p-2">
                    <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Purchase Date
                    </label>
                    <DatePicker
                      selected={row.purchaseDate}
                      onChange={(date) => handleInputChange(index, "purchaseDate", date)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Click to select a date"
                      className="border border-gray-300 p-2 rounded-md"
                     
                    />
                    {/* <input
                      id="purchaseDate"
                      type="text"
                      placeholder="Enter Purchase Date"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => handleInputChange(index, "purchaseDate", e.target.value)}
                    /> */}
                  </div>

                  {/* Delete Button */}
                  <div className="text-center">
                    {rows.length > 1 && (
                      <button
                        onClick={() => removeRow(index)}
                        type="button"
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </form>
    </div>
  )
}

export default AddEditNewParts
