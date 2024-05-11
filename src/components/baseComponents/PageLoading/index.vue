<template>
  <div class="loading-spinner"></div>
</template>

<script setup lang="ts"></script>
<style lang="less" scoped>
.loading-spinner {
  position: relative;
  position: fixed;
  top: 50%;
  right: 0;
  left: 0;
  width: 35px;
  height: 35px;
  margin: -18px auto 0;
  border: 2px solid transparent;
  border-top-color: #006db9;
  border-bottom-color: #006db9;
  border-radius: 100%;
  animation: spin 2s linear infinite;

  &::before {
    position: absolute;
    inset: 6px;
    content: '';
    border: 2px solid transparent;
    border-top-color: #00b7c7;
    border-bottom-color: #00b7c7;
    border-radius: 100%;
    animation: spin 1.5s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
