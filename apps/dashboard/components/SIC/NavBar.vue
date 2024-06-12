<script setup>
const links = [
  { name: "Home", path: "/", icon: "i-mage-dashboard-bar" },
  { name: "Campaign", path: "/campaign", icon: "i-mage-megaphone-a" },
];
</script>

<template>
  <MoleculeResizableWrapper
    class="flex flex-col w-full py-3 h-screen gap-3 relative"
    :min-width="200"
    :max-width="300"
    :collapsed-width="60"
    :center-collapsed="true"
  >
    <template #default="{ isCollapsed }">
      <MoleculeSelectAccount class="px-2" :collapsed="isCollapsed" />

      <UDivider />

      <div
        v-for="link in links"
        :key="link.name"
        class="px-2 flex flex-col justify-center align-middle items-center"
      >
        <UButton
          v-if="isCollapsed"
          color="primary"
          size="xl"
          class="text-black dark:text-white"
          :icon="link.icon"
          variant="ghost"
          :square="true"
        />
        <UButton
          v-else
          color="primary"
          size="xl"
          class="w-full text-black dark:text-white"
          :icon="link.icon"
          variant="ghost"
          >{{ link.name }}</UButton
        >
      </div>
    </template>
  </MoleculeResizableWrapper>
</template>
