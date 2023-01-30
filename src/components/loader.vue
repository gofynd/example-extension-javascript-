<template>
  <div class="loader">
    <img src="./../assets/gifs/loader.gif" />
    <div v-if="props.helperText">
      {{ props.helperText }}
    </div>
  </div>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: "fp-extension-loader",
  setup() {
    const props = defineProps({
      helperText: {
        type: String,
        default: ''
      }
    })
    return { props }
  }
};
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
