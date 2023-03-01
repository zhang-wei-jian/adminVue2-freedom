<template>
  <div>
    {{ name }}
  </div>
</template>

<script  setup>
import { ref, reactive } from "@vue/composition-api";
const name = ref("哈哈哈");
</script>

<style scoped></style>
