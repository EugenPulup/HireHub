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

const id = useId();

const resizableEl = ref<HTMLElement | null>(null);
const dragger = ref(null);
const isCollapsed = useState("isCollapsed", () => true);

const { elementX, elementWidth } = useMouseInElement(resizableEl);

const isHovering = computed(() => elementX.value < elementWidth.value + 50);

const { isDragging } = useDraggable(dragger, {
  onMove({ x }) {
    if (!!collapsedWidth && x <= minWidth) {
      isCollapsed.value = true;
    } else {
      isCollapsed.value = false;
    }

    if (resizableEl?.value) {
      const width = x;

      const Max_Width = isCollapsed.value
        ? collapsedWidth
        : Math.min(width, maxWidth);

      const Min_Width = isCollapsed.value
        ? collapsedWidth
        : Math.min(width, minWidth);

      resizableEl.value.style.minWidth = `${Min_Width}px`;
      resizableEl.value.style.maxWidth = `${Max_Width}px`;
    }
  },
  axis: "x",
});

defineExpose({
  isCollapsed,
});
</script>

<template>
  <div
    ref="resizableEl"
    class="relative"
    :key="id"
    :class="{
      'transition-all duration-100 ease-linear': isCollapsed,
      'items-center': centerCollapsed && isCollapsed,
    }"
    :style="`max-width: ${isCollapsed ? collapsedWidth : maxWidth}px; min-width: ${isCollapsed ? collapsedWidth : minWidth}px;`"
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
        class="absolute top-1/2 -right-2 h-6 w-1 rounded-full bg-gray-400 cursor-col-resize select-none"
      ></span>
    </Transition>
  </div>
</template>
