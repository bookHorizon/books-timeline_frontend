import { userStartCountTime, userStopCountTime } from './useCountTime.js'

// 使用者點擊首頁畫面中可跳頁的按鈕必須停止計算

const userClickButtonToStopCounting = (startTime) => {
  return userStopCountTime(startTime);
}

// 使用者按瀏覽器中或者使用各種快捷回到上一頁or 判斷使用者關閉視窗，如果關閉就停止計算
// 回到的上一頁是別的網站
// 回到的上一頁是書海藍圖

const backToPreviousPage = () => {
  return window.addEventListener('beforeunload', () => {
    return userStopCountTime(startTime);
  })
}

// 4.使用者可能沒有關閉或離開頁面，但將其最小化或切換到其他標籤頁時，停止計算
// mobile應用切換到背景（使用 Page Visibility API）
// 6.Mobile 裝置特殊處理 行動裝置可能會有額外的事件需要處理：
// 裝置休眠

const hideWindow = () => {
  return window.addEventListener('visibilitychange', () => {
    return userStopCountTime(startTime);
  })
}
// 5.網路連接中斷，停止計算
const networkDisconnection = () => {
  return window.addEventListener('offline', () => {
    return userStopCountTime(startTime);
  })
}
