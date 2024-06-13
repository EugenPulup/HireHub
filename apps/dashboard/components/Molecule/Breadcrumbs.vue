<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const breadcrumbs = ref([]) as Ref<
  { icon: string; label: string; to: string }[]
>;

watch(
  () => route.name,
  () => {
    breadcrumbs.value = [];

    const allRoutes = router.getRoutes();
    let hasNextRoute = true;
    let currentRoute = allRoutes.find((item) => item.name === route.name);

    while (hasNextRoute) {
      if (currentRoute) {
        breadcrumbs.value.unshift({
          label: currentRoute?.meta?.title as string,
          to: currentRoute.path,
          icon: currentRoute.meta.icon as string,
        });

        if (!currentRoute.meta.parent) {
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
  <UBreadcrumb :links="breadcrumbs" />
</template>
