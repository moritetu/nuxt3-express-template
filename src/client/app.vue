<script lang="ts" setup>
const config = useRuntimeConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${config.public.appName}` : config.public.appName
  },
})
</script>

<template>
  <div class="wrapper">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
