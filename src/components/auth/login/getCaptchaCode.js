import { ref } from 'vue';
export const getCode = (canvaConfig,drawText,canvasContext) => {
  const randomText = ref([])
  const letter = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let index = 0; index < canvaConfig.codeLength; index++) {
    const randomLetter = letter[Math.floor(Math.random() * 36)]
    randomText.value.push(randomLetter)
    drawText(canvasContext, randomLetter, index)
  }
  return randomText.value
}