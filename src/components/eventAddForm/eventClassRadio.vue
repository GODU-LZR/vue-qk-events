<template>
  <div class="custom-radio-group">
    <div
        v-for="option in options"
        :key="option.value"
        class="custom-radio-button"
        :class="{ 'is-checked': selectedValue === option.value }">
      {{ option.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "eventClassRadio",
  props: {
    options: {
      type: Array,
      required: true,
    },
    selectedValue: {
      type: [String, Number],
      required: true,
      default: 0
    },
  },
};
</script>

<style scoped>
.custom-radio-group {
  display: flex;
}

.custom-radio-button {
  padding: 6px 25.4px; /* 按钮内边距 */
  border: 1px solid #dcdfe6; /* 默认边框 */
  background-color: #fff; /* 默认背景色 */
  color: #606266; /* 默认文字颜色 */
  font-size: 14px;
  cursor: default; /* 禁用交互 */
  transition: background-color 0.2s, border-color 0.2s, color 0.2s; /* 过渡效果 */
  margin-left: -1px; /* 去掉按钮之间的间距 */
  line-height: 15px;
}

.custom-radio-button:first-child {
  border-top-left-radius: 4px; /* 第一个按钮左上角圆角 */
  border-bottom-left-radius: 4px; /* 第一个按钮左下角圆角 */
}

.custom-radio-button:last-child {
  border-top-right-radius: 4px; /* 最后一个按钮右上角圆角 */
  border-bottom-right-radius: 4px; /* 最后一个按钮右下角圆角 */
}

.custom-radio-button.is-checked {
  background-color: #409EFF; /* 选中背景色 */
  border-color: #409EFF; /* 选中边框颜色 */
  color: #fff; /* 选中文字颜色 */
  z-index: 1; /* 确保选中按钮在上层 */
}
</style>

<!--<template>-->
<!--  <div class="custom-radio-group">-->
<!--    <div-->
<!--        v-for="option in options"-->
<!--        :key="option.value"-->
<!--        class="custom-radio"-->
<!--        :class="{ 'is-checked': selectedValue === option.value }">-->
<!--      <span class="custom-radio__inner"></span>-->
<!--      <span class="custom-radio__label">{{ option.label }}</span>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "eventClassRadio",-->
<!--  props: {-->
<!--    options: {-->
<!--      type: Array,-->
<!--      required: true,-->
<!--    },-->
<!--    selectedValue: {-->
<!--      type: [String, Number],-->
<!--      required: true,-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.custom-radio-group {-->
<!--  display: flex;-->
<!--  gap: 20px; /* 选项间距 */-->
<!--}-->

<!--.custom-radio {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  cursor: default; /* 禁用交互 */-->
<!--}-->

<!--.custom-radio__inner {-->
<!--  width: 14px;-->
<!--  height: 14px;-->
<!--  border: 1px solid #dcdfe6; /* 默认边框 */-->
<!--  border-radius: 50%; /* 圆形 */-->
<!--  position: relative;-->
<!--}-->

<!--.custom-radio__inner::after {-->
<!--  content: "";-->
<!--  width: 8px;-->
<!--  height: 8px;-->
<!--  background-color: transparent; /* 默认透明 */-->
<!--  border-radius: 50%;-->
<!--  position: absolute;-->
<!--  top: 50%;-->
<!--  left: 50%;-->
<!--  transform: translate(-50%, -50%);-->
<!--}-->

<!--.custom-radio.is-checked .custom-radio__inner {-->
<!--  border-color: #409EFF; /* 选中边框颜色 */-->
<!--}-->

<!--.custom-radio.is-checked .custom-radio__inner::after {-->
<!--  background-color: #409EFF; /* 选中背景颜色 */-->
<!--}-->

<!--.custom-radio__label {-->
<!--  margin-left: 8px; /* 标签与圆圈的间距 */-->
<!--  font-size: 14px;-->
<!--  color: #606266; /* 默认文字颜色 */-->
<!--}-->

<!--.custom-radio.is-checked .custom-radio__label {-->
<!--  color: #409EFF; /* 选中文字颜色 */-->
<!--}-->
<!--</style>-->