import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp, FaCopyright, FaHome, FaLayerGroup, FaSitemap, FaTruckMonster } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

function Sidebar({ sidebarToggle }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };

    return (
        <div className={`${sidebarToggle ? 'hidden' : 'block'} w-64 bg-gray-800 fixed h-full px-4 py-0 mt-12`}>
            <hr className="text-2x text-white" />
            <ul className="mt-3 text-white font-bold">
                <NavItem className="mb-2 cursor-pointer">
                    <NavLink
                        to="/testModal"
                        className={({ isActive }) =>
                            `px-3 flex items-center hover:shadow text-white rounded ${
                                isActive ? 'bg-blue-600' : ''
                            }`
                        }
                        style={{height: '35px'}}
                    >
                        <FaHome className="inline-block w-6 h-6 mr-2" />
                        Home
                    </NavLink>
                </NavItem>
                <NavItem className="mb-2 cursor-pointer">
                    <NavLink
                        to="/categoryMaster"
                        className={({ isActive }) =>
                            `px-3 flex items-center hover:shadow text-white rounded ${
                                isActive ? 'bg-blue-600' : ''
                            }`
                        }
                        style={{height: '35px'}}
                    >
                        <FaLayerGroup className="inline-block w-6 h-6 mr-2" />
                        Category Master
                    </NavLink>
                </NavItem>

                <NavItem className="mb-2 cursor-pointer">
                    <NavLink
                        to="/brandMaster"
                        className={({ isActive }) =>
                            `px-3 flex items-center hover:shadow text-white rounded ${
                                isActive ? 'bg-blue-600' : ''
                            }`
                        }
                        style={{height: '35px'}}
                    >
                        <FaCopyright className="inline-block w-6 h-6 mr-2" />
                        Brand Master
                    </NavLink>
                </NavItem>

                <NavItem className="mb-2 cursor-pointer">
                    <NavLink
                        to="/typeMaster"
                        className={({ isActive }) =>
                            `px-3 flex items-center hover:shadow text-white rounded ${
                                isActive ? 'bg-blue-600' : ''
                            }`
                        }
                        style={{height: '35px'}}
                    >
                        <FaTruckMonster className="inline-block w-6 h-6 mr-2" />
                        Type Master
                    </NavLink>
                </NavItem>

                <NavItem className="mb-2 cursor-pointer">
                    <NavLink
                        to="/productMaster"
                        className={({ isActive }) =>
                            `px-3 flex items-center hover:shadow text-white rounded ${
                                isActive ? 'bg-blue-600' : ''
                            }`
                        }
                        style={{height: '35px'}}
                    >
                        <FaSitemap className="inline-block w-6 h-6 mr-2" />
                        Product Master
                    </NavLink>
                </NavItem>

                {/* Dropdown Menu */}
                <NavItem className="mb-2 cursor-pointer">
                    <button
                        className="px-3 text-white w-full text-left flex items-center"
                        onClick={toggleDropdown}
                    >
                        <FaCartShopping className="inline-block w-6 h-6 mr-2" />
                        Transaction
                        {dropdownOpen ? <FaCaretUp className="ml-auto" /> : <FaCaretDown className="ml-auto" />}
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown bg-gray-700 rounded shadow-lg mt-2">
                            <NavItem className="py-2 px-3">
                                <NavLink
                                    to="/partsReceived"
                                    className={({ isActive }) =>
                                        `text-white block rounded px-2 ${
                                            isActive ? 'bg-blue-600' : ''
                                        }`
                                    }
                                    style={{height: '25px'}}
                                >
                                    Received
                                </NavLink>
                            </NavItem>
                            <NavItem className=" py-2 px-3">
                                <NavLink
                                    to="/partSell"
                                    className={({ isActive }) =>
                                        `text-white block rounded px-2 ${
                                            isActive ? 'bg-blue-600' : ''
                                        }`
                                    }
                                    style={{height: '25px'}}
                                >
                                    Sell
                                </NavLink>
                            </NavItem>
                        </div>
                    )}
                </NavItem>
            </ul>
        </div>
    );
}

export default Sidebar;