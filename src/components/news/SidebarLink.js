import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SidebarLink({ to, title }) {
    return (
        <div className="sidebar-link-container">
            <NavLink to={to} activeStyle={{
                color: "black",
                background: " #deb916"
            }}>{title}</NavLink>
        </div>
    )
}