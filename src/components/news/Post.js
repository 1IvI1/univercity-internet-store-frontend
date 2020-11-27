import React, { useState } from 'react'
import UserAvatar from '../UserAvatar'
import '../../css/post/Post.css'
import { PostFile } from './PostFile'
import heartEmpty from '../../assets/icons/heart-empty.svg'
import heartFilled from '../../assets/icons/heart-filled.svg'
import add from '../../assets/icons/add-post.svg'
import comment from '../../assets/icons/comment.svg'
import added from '../../assets/icons/added.svg'

export default function Post() {
    const [isLiked, setIsLiked] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    return (
        <div className="post-container">
            <div className="post-header">
                <UserAvatar />
                <div className='post-headers'>
                    <div className='post-name'>
                        Лабораторная работа №1. Тема: создание чего-то там на python.
                    </div>
                    <div className='post-tags'>
                        <div>SBC</div>
                        <div>Falco Nicolai</div>
                        <div>Курс 3</div>
                        <div>Семестр 2</div>
                    </div>
                </div>
            </div>
            <div className='post-body'>
                <div className='post-files-wrapper'>
                    <PostFile />
                    <PostFile />
                    <PostFile />
                </div>
                <div className='post-description-wrapper'>
                    this work should be edited
                    because you may have a different
                    variant
                    DO NOT just copy-paste!
                </div>
            </div>
            <div className='post-footer'>
                <div className='post-buttons'>
                    {
                        !isLiked ? <img
                            src={heartEmpty}
                            alt='Like This Post'
                            onClick={() => setIsLiked(true)}
                        /> :
                            <img
                                src={heartFilled}
                                alt='Remove Like From This Post'
                                onClick={() => setIsLiked(false)} />
                    }
                    {
                        !isAdded ? <img
                            src={add}
                            alt='Add This Post To Your Collection'
                            onClick={() => setIsAdded(true)}
                        />
                            : <img
                                src={added}
                                alt='The Post Has Been Successfully Added'
                                onClick={() => setIsAdded(false)} />
                    }
                    <img src={comment} alt='Leave a Comment' />
                </div>
                <div className='post-date'>
                    23.11.2020 15:34
                </div>
            </div>
        </div>
    )
}