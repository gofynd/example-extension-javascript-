<template>
  <div class="loader">
    <img src="./../assets/gifs/loader.gif" />
    <div v-if="helperText">
      {{ helperText }}
    </div>
  </div>
</template>

<script setup>
// Define props using defineProps
const props = defineProps({
  helperText: {
    type: String,
    default: ''
  }
})

// Destructure props for easier use in the template
const { helperText } = props;
</script>

<style lang="less" scoped>
.loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 100px;
  }
}
</style>
