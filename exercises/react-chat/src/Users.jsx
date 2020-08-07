import React from 'react'
import PropTypes from 'prop-types'
import './Users.css'

const Users = ({ users }) => {
  return (
    <div className="users">
      <h2>{'Who\'s online ?'}</h2>
      <ul>{users.map(user => <li key={user}>{user}</li>)}</ul>
    </div>
  )
}

export default Users

Users.propTypes = {
  users: PropTypes.array
}