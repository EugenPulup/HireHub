<script setup lang="ts"></script>

<template>
  <section class="flex">
    <SICNavBar class="border-r"> </SICNavBar>

    <div class="flex flex-col size-full gap-2">
      <div class="h-14 w-full flex items-center px-2 border-b border-1">
        <MoleculeBreadcrumbs />
      </div>
      <UContainer class="size-full border-2 max-h-screen">
        <slot />
      </UContainer>
    </div>
  </section>
</template>
