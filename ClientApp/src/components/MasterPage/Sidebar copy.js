import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp, FaCopyright, FaHome, FaLayerGroup, FaSitemap, FaTruckMonster } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6';
import { Link , NavLink} from 'react-router-dom'
import { NavItem } from 'reactstrap'

function Sidebar({ sidebarToggle }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };
    return (

        <div className={`${sidebarToggle ? "hidden" : "block"} w-64 bg-gray-800 fixed h-full px-4 py-0 mt-12 `}>
            <hr className=' text-2x text-white' />
            <ul className='mt-3 text-white font-bold'>
                <NavItem className='mb-2 rounded  hover:bg-blue-500 py-2 p-0'>
                    <NavLink tag={Link} className='px-3 hover:shadow text-white isActive' to="/testModal">
                        <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>
                        Home
                    </NavLink>
                </NavItem>
                <NavItem className='mb-2 rounded  hover:bg-blue-500 py-2 p-0'>
                    <NavLink tag={Link} className='px-3 hover:shadow text-white isActive' to="/categoryMaster">
                        <FaLayerGroup className='inline-block w-6 h-6 mr-2 -mt-2'></FaLayerGroup>
                        Category Master
                    </NavLink>
                </NavItem>

                <NavItem className='mb-2 rounded  hover:bg-blue-500 py-2 p-0'>
                    <NavLink tag={Link} className='px-3 hover:shadow text-white' to="/brandMaster">
                        <FaCopyright className='inline-block w-6 h-6 mr-2 -mt-2'></FaCopyright>
                        Brand Master
                    </NavLink>
                </NavItem>

                <NavItem className='mb-2 rounded  hover:bg-blue-500 py-2 p-0'>
                    <NavLink tag={Link} className='px-3 hover:shadow text-white' to="/typeMaster">
                        <FaTruckMonster className='inline-block w-6 h-6 mr-2 -mt-2'></FaTruckMonster>
                        Type Master
                    </NavLink>
                </NavItem>

                <NavItem className='mb-2 rounded  hover:bg-blue-500 py-2 p-0'>
                    <NavLink tag={Link} className='px-3 hover:shadow text-white' to="/productMaster">
                        <FaSitemap className='inline-block w-6 h-6 mr-2 -mt-2'></FaSitemap>
                        Product Master
                    </NavLink>
                </NavItem>

                {/* Dropdown Menu */}
                <NavItem className="mb-2 rounded hover:bg-blue-500 py-2 p-0">
                    <button
                        className="px-3 text-white w-full text-left flex items-center"
                        onClick={toggleDropdown}
                    >
                        <FaCartShopping className="inline-block w-6 h-6 mr-2 -mt-2" />
                         Transaction
                        {dropdownOpen ? (
                            <FaCaretUp className="ml-auto" />
                        ) : (
                            <FaCaretDown className="ml-auto" />
                        )}
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown bg-gray-700 rounded shadow-lg mt-2">
                            <NavItem className="hover:bg-blue-600 py-2 px-3">
                                <NavLink tag={Link} className="text-white" to="/subItem1">
                                    Received
                                </NavLink>
                            </NavItem>
                            <NavItem className="hover:bg-blue-600 py-2 px-3">
                                <NavLink tag={Link} className="text-white" to="/subItem2">
                                    Sell
                                </NavLink>
                            </NavItem>
                            
                        </div>
                    )}
                </NavItem>
            </ul>


        </div>
    )
}

export default Sidebar
