import React from 'react'
import download from '../../assets/icons/download.svg'

export const PostFile = () => {
    return(
        <div className='post-file-container'>
            <div className='post-file-name'>Отчет</div>
            <div className='download-link'>
                <img src={download} alt='Download' />
            </div>
        </div>
    )
}