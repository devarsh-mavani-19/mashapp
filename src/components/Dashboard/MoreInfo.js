import { Modal, Box } from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material'

import React from 'react'
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

const columns = [
  { name: 'company_name', label: 'Company name' },
  { name: 'call_ir', label: 'Call IR' },
  { name: 'put_ir', label: 'Put IR' },
  { name: 'cp_ratio', label: 'CP ratio' },
  { name: 'hvtf', label: 'HVTF' }
]

function MoreInfo ({ showMoreDetails, handleCloseModal }) {
  let theme = createTheme()
  theme = responsiveFontSizes(theme)
  let op = []

  const approve = async () => {
    console.log({
      collection_id: showMoreDetails.data.collection_id,
      status: 'approve'
    })
    const res = await fetch(
      `http://newmashserver.rpsoftech.net:3333/collection/status_collection`,
      {
        body: JSON.stringify({
          collection_id: showMoreDetails.data.collection_id,
          status: 'approve'
        }),
        headers: new Headers({ 'content-type': 'application/json' }),
        method: 'POST'
      }
    )
    const resJson = await res.json()
    console.log(resJson)
    handleCloseModal('Approved Successfully')
  }

  const reject = async () => {
    const res = await fetch(
      `http://newmashserver.rpsoftech.net:3333/collection/status_collection`,
      {
        body: {
          collection_id: showMoreDetails.data.collection_id,
          status: 'approve'
        },
        method: 'POST'
      }
    )
    const resJson = await res.json()
    handleCloseModal('Reject Successfully')
  }

  return (
    <Modal
      open={showMoreDetails.show}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      style={{ overflow: 'scroll' }}
      onClose={() => {
        handleCloseModal()
      }}
    >
      <div>
        <Box sx={{ ...style }}>
          <div className='d-flex justify-content-center flex-column align-items-center'>
            <img src={showMoreDetails.data.file_name} width={300} />
            <div className='p-2 m-3 d-flex justify-content-between w-100'>
              <h2>{showMoreDetails.data.nft_name}</h2>
              <h2>{showMoreDetails.data.price}</h2>
            </div>
            <p className='text-start w-100'>
              {showMoreDetails.data.description}
            </p>
            <div className='w-100 d-flex justify-content-between'>
              <button className='btn btn-success' onClick={approve}>
                Approve
              </button>
            </div>
          </div>
        </Box>
      </div>
    </Modal>
  )
}

export default MoreInfo
