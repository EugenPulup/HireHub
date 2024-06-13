<script setup lang="ts">
const links = [
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Navigation",
    icon: "i-heroicons-square-3-stack-3d",
  },
  {
    label: "Breadcrumb",
    icon: "i-heroicons-link",
  },
];
</script>

<template>
  <section class="flex">
    <SICNavBar class="border-r"> </SICNavBar>

    <div class="flex flex-col size-full gap-2">
      <div class="h-14 w-full flex items-center px-2 border-b border-1">
        <UBreadcrumb :links="links" />
      </div>
      <UContainer class="size-full border-2 max-h-screen">
        <slot />
      </UContainer>
    </div>
  </section>
</template>
