import React from 'react'
import UserAvatar from '../UserAvatar'

export const ChatLink = (props) => {
    console.log('props', props.threadArray)
    const messages = props.threadArray.filter(array => array.length > 0)
    console.log(messages)
    const { author, date, isRead, messageText } = props.thread
    return (
        <div className={`chat-link-container ${isRead ? 'inactive' : 'active'}`}>
            <UserAvatar />
            <div className='chat-link-details-container'>
                <div className='chat-name-and-message'>
                    <div className='chat-link-name'>{author.name}</div>
                    <div>{messageText}</div>
                </div>
                <div className='chat-date'>{date.toLocaleDateString()}</div>
            </div>

        </div>
    )
}