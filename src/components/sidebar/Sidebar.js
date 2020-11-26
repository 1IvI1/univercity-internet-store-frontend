import React from 'react'
import SidebarLink from './SidebarLink'
import '../../css/sidebar/Sidebar.css'

export default function Sidebar() {
    return( 
        <div className="sidebar-container">
            <SidebarLink to="/messages" title="Messages"/>
            <SidebarLink to="/news" title="News"/>
            <SidebarLink to="/subscriptions" title="Subscriptions"/>
        </div>
    )
} 