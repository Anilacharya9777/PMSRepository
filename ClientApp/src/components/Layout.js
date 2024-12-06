import React, { Component, useState } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import Sidebar from './MasterPage/Sidebar';
import Dashboard from './MasterPage/Dashboard';


function Layout() {
  const[sidebarToggle,setSidebarToggle]=useState(false);
  return (
    <div className=''>
      <Sidebar sidebarToggle={sidebarToggle}/>
      <Dashboard sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
    </div>
  )
}

export default Layout

// export class Layout extends Component {
//   static displayName = Layout.name;

//   render() {
//     return (
//       <div>
//         <Sidebar/>
//         <Dashboard/>
//         {/* <NavMenu />
//         <Container>
//           {this.props.children}
//         </Container> */}
//       </div>
//     );
//   }
// }
