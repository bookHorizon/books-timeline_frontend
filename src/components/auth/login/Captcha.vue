<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { getCode } from '@/components/auth/login/getCaptchaCode.js';
const emits = defineEmits(['getVerityCode'])
//產生隨機碼
const verifyCode = ref('');

//建立refresh的ref，在mounted裡面手動綁事件
const refresh = ref(null);
//建立canvas的ref
const canvas = ref(null);

onMounted(() => {//同步為初始化的元素加上設定
  const canvasContext = canvas.value.getContext('2d');//渲染canvas使用的類型
  const canvaConfig = {
    codeLength: 4,
    contentWidth: 111,
    contentHeight: 40,
    backgroundColorMin: 190,
    backgroundColorMax: 250,
    fontSizeMin: 20,
    fontSizeMax: 25,
    colorMin: 50,
    colorMax: 150,
    lineColorMin: 40,
    lineColorMax: 180,
    dotColorMin: 0,
    dotColorMax: 255,
  }

  refresh.value.addEventListener('click', Captcha)//手動加上事件
  // watch(inputError, () => {
  //   if (inputError.refresh) {
  //     Captcha();
  //     //當驗證碼更新後，refresh的判斷要切換回去
  //     emits('refreshToggle')
  //   }
  // })


  Captcha();//初始化canvas
  function Captcha() {
    const randomNum = (min, max) => {//隨機數乘上不超過max到min的範圍
      return Math.floor(Math.random() * (max - min) + min);

    };

    const randomColor = (min, max) => {
      let r = randomNum(min, max);
      let g = randomNum(min, max);
      let b = randomNum(min, max);
      return `rgba(${r},${g}, ${b}, 1)`;
    };

    const drawLine = (ctx) => {
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = randomColor(canvaConfig.lineColorMin, canvaConfig.lineColorMax); //邊框顏色
        ctx.beginPath(); // 開啟繪圖
        ctx.moveTo( // 移動畫筆
          randomNum(0, canvaConfig.contentWidth),
          randomNum(0, canvaConfig.contentHeight)
        );
        ctx.lineTo( // 畫出線條
          randomNum(0, canvaConfig.contentWidth),
          randomNum(0, canvaConfig.contentHeight)
        );
        //ctx.closePath(); // 結束路徑，連接起點與終點，但因為是畫線條，所以不需要
        ctx.stroke(); // 畫出邊框
      }
    };

    const drawDot = (ctx) => {
      for (let i = 0; i < 10; i++) {
        ctx.fillStyle = randomColor(0, 255);
        ctx.beginPath(); // 開啟繪圖

        // 繪製弧形 arc(x, y, radius, startAngle, endAngle, anticlockwise)，單位 π
        // (x, y, 半徑, startAngle, endAngle, 順時或逆時)

        ctx.arc(
          randomNum(0, canvaConfig.contentWidth),
          randomNum(0, canvaConfig.contentHeight),
          1,
          0,
          2 * Math.PI // 2π = circle
          // 因為是畫整個 dot (circle) 所以不需要設定順時鐘或逆時鐘
        );
        ctx.fill(); // 把路徑的內部區域填充顏色，生成實心的圖形
      }
    };

    const drawText = (ctx, txt, i) => {
      ctx.fillStyle = randomColor(canvaConfig.colorMin, canvaConfig.colorMax);
      ctx.font = randomNum(canvaConfig.fontSizeMin, canvaConfig.fontSizeMax) + "px sans-serif";

      // 設定位置，(i + 1) 會讓文字逐漸向右
      let x = (i + 1) * (canvaConfig.contentWidth / (canvaConfig.codeLength + 1));
      let y = randomNum(canvaConfig.fontSizeMax, canvaConfig.contentHeight - 12);

      // 設定文字本身旋轉度數的範圍
      // let deg = randomNum(-45, 45);

      // 設置 canvas 畫布原點和旋轉角度
      ctx.translate(x, y); // translate(x,y) = 移動網格上的畫布
      // ctx.rotate((deg * Math.PI) / 180); // Math.PI = 圓周率
      ctx.fillText(txt, 0, 0); // fillText(canvas 繪製內容，x 方向偏移，y 方向偏移)

      // 校正座標原點和旋轉角度
      // ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    };

    const drawPic = () => {
      // 設定背景的顏色
      canvasContext.fillStyle = randomColor(
        canvaConfig.backgroundColorMin,
        canvaConfig.backgroundColorMax
      );
      canvasContext.fillRect(0, 0, canvaConfig.contentWidth, canvaConfig.contentHeight);

      drawLine(canvasContext);
      drawDot(canvasContext);
    };

    drawPic();
    verifyCode.value = getCode(canvaConfig, drawText, canvasContext);
    emits('getVerityCode', verifyCode.value);
  }
})



</script>
<template>
  <div class="verityCodeItem">
    <canvas ref="canvas" :width="111" :height="40" class="verityCodeItem__canvas"></canvas>
    <div>
      <span ref="refresh" class="verityCodeItem__refresh" style="cursor:pointer">
        <q-icon name="cached" size="20px"></q-icon>
        {{ $t('login.form.refreshVerificationCode') }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.verityCodeItem {
  display: flex;
  flex-grow: 1;

  &__canvas {
    margin-right: 16px;
    border-radius: 8px;
    border: 1px solid;
  }

  &__refresh {
    @include body-2-b;
    color: var(--text-color);
    white-space: nowrap;
    line-height: 2.5;
    text-decoration: underline;
  }
}
</style>
