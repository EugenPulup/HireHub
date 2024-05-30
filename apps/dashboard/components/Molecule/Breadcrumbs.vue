<script setup lang="ts">
import type { RouteRecordNormalized } from "vue-router";

const router = useRouter();
const route = useRoute();
const breadcrumbs = ref([]) as Ref<RouteRecordNormalized[]>;

watch(
  () => route.name,
  () => {
    console.log("Route changed");
    breadcrumbs.value = [];

    const allRoutes = router.getRoutes();
    let hasNextRoute = true;
    let currentRoute = allRoutes.find((item) => item.name === route.name);

    let count = 0;

    while (hasNextRoute) {
      console.log("Looping", count++);
      if (currentRoute) {
        breadcrumbs.value.unshift(currentRoute);

        if (!currentRoute.meta.parent) {
          console.log("No parent");
          hasNextRoute = false;
          continue;
        }

        currentRoute = allRoutes.find(
          (item) => item.name === currentRoute?.meta.parent
        );

        if (!currentRoute) hasNextRoute = false;
      } else {
        hasNextRoute = false;
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <Breadcrumb v-if="breadcrumbs.length">
    <BreadcrumbList>
      <template v-for="(item, index) of breadcrumbs" :key="item.name">
        <BreadcrumbSeparator v-if="!!index" />

        <BreadcrumbItem>
          <BreadcrumbLink>
            <NuxtLink :to="{ name: item.name }">
              {{ item.meta.title }}
            </NuxtLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
