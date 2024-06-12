<script setup lang="ts">
import { useMouseInElement, useDraggable } from "@vueuse/core";

const {
  minWidth = 200,
  maxWidth = 300,
  collapsedWidth = null,
  centerCollapsed = false,
} = defineProps<{
  minWidth: number | 200;
  maxWidth: number | 300;
  collapsedWidth: number | null;
  centerCollapsed: boolean | false;
}>();

const resizableEl = ref<HTMLElement | null>(null);
const dragger = ref(null);
const isCollapsed = ref(false);
const collapseGap = 50;

const { elementX, elementWidth } = useMouseInElement(resizableEl);

const isHovering = computed(() => elementX.value < elementWidth.value + 50);

const { isDragging } = useDraggable(dragger, {
  onMove({ x }) {
    if (resizableEl?.value) {
      const width = isCollapsed.value
        ? collapsedWidth
        : Math.max(Math.min(x, maxWidth), minWidth);
      resizableEl.value.style.width = `${isCollapsed.value ? collapsedWidth : width}px`;
    }

    if (!!collapsedWidth && x <= collapsedWidth + collapseGap) {
      isCollapsed.value = true;
    } else {
      isCollapsed.value = false;
    }
  },
});

defineExpose({
  isCollapsed,
});
</script>

<template>
  <div
    ref="resizableEl"
    class="relative"
    :class="{
      'transition-all duration-100 ease-linear': isCollapsed,
      'items-center': centerCollapsed && isCollapsed,
    }"
    :style="`max-width: ${maxWidth}px; min-width: ${isCollapsed ? collapsedWidth : minWidth}px;`"
  >
    <slot :isCollapsed="isCollapsed" />
    <Transition
      appear
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      enter-active-class="transition ease-in duration-300"
      leave-active-class="transition ease-out duration-300"
    >
      <span
        v-if="isHovering || isDragging"
        ref="dragger"
        class="absolute top-1/2 -right-3 h-6 w-1 rounded-full bg-gray-400 cursor-col-resize select-none"
      ></span>
    </Transition>
  </div>
</template>
