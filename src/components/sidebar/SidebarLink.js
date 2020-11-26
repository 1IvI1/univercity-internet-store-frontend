import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SidebarLink({ to, title }) {
    return (
        <div className="sidebar-link-container">
            <NavLink to={to} activeStyle={{
                color: "white",
                background: "rgb(0, 64, 120)"
            }}>{title}</NavLink>
        </div>
    )
}