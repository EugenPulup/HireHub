<script setup>
definePageMeta({
  name: "index",
  title: "Dashboard",
  icon: "i-mage-dashboard-bar",
});

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
];
</script>

<template>
  <section class="grid grid-rows-3 grid-cols-3 size-full gap-5">
    <UCard
      class="row-span-1 col-span-1 size-full relative flex flex-col overflow-hidden"
      :ui="{
        body: { padding: '!py-2 !px-0', base: 'size-full' },
        header: { padding: 'p-2' },
      }"
    >
      <template #header> <span>Campaigns Done</span></template>
      <ShaAreaChart
        class="size-full"
        index="name"
        :data="data"
        :categories="['total']"
        :show-grid-line="false"
        :show-legend="false"
        :show-x-axis="false"
        :show-y-axis="false"
        :colors="['black']"
      />
    </UCard>

    <UCard
      class="row-span-1 col-span-1 size-full relative flex flex-col overflow-hidden"
      :ui="{
        body: { padding: '!py-2 !px-0', base: 'size-full' },
        header: { padding: 'p-2' },
      }"
    >
      <template #header> <span>Campaigns Active</span></template>
      <ShaAreaChart
        class="size-full"
        index="name"
        :data="data"
        :categories="['total']"
        :show-grid-line="true"
        :show-legend="false"
        :show-x-axis="false"
        :show-y-axis="false"
        :colors="['black']"
      />
    </UCard>

    <UCard
      class="row-span-1 col-span-1 size-full relative flex flex-col overflow-hidden"
      :ui="{
        body: { padding: '!py-2', base: 'size-full' },
        header: { padding: 'p-2' },
      }"
    >
      <template #header> <span>Campaigns Failed</span></template>
      <ShaBarChart
        class="size-full"
        index="name"
        :data="data"
        :categories="['total']"
        :show-grid-line="false"
        :show-legend="false"
        :show-x-axis="false"
        :show-y-axis="false"
        :colors="['black']"
      />
    </UCard>

    <UCard
      class="row-span-2 col-span-3 size-full overflow-hidden flex flex-col"
      :ui="{
        body: { padding: '!py-4 !px-0', base: 'size-full' },
        header: { padding: 'p-4' },
      }"
    >
      <template #header> <span>Candidates</span></template>
      <ShaAreaChart
        class="size-full"
        index="name"
        :data="data"
        :categories="['total', 'predicted']"
        :show-grid-line="false"
        :show-legend="true"
        :show-x-axis="true"
        :show-y-axis="true"
        :y-formatter="
          (tick, i) => {
            return `${tick}`;
          }
        "
        :colors="['purple', 'black']"
      />
    </UCard>
  </section>
</template>
