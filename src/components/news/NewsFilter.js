import React from 'react'
import '../../css/filter/Filter.css'
import filter from '../../assets/icons/filter.svg'

export default function Filter() {
    return (
        <div className="filter-container">
            <img src={filter} alt='Select Feed Filters' />
            Select Feed Filters
        </div>
    )
}