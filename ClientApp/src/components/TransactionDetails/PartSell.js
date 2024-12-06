import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

function PartSell() {
    const formItem = {
        barcodeNo: ""
    }

    // const rowdata=[{
    //     barcodeNo: "",
    //     quantity: "",
    //     purchasePrice: "",
    //     sellingPrice: "",
    //     rackNo: "",
    //     shelfNo: "",
    //     purchaseDate: ""
    //   }]
    //const [rows, setRows] = useState([rowdata]);
    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState(formItem);
    const [counter, SetCounter] = useState(0);

    const barcodeChange = (value, counterValue) => {
        debugger;
        SetCounter((prev) => prev + 1);
        axios.get(`https://localhost:7252/api/ProductTransactionMaster/GetReceivedProductTransactionByBarcodeNo?ActionType=GetBy_BarcodeNo&barcodeNo=${value}`)
            .then((res) => {
                if (res.data && res.data.length > 0) {

                    const rowdata = {
                        barcodeNo: res.data[0].barcodeNo,
                        quantity: res.data[0].sellingQuantity,
                       // purchasePrice: res.data[0].sellingPrice,
                        sellingPrice: res.data[0].sellingPrice,
                        rackNo: res.data[0].rackNo,
                        shelfNo: res.data[0].shelfNo,
                        sellingDate: format(new Date(), "yyyy-MM-dd")
                    }
                    console.log(rowdata)
                    setRows((prevRows) => [...prevRows, rowdata]);
                    setFormData(formItem);
                }
                else{
                    toast.error("Invalid Barcode number.!");
                }

            }).catch((err) => {
                console.log(err)
            })
    }

    // Handle changes in the input fields
    const handleInputChange = (index, field, value) => {
        debugger;
        SetCounter((prev) => prev + 1);
        //console.log(counter);
        //setRows(rowdata);
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);

        // Allow only numbers and a single optional decimal point
        if ((field === "purchasePrice" || field === "sellingPrice") && value.trim() !== "") {
            if (/^\d*\.?\d*$/.test(value)) {
                updatedRows[index][field] = value;
                setRows(updatedRows);
            }
            else {
                updatedRows[index][field] = "";
                setRows(updatedRows);
            }
        }
        // Add a new row dynamically when the barcode field changes
        // if (field === "barcodeNo" && value.trim() !== "" && index === rows.length - 1) {
        //     setRows([...rows,
        //     {
        //         barcodeNo: "",
        //         quantity: index,
        //         purchasePrice: "",
        //         sellingPrice: "",
        //         rackNo: "",
        //         shelfNo: "",
        //         purchaseDate: ""
        //     }
        //     ]);
        // }
    }

    // Handle row removal
    const removeRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleSubmit = () => {
    debugger;
        axios.post("https://localhost:7252/api/ProductTransactionMaster/SellingDetails", rows)
          .then((res) => {
            console.log(res);
            debugger
            if (res.data==="Success") {
              toast.success("Parts submitted successfully!");
            }
          }).catch((err) => { console.log(err) })
       
      }
    return (
        <div className="p-2 border border-gray-300 rounded-md">
            <div className='flex justify-between'>
                <h2 className="text-lg font-bold mb-2">Parts Sell</h2>

            </div>
            <div className="p-2">
                <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-1">
                    Barcode No#
                </label>
                <input
                    id="barcode"
                    type="text"
                    value={formData.barcodeNo}
                    placeholder="Enter Barcode No"
                    className="w-64 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    //onChange={(e) => handleInputChange(counter, "barcodeNo", e.target.value)}
                    onChange={(e)=>setFormData(e.target.value)}
                    onBlur={(e) => barcodeChange(e.target.value, counter)}
                />
            </div>
            <hr />
            {/* Scrollable Container */}
            
            {rows.length?(
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
                 className="overflow-y-auto max-h-[460px] border border-gray-300 p-2 rounded-md"
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
                         {/* <div className="p-2">
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
                         </div> */}

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
                             <input
                                 id="rackNo"
                                 type="text"
                                 value={row.rackNo}
                                 placeholder="Enter Selling Price"
                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                 onChange={(e) => handleInputChange(index, "rackNo", e.target.value)}
                             />

                         </div>

                         {/* Shelf No */}
                         <div className="p-2">
                             <label htmlFor="shelfNo" className="block text-sm font-medium text-gray-700 mb-1">
                                 Shelf No#
                             </label>
                             <input
                                 id="shelfNo"
                                 type="text"
                                 value={row.shelfNo}
                                 // placeholder="Enter Selling Price"
                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                 onChange={(e) => handleInputChange(index, "shelfNo", e.target.value)}
                             />

                         </div>

                         {/* Purchase Date */}
                         <div className="p-2">
                             <label htmlFor="sellingDate" className="block text-sm font-medium text-gray-700 mb-1">
                             Selling Date
                             </label>
                             <DatePicker
                                 selected={row.sellingDate}
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
        ):("")
                
            }
            
           
           


        </div>
    )
}

export default PartSell
