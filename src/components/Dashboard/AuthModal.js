import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: 4
}
function AuthModal ({ open, onAuthSuccessful }) {
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (username == 'Admin' && password == 'Mash@123') {
      onAuthSuccessful()
    } else {
      setError('invalid username or password')
    }
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{ overflow: 'scroll' }}
        onClose={() => {}}
      >
        <div>
          <Box sx={{ ...style }}>
            <div class='mb-3'>
              <label for='username' class='form-label'>
                Username
              </label>
              <input
                type='text'
                class='form-control'
                id='username'
                placeholder='Enter username'
                value={username}
                onChange={e => {
                  setUsername(e.target.value)
                }}
              />
            </div>
            <div class='mb-3'>
              <label for='password' class='form-label'>
                Password
              </label>
              <input
                type='password'
                class='form-control'
                id='password'
                placeholder='Enter password'
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                }}
              />
              <button onClick={handleSubmit} className='btn btn-success my-4'>
                Submit
              </button>
              {error != '' ? (
                <div class='alert alert-danger' role='alert'>
                  {error}
                </div>
              ) : null}
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  )
}

export default AuthModal
