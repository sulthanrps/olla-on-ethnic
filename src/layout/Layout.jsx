import React from "react";
import SideNavBar from "../components/sideNavBar";
import Navbar from "../components/navBar";

export default function Layout({ children }) {
    return (
        <div className="flex h-screen bg-[#F0F0F0]">
            <SideNavBar />
            <div className="flex-1 flex flex-col ml-[20%] overflow-hidden h-[200vh] bg-[#F0F0F0]">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-10">
                    {children}
                </main>
            </div>
        </div>
    )
}