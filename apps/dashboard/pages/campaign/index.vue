<script setup>
definePageMeta({
  name: "campaign",
  title: "Campaign",
  icon: "i-mage-megaphone-a",
});
</script>

<template>
  <div>
    <NuxtLink :to="{ name: 'campaign-create' }">Create Campaign</NuxtLink>
  </div>
</template>
