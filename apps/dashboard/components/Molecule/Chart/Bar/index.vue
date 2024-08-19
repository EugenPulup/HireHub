<script setup>
import {
  VisXYContainer,
  VisStackedBar,
  VisTooltip,
  VisAxis,
} from "@unovis/vue";

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
    <VisStackedBar :x="(d, i) => i" :y="y" :bar-padding="0.05" />
    <VisAxis
      type="x"
      :tick-format="xFormatter ?? ((v) => data[v]?.[index])"
      :grid-line="false"
      :tick-line="false"
    />
    <VisAxis
      type="y"
      :tick-format="xFormatter ?? ((v) => data[v]?.[index])"
      :grid-line="false"
      :tick-line="false"
    />
  </VisXYContainer>
</template>
