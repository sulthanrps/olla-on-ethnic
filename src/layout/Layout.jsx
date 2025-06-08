import React from "react";
import SideNavBar from "../components/sideNavBar";
import Header from "../components/header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex h-screen bg-[#F0F0F0]">
            <SideNavBar />
            <div className="flex-1 flex flex-col ml-[20%] overflow-hidden h-[200vh] bg-[#F0F0F0]">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}