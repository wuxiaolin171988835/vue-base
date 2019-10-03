<template>
  <div>
    <p>
      <slot name="header"></slot>
    </p>
    <slot></slot>
    <p>
      <slot name="footer"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "WSlot"
};
</script>

<style lang="scss" scoped>
</style>