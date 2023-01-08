import { useSelector } from 'react-redux'

const Notification = () => {

  const notifications = useSelector((state) => state.notifications);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
    {notifications.length >= 1 && (
      <div style={style}>{notifications.slice(-1)[0].text}</div>
    )}
  </>
  )
}

export default Notification