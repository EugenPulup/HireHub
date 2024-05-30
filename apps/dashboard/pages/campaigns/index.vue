<script setup>
definePageMeta({
  name: "campaigns",
  title: "Campaigns",
});
</script>

<template>
  <div>
    <NuxtLink :to="{ name: 'campaigns-create' }">
      <Button :variant="'default'"> Create Campaign </Button>
    </NuxtLink>
  </div>
</template>
