<script setup lang="ts">
const props = defineProps({
  table: {
    type: Object,
    required: true,
  },
});

const isFiltered = computed(
  () => props.table.getState().columnFilters.length > 0
);

const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: "radix-icons:question-mark-circled",
  },
  {
    value: "todo",
    label: "Todo",
    icon: "radix-icons:circle",
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: "radix-icons:stopwatch",
  },
  {
    value: "done",
    label: "Done",
    icon: "radix-icons:check-circled",
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: "radix-icons:cross-circled",
  },
];

const priorities = [
  {
    label: "Low",
    value: "low",
    icon: "radix-icons:arrow-down",
  },
  {
    label: "Medium",
    value: "medium",
    icon: "radix-icons:arrow-right",
  },
  {
    label: "High",
    value: "high",
    icon: "radix-icons:arrow-up",
  },
];
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter tasks..."
        :model-value="
          (table.getColumn('title')?.getFilterValue() as string) ?? ''
        "
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('title')?.setFilterValue($event.target.value)"
      />
      <MoleculeTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="statuses"
      />
      <MoleculeTableFacetedFilter
        v-if="table.getColumn('priority')"
        :column="table.getColumn('priority')"
        title="Priority"
        :options="priorities"
      />

      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Icon name="radix-icons:cross-circled" class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <MoleculeTableViewOptions :table="table" />
  </div>
</template>
