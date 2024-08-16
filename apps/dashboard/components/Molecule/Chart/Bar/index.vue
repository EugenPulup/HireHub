<script setup>
import { VisXYContainer, VisStackedBar, VisTooltip } from "@unovis/vue";

import { StackedBar } from "@unovis/ts";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  xField: {
    type: String,
    required: true,
  },
  yField: {
    type: String,
    required: true,
  },
});
const x = (d) => d[props.xField];
const y = (d) => d[props.yField];

const triggers = {
  [StackedBar.selectors.bar]: (d) =>
    `<span>${props.xField} :  ${d[props.xField]}<br / > ${props.yField} :  ${d[props.yField]}</span>`,
};
</script>

<template>
  <VisXYContainer :data="data">
    <VisStackedBar :x="x" :y="y" :barPadding="0.5" :barMinHeight1Px="true" />
    <VisTooltip :triggers="triggers" />
    <VisAxis :gridLine="true" type="x" />
  </VisXYContainer>
</template>
