import React from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 hidden md:block">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="m-5">
        {children}
        </div>
       
      </div>
    </div>
  );
}

export default DashboardLayout;
