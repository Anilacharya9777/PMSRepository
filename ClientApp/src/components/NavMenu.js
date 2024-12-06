import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {

    const newToggleState = !this.props.sidebarToggle;
    console.log(newToggleState)
    this.props.setSidebarToggle(newToggleState)
   
  }

  render() {
    return (
      <nav className='bg-gray-800  px-4 py-2 flex justify-between w-100'>
        <div className='flex item-center text-xl'>
          <FaBars className='text-white me-4 mt-1 cursor-pointer' onClick={this.toggleNavbar} />
          <span className='text-white font-semibold'> Product Management System</span>
        </div>

        <div className='item-center flex gap-x-5'>
          <div className='relative md:w-65'>
            <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
              <button className='p-0 focus:outline-none text-black md:text-black'>
                <FaSearch />
              </button>
            </span>
            <input type='text' className='w-full px-4 py-1 pl-12 rounded shadow outline-none md:black' />
          </div>

          <div className='text-white'>
            <FaBell className='w-6 h-6'></FaBell>
          </div>

          <div className='relative'>
            <button className='text-white group'>
              <FaUserCircle className='w-6 h-6 mt-1'/>
              <div className='z-10 rounded-lg absolute bg-white hidden shadow w-32 group-focus:block top-full right-0'>
              <ul className='py-2 text-sm text-gray-950'>
                <li><a href=''>Profile</a></li>
                <li><a href=''>Settings</a></li>
                <li><a href=''>Log out</a></li>
              </ul>
              </div>
              
            </button>
          </div>
        </div>
      </nav>



      // <header>
      //   <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
      //     <NavbarBrand tag={Link} to="/">PMS</NavbarBrand>
      //     <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
      //     <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
      //       <ul className="navbar-nav flex-grow">
      //         <NavItem>
      //           <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
      //         </NavItem>
      //         <NavItem>
      //           <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
      //         </NavItem>
      //         <NavItem>
      //           <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
      //         </NavItem>
      //       </ul>
      //     </Collapse>
      //   </Navbar>
      // </header>
    );
  }
}
