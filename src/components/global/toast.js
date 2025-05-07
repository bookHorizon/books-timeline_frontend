import { ElNotification } from 'element-plus'
const toast = (title, message, duration=0) => {
  ElNotification({
    title: title,
    message: message,
    duration: duration,
  })
}

export default toast