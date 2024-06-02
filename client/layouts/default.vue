<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const { setTheme } = useTheme();

onMounted(() => setTheme());
</script>

<style></style>
