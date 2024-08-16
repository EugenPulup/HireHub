<script setup lang="ts">
import { VisSingleContainer, VisDonut, VisTooltip } from "@unovis/vue";
import { Donut } from "@unovis/ts";

defineProps<{ data: number[] }>();
const value = (d: number) => d;

const triggers = {
  [Donut.selectors.segment]: (d: DataRecord) =>
    `<span>x :  ${d.x}<br / >y :  ${d.y}< / span>`,
};
</script>

<template>
  <VisSingleContainer :data="data">
    <VisDonut :value="value" centralLabel="Salary" />
    <VisTooltip :triggers="triggers" />
  </VisSingleContainer>
</template>
