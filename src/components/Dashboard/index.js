import React, { useEffect, useState } from 'react'
import {
  Alert,
  CircularProgress,
  createTheme,
  responsiveFontSizes
} from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { createPortal } from 'react-dom'
import MoreInfo from './MoreInfo'
import { ThemeProvider } from '@mui/styles'
import AuthModal from './AuthModal'

const columns = [
  {
    name: 'nft_name',
    label: 'Name',
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: 'description',
    label: 'Description',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'price',
    label: 'Price',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'image',
    label: 'image',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'action',
    label: 'Action',
    options: {
      filter: true,
      sort: false
    }
  }
]

const data = [
  { name: 'Joe James', company: 'Test Corp', city: 'Yonkers', state: 'NY' },
  { name: 'John Walsh', company: 'Test Corp', city: 'Hartford', state: 'CT' },
  { name: 'Bob Herm', company: 'Test Corp', city: 'Tampa', state: 'FL' },
  { name: 'James Houston', company: 'Test Corp', city: 'Dallas', state: 'TX' }
]

const options = {
  filterType: 'checkbox'
}

function Index () {
  let theme = createTheme()
  theme = responsiveFontSizes(theme)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [showingApproved, setShowingApproved] = useState(false)
  const [showMoreDetails, setShowMoreDetails] = useState({
    show: false,
    data: {}
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [toast, setToast] = useState({ show: false, message: '' })

  const handleCloseModal = message => {
    setShowMoreDetails({ show: false, data: {} })
    if (message == null || message == undefined) return
    setToast({ show: true, message: message })
  }

  console.log(`toast `, toast.show ? 'yes' : 'no')

  useEffect(async () => {
    loadNotApproved()
  }, [])

  const loadNotApproved = async () => {
    setShowingApproved(false)
    setLoading(true)
    const res = await fetch(
      `http://newmashserver.rpsoftech.net:3333/collection/get_collection`
    )
    const json = await res.json()
    let op = []
    for (let i = 0; i < json.length; i++) {
      if (json[i].approve != 0) continue
      op.push({
        ...json[i],
        image: <img src={json[i].file_name} width={80} />,
        action: (
          <button
            onClick={() => {
              setShowMoreDetails({
                show: true,
                data: {
                  ...json[i]
                }
              })
            }}
            className='btn btn-success'
          >
            View
          </button>
        )
      })
    }
    setLoading(false)
    setData(op)
  }

  const loadApproved = async () => {
    setShowingApproved(true)
    setLoading(true)
    const res = await fetch(
      `http://newmashserver.rpsoftech.net:3333/collection/get_collection`
    )
    const json = await res.json()
    let op = []
    for (let i = 0; i < json.length; i++) {
      if (json[i].approve != 1) continue
      op.push({
        ...json[i],
        image: <img src={json[i].file_name} width={80} />,
        action: (
          <button
            onClick={() => {
              setShowMoreDetails({
                show: true,
                data: {
                  ...json[i]
                }
              })
            }}
            className='btn btn-success'
          >
            View
          </button>
        )
      })
    }
    setLoading(false)
    setData(op)
  }

  let style1, style2
  style1 = showingApproved
    ? {
        cursor: 'pointer'
      }
    : {
        backgroundColor: '#0F062B',
        color: 'white',
        cursor: 'pointer'
      }

  style2 = showingApproved
    ? {
        backgroundColor: '#0F062B',
        color: 'white',
        cursor: 'pointer'
      }
    : {
        cursor: 'pointer'
      }

  return (
    <React.Fragment>
      <div className='main'>
        {showMoreDetails.show
          ? createPortal(
              <MoreInfo
                showMoreDetails={showMoreDetails}
                handleCloseModal={handleCloseModal}
              />,
              document.getElementById('loading_modal')
            )
          : null}

        {!isLoggedIn
          ? createPortal(
              <AuthModal
                open={!isLoggedIn}
                onAuthSuccessful={() => {
                  setIsLoggedIn(true)
                }}
              />,
              document.getElementById('loading_modal')
            )
          : null}

        <section className='company_details'>
          {toast.show ? (
            <Alert
              style={{
                background: '#071318',
                color: '#AFDCEF',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                marginBottom: '100px'
              }}
              severity='success'
              color='info'
            >
              {toast.message}
            </Alert>
          ) : null}

          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <h4
                  className='p-2 m-3 rounded text-center'
                  style={{ backgroundColor: '#0F062B', color: 'white' }}
                >
                  NFT Dashboard
                </h4>
              </div>
              <div class='col-4'>
                <div
                  onClick={loadNotApproved}
                  style={style1}
                  className='rounded'
                >
                  <p className='p-2 m-2'>New NFT</p>
                </div>
                <div className='rounded' onClick={loadApproved} style={style2}>
                  <p className='p-2 m-2'>Approved NFT</p>
                </div>
              </div>
              <div
                class='col-8'
                style={
                  loading ? { display: 'flex', justifyContent: 'center' } : {}
                }
              >
                {loading ? (
                  <CircularProgress
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    color='secondary'
                  />
                ) : null}
                <React.Fragment>
                  {data.length != 0 && !loading ? (
                    <ThemeProvider theme={theme}>
                      <MUIDataTable
                        data={data}
                        columns={columns}
                        options={options}
                        style={{ width: '100%' }}
                      />
                    </ThemeProvider>
                  ) : null}
                </React.Fragment>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Index
