const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const notificationStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    minWidth: '250px',
    maxWidth: '400px',
    padding: '16px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '1rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    animation: 'fadeIn 0.5s ease-in-out',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    textAlign: 'center',
    justifyContent: 'center'
  }

  const variants = {
    success: {
      backgroundColor: '#ecfdf5',
      color: '#065f46',
      border: '1px solid #10b981'
    },
    error: {
      backgroundColor: '#fef2f2',
      color: '#991b1b',
      border: '1px solid #ef4444'
    },
    info: {
      backgroundColor: '#eff6ff',
      color: '#1e40af',
      border: '1px solid #3b82f6'
    }
  }

  const activeStyle = { ...notificationStyle, ...variants[type || 'info'] }

  return (
    <div style={activeStyle}>
      {message}
    </div>
  )
}

export default Notification