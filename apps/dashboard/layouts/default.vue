<script setup>
const isCollapsed = ref(true);

const links = [
  {
    title: "Campaigns",
    label: "0",
    icon: "lucide:archive",
    variant: "ghost",
  },
];

const users = [
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: "ion:logo-vercel",
  },
  {
    label: "Alicia Koch",
    email: "alicia@gmail.com",
    icon: "mdi:google",
  },
  {
    label: "Alicia Koch",
    email: "alicia@me.com",
    icon: "bx:bxl-gmail",
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
        <div
          :class="
            cn(
              'flex h-[52px] items-center justify-center',
              isCollapsed ? 'h-[52px]' : 'px-2'
            )
          "
        >
          <MoleculeSelectAccount
            :is-collapsed="isCollapsed"
            :accounts="users"
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
