<script setup lang="ts">
import {
  RangeAnalyticDocument,
  GroupByFieldDocument,
} from "@/generated/analytic/graphql.js";
import dayjs from "dayjs";
import CustomTooltip from "@/components/Molecule/Chart/Tooltip.vue";
import CustomExperienceTooltip from "@/components/Molecule/Chart/ExperienceTooltip.vue";

import type {
  RangeAnalyticQuery,
  GroupByFieldQuery,
  GroupByFieldQueryVariables,
} from "@/generated/analytic/graphql.js";

definePageMeta({
  name: "index",
  title: "Dashboard",
  icon: "i-mage-dashboard-bar",
});

const { loading: rangeAnalyticPending, result: rangeAnalytic } =
  useQuery<RangeAnalyticQuery>(
    RangeAnalyticDocument,
    {
      range: 31,
    },
    { clientId: "analytic", fetchPolicy: "no-cache" }
  );

const { loading: experienceAnalyticPending, result: experienceAnalytic } =
  useQuery<GroupByFieldQuery>(
    GroupByFieldDocument,
    {
      groupAnalyticInput: { field: "yearsOfExperience" },
    } as GroupByFieldQueryVariables,
    { clientId: "analytic", fetchPolicy: "no-cache" }
  );

const { loading: ageAnalyticPending, result: ageAnalytic } =
  useQuery<GroupByFieldQuery>(
    GroupByFieldDocument,
    {
      groupAnalyticInput: { field: "age" },
    } as GroupByFieldQueryVariables,
    { clientId: "analytic", fetchPolicy: "no-cache" }
  );

const { loading: workLocationAnalyticPending, result: workLocationAnalytic } =
  useQuery<GroupByFieldQuery>(
    GroupByFieldDocument,
    {
      groupAnalyticInput: { field: "workLocation" },
    } as GroupByFieldQueryVariables,
    { clientId: "analytic", fetchPolicy: "no-cache" }
  );

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 2000) + 1000,
    predicted: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jan 2",
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
  <section class="grid grid-rows-6 grid-cols-6 size-full gap-5">
    <UCard
      v-if="!ageAnalyticPending && ageAnalytic"
      class="row-span-3 col-span-2 size-full relative flex flex-col overflow-hidden"
      :ui="{
        body: { padding: '!py-2 !px-2', base: 'size-full' },
        header: { padding: 'p-2' },
      }"
    >
      <template #header> <span>Candidates By Age</span></template>
      <ShaBarChart
        class="size-full"
        index="metric"
        :data="ageAnalytic.GroupByField"
        :categories="['count']"
        :show-grid-line="true"
        :show-legend="false"
        :show-x-axis="true"
        :show-y-axis="true"
        :colors="['black']"
        :custom-tooltip="CustomExperienceTooltip"
      />
    </UCard>

    <UCard
      v-if="!experienceAnalyticPending && experienceAnalytic"
      class="row-span-3 col-span-2 size-full relative flex flex-col overflow-hidden"
      :ui="{
        body: { padding: '!py-2 !px-2', base: 'size-full' },
        header: { padding: 'p-2' },
      }"
    >
      <template #header>
        <span>Experiences Rates</span>
      </template>

      <ShaBarChart
        class="size-full"
        index="metric"
        :data="experienceAnalytic.GroupByField"
        :categories="['count']"
        :show-grid-line="true"
        :show-legend="false"
        :show-x-axis="true"
        :show-y-axis="true"
        :colors="['black']"
        :custom-tooltip="CustomExperienceTooltip"
      />
    </UCard>

    <UCard
      v-if="!workLocationAnalyticPending && workLocationAnalytic"
      class="row-span-3 col-span-2 size-full relative flex flex-col overflow-hidden"
      :ui="{
        body: { padding: '!py-2 !px-2', base: 'size-full' },
        header: { padding: 'p-2' },
      }"
    >
      <template #header>
        <span>Work Location</span>
      </template>

      <ShaBarChart
        class="size-full"
        index="metric"
        :data="workLocationAnalytic.GroupByField"
        :categories="['count']"
        :show-grid-line="true"
        :show-legend="false"
        :show-x-axis="true"
        :show-y-axis="true"
        :colors="['black']"
      />
    </UCard>

    <UCard
      v-if="!rangeAnalyticPending && rangeAnalytic"
      class="row-span-3 col-span-6 size-full overflow-hidden flex flex-col"
      :ui="{
        body: { padding: '!py-4 !px-0', base: 'size-full' },
        header: { padding: 'p-4' },
      }"
    >
      <template #header> <span>Candidates</span></template>
      <ShaAreaChart
        class="size-full"
        :data="rangeAnalytic.candidateRangeAnalytic"
        :categories="['count']"
        :show-grid-line="false"
        :show-legend="true"
        :show-x-axis="true"
        :show-y-axis="true"
        index="date"
        :colors="['green']"
        :custom-tooltip="CustomTooltip"
        :x-formatter="
          (tick, i, ticks) => {
            return `${dayjs(result?.candidateRangeAnalytic[i].date).format(
              'DD MMM'
            )}`;
          }
        "
      />
    </UCard>
  </section>
</template>
