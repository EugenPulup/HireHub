<script setup>
defineProps({
  isCollapsed: Boolean,
  links: Array,
});
</script>

<template>
  <div
    :data-collapsed="isCollapsed"
    class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
  >
    <nav
      class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
    >
      <template v-for="(link, index) of links">
        <Tooltip v-if="isCollapsed" :key="`1-${index}`" :delay-duration="0">
          <TooltipTrigger as-child>
            <NuxtLink :to="{ name: link.name }" tabindex="-1">
              <Button size="sm" variant="ghost">
                <Icon :name="link.icon" color="black" class="size-6" />
                <span class="sr-only">{{ link.title }}</span>
              </Button>
            </NuxtLink>
          </TooltipTrigger>
          <TooltipContent side="right" class="flex items-center gap-4">
            {{ link.title }}
            <span v-if="link.label" class="ml-auto text-muted-foreground">
              {{ link.label }}
            </span>
          </TooltipContent>
        </Tooltip>

        <Button v-else :key="`2-${index}`" size="sm" variant="ghost">
          <NuxtLink
            :to="{ name: link.name }"
            tabindex="-1"
            class="size-full flex justify-between items-center"
          >
            <Icon :name="link.icon" class="mr-2 size-6" />
            {{ link.title }}
            <span
              v-if="link.label"
              :class="
                cn(
                  'ml-auto',
                  link.variant === 'default' &&
                    'text-background dark:text-white'
                )
              "
            >
              {{ link.label }}
            </span>
          </NuxtLink>
        </Button>
      </template>
    </nav>
  </div>
</template>
