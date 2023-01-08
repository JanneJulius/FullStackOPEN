import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    renderNotification(state, action) {
      return state.concat({
        text: `${action.payload}`,
      })
    },
    removeNotification(state, action) {
      return state.filter(
        (notification) => !notification.text.includes(action.payload)
      )
    },
  },
})
 export const { renderNotification, removeNotification } = notificationSlice.actions

 export const setNotification = (content, time) => {
  //console.log(content)
  //console.log(time)
  return dispatch => {
    dispatch(renderNotification(content))
    setTimeout(() => {
      dispatch(removeNotification(content))
    }, time)
  }
}

 export default notificationSlice.reducer