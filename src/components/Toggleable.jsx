import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)


  const containerStyle = {
    margin: '20px 0'
  }

  const primaryButtonStyle = {
    padding: '10px 16px',
    backgroundColor: '#8c8d8f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.95rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }

  const cancelButtonStyle = {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem'
  }


  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const setVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      setVisibility
    }
  })


  return (
    <div style={containerStyle}>

      <div style={hideWhenVisible}>
        <button onClick={setVisibility} style={primaryButtonStyle}>
          {buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={setVisibility} style={cancelButtonStyle}>
          cancel
        </button>
      </div>

    </div>
  )
})

Toggleable.displayName = 'Toggleable'


export default Toggleable