import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    const { status, content } = comment
    const renderContent =
      status === 'approved'
        ? content
        : status === 'pending'
        ? 'This comment is awaiting moderation'
        : status === 'rejected'
        ? 'This comment have been rejected'
        : '-'
    return <li key={comment.id}>{renderContent}</li>
  })
  return <ul>{renderedComments}</ul>
}

export default CommentList
