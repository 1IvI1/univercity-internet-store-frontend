import React from 'react'
import search from '../../assets/icons/dialogs-search.svg'

export const Search = () => {
    return (
        <div className='dialogs-search-container'>
            <img src={search} alt='Search Icon' className='search-icon-dialogs' />
            <input type='text' placeholder='Search' className='dialogs-search-input' />
        </div>
    )
}