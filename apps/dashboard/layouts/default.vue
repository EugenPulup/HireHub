<script setup>
const isCollapsed = ref(true);

const links = [
  {
    title: "Campaigns",
    label: "2",
    icon: "material-symbols:campaign-outline",
    variant: "ghost",
  },
  {
    title: "Updates",
    label: "342",
    icon: "lucide:alert-circle",
    variant: "ghost",
  },
  {
    title: "Forums",
    label: "128",
    icon: "lucide:message-square",
    variant: "ghost",
  },
  {
    title: "Shopping",
    label: "8",
    icon: "lucide:shopping-cart",
    variant: "ghost",
  },
  {
    title: "Promotions",
    label: "21",
    icon: "lucide:archive",
    variant: "ghost",
  },
];

const users = [
  {
    label: "John Doe",
    value: "john-doe",
    icon: "lucide:circle-user-round",
  },
];

function onCollapse() {
  isCollapsed.value = true;
}

function onExpand() {
  isCollapsed.value = false;
}
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      id="resize-panel-group-1"
      direction="horizontal"
      class="h-full items-stretch"
    >
      <ResizablePanel
        id="resize-panel-1"
        :default-size="256"
        :collapsed-size="4"
        collapsible
        :min-size="15"
        :max-size="20"
        :class="
          isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out'
        "
        class="h-screen"
        @expand="onExpand"
        @collapse="onCollapse"
      >
        <div class="p-2">
          <MoleculeSelectWithIcon
            :items="users"
            :selected-item="users[0]"
            :collapsed="isCollapsed"
          />
        </div>

        <Separator />
        <SICNavBar :is-collapsed="isCollapsed" :links="links" />
      </ResizablePanel>
      <ResizableHandle id="resize-handle-1" with-handle />
      <ResizablePanel class="h-screen p-2">
        <slot> </slot>
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>
