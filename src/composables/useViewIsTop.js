import { ref, onBeforeUnmount } from 'vue'
export const isTop = ref(true);
export function useScrollTopDetection() {

  const originalPosition = ref(null);
  let observer = null;

  // 初始化並連接 MutationObserver
  const connect = (element) => {
    if (!element) return;
    
    // 保存元素的初始頂部位置
    originalPosition.value = element.getBoundingClientRect().top;
    
    // 創建 observer 實例
    observer = new MutationObserver(() => {
      // 在 DOM 變化時檢查位置
      checkPosition(element);
    });
    
    // 設置觀察選項
    const config = { attributes: true, childList: true, subtree: true };
    
    // 開始觀察
    observer.observe(document.body, config);
    
    // 同時監聽滾動事件作為備份
    window.addEventListener('scroll', () => checkPosition(element));
    
    // 初始檢查
    checkPosition(element);
  };
  
  // 檢查位置的函數
  const checkPosition = (element) => {
    if (!element || originalPosition.value === null) return;
    const currentTop = element.getBoundingClientRect().top;
    isTop.value = Math.abs(currentTop - originalPosition.value) < 1;
  };
  
  // 斷開連接
  const disconnect = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    window.removeEventListener('scroll', checkPosition);
  };
  
  onBeforeUnmount(disconnect);
  
  return {
    connect,
    disconnect
  };
}