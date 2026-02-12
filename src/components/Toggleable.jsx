import { useState, forwardRef, useImperativeHandle } from 'react'


const Toggleable = forwardRef(( { buttonLabel, buttonLabel2, children }, ref ) => {

  const [visible, setVisible] = useState(false)

  const showWhenIsVisible = visible ? { 'display': '' } : { 'display': 'none' }
  const hideWhenIsVisible = visible ? { 'display': 'none' } : { 'display': '' }

  const setVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      setVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenIsVisible}>
        {children}
      </div>
      <button style={showWhenIsVisible} onClick={() => setVisibility()}> {buttonLabel} </button>
      <button style={hideWhenIsVisible} onClick={() => setVisibility()}> {buttonLabel2} </button>
    </div>
  )

})

Toggleable.displayName = 'Toggleable'

export default Toggleable