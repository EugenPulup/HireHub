<script setup lang="ts"></script>

<template>
  <section ref="container" class="flex">
    <SICNavBar class="border-r h-dvh"> </SICNavBar>

    <div class="flex flex-col size-full gap-1">
      <div
        class="h-14 w-full flex justify-between items-center px-2 border-b border-1"
      >
        <MoleculeBreadcrumbs />
        <div id="nav-toolbar" />
      </div>
      <section class="w-full py-2 px-3 h-[calc(100dvh-56px)] overflow-y-auto">
        <slot />
      </section>
    </div>
    <UNotifications />
  </section>
</template>
