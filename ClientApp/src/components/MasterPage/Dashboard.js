import React from 'react'
import { NavMenu } from '../NavMenu'
import CategoryMaster from '../CategoryMaster/CategoryMaster'
import { Route, Routes } from 'react-router-dom'
import TestModal from '../CategoryMaster/TestModal'
import BrandMaster from '../BrandMaster/BrandMaster'
import TypeMaster from '../TypeMaster/TypeMaster'
import ProductMaster from '../ProductMaster/ProductMaster'
import PartsReceived from '../TransactionDetails/PartsReceived'
import AddEditNewParts from '../TransactionDetails/AddEditNewParts'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PartSell from '../TransactionDetails/PartSell'

function Dashboard({sidebarToggle,setSidebarToggle}) {
  return (
    <div>
     <NavMenu sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>

     <div style={{ flex: 1, marginLeft: sidebarToggle?'10px':"270px",marginTop: "10px" }}>
          <Routes>
          <Route path="/testModal" element={<TestModal />} />
            <Route path="/categoryMaster" element={<CategoryMaster />} />
            <Route path="/brandMaster" element={<BrandMaster />} />
            <Route path="/typeMaster" element={<TypeMaster />} />
            <Route path="/productMaster" element={<ProductMaster />} />
            <Route path="/partsReceived" element={<PartsReceived />} />
            <Route path="/addEditNewParts" element={<AddEditNewParts />} />
            <Route path="/partSell" element={<PartSell />} />
          </Routes>
          <ToastContainer />
        </div>
    </div>
  )
}

export default Dashboard
