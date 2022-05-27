<template>
  <div class="title">
    <slot>
      <span>爆款推荐</span>
    </slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.title {
  width: 100%;
  text-align: center;
  font-size: 16px;
  padding: 16px 0;
  span {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: block;
      background: #d4c0a7;
      top: 50%;
      margin-top: -4px;
      right: -0.5rem;
    }
    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: block;
      background: #d4c0a7;
      top: 50%;
      margin-top: -4px;
      right: 0;
      left: -0.5rem;
    }
  }
}
</style>
