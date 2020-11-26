import React from 'react'
import UserAvatar from '../UserAvatar'
import '../../css/post/Post.css'

export default function Post() {
    return(
        <div className="post-container">
            <div className="post-header">
                <UserAvatar />
            </div>
        </div>
    )
}