<script setup>
const { isMobileOrTablet } = useDevice();
const links = [
  { name: "Dashboard", path: "/", icon: "i-mage-dashboard-bar" },
  { name: "Campaign", path: "/campaign", icon: "i-mage-megaphone-a" },
  { name: "Candidates", path: "/candidates", icon: "i-mage-users" },
];
</script>

<template>
  <MoleculeResizableWrapper
    class="flex flex-col gap-2 w-full relative"
    :min-width="200"
    :max-width="300"
    :collapsed-width="60"
    :center-collapsed="true"
    :freeze-collapsed="isMobileOrTablet"
  >
    <template #default="{ isCollapsed }">
      <MoleculeSelectAccount
        class="basis-14 grid place-items-center content-center px-2 border-b-[1px]"
        :collapsed="isCollapsed"
      />

      <div
        v-for="link in links"
        :key="link.name"
        class="px-2 flex flex-col justify-center align-middle items-center"
      >
        <NuxtLink :to="link.path" class="w-full">
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
        </NuxtLink>
      </div>
    </template>
  </MoleculeResizableWrapper>
</template>
