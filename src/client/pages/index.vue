<script setup lang="ts">
const { data } = await useFetch<{ message: string }>('http://localhost:3000/server/api/hello/say')
</script>

<template>
  <Card>
    <template #title> サンプル </template>
    <template #content>
      {{ data?.message }}
    </template>
    <template #footer>
      <Button icon="pi pi-check" label="Save" />
      <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: 0.5em" />
    </template>
  </Card>
</template>
