<script lang="ts" setup>
import {
  CandidatesDocument,
  RemoveCandidateDocument,
} from "@/generated/graphql/graphql.js";

import type {
  CandidatesQuery,
  Candidate,
  CandidatesQueryVariables,
} from "@/generated/graphql/graphql.js";

definePageMeta({
  name: "candidates",
  title: "Candidates",
  icon: "i-mage-users",
});

//================ CONST DATA ================//
const toast = useToast();

// Columns
const columns = [
  // {
  //   key: "id",
  //   label: "#",
  //   sortable: false,
  // },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "position",
    label: "Position",
    sortable: true,
  },
  {
    key: "salary",
    label: "Salary",
    sortable: true,
  },
  {
    key: "yearsOfExperience",
    label: "Experience",
    sortable: true,
  },
  {
    key: "createdAt",
    label: "Created Date",
    sortable: true,
  },
  // {
  //   key: "providers",
  //   label: "Providers",
  //   sortable: true,
  // },
  // {
  //   key: "endType",
  //   label: "End Type",
  //   sortable: false,
  // },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
  },
];

// Actions
const actions = [
  [
    {
      key: "completed",
      label: "Completed",
      icon: "i-heroicons-check",
    },
  ],
  [
    {
      key: "uncompleted",
      label: "In Progress",
      icon: "i-heroicons-arrow-path",
    },
  ],
];

// Filters
const statuses = [
  {
    key: "ACTIVE",
    label: "Active",
    value: true,
  },
  {
    key: "PAUSED",
    label: "Paused",
    value: false,
  },
  {
    key: "DELETED",
    label: "Deleted",
    value: false,
  },
  {
    key: "ENDED",
    label: "Ended",
    value: false,
  },
];

//================ VARIABLES ================//
const selectedColumns = ref(columns);
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column))
);

// Selected Rows
const selectedRows = ref<Candidate[]>([]);

const search = ref("");
const selectedStatus = ref([]);
const resetFilters = () => {
  search.value = "";
  selectedStatus.value = [];
};

// Pagination
const sort = ref({ column: "name", direction: "asc" as const });
const page = ref(1);
const pageTotal = ref(200); // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * variables.limit + 1);
const pageTo = computed(() =>
  Math.min(page.value * variables.limit, pageTotal.value)
);

//================ REQUEST ================//
const variables = reactive<CandidatesQueryVariables>({
  offset: 0,
  limit: 10,
  filterKey: null,
  filterValue: null,
  sortKey: sort.value.column,
  sortValue: sort.value.direction,
});

const {
  refetch: execute,
  loading: pending,
  result: data,
} = await useQuery<CandidatesQuery>(CandidatesDocument, variables, {
  fetchPolicy: "no-cache",
});

//================ Functions ================//
function selectRow(row) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selectedRows.value.push(row);
  } else {
    selectedRows.value.splice(index, 1);
  }
}

async function deleteCandidates() {
  const result = await useMutation(RemoveCandidateDocument, {
    variables: {
      removeCandidate: selectedRows.value.map((el) => el?.id),
    },
  }).mutate();

  if (!result?.data?.removeCandidate) {
    toast.add({
      title: "Error",
      description: `Unsuccessful deleting candidate...`,
      color: "red",
    });

    return;
  }

  toast.add({
    title: "Success",
    description: `Deleted ${selectedRows.value.length} candidates`,
    color: "primary",
  });

  selectedRows.value = [];
  execute();
}

//================ WATCHERS ================//
watch(page, (value) => {
  variables.offset = (value - 1) * variables.limit;
});

watch(selectedStatus, () => {
  variables.filterKey = "status";
  variables.filterValue = selectedStatus.value[0]?.key;
});

watch(sort, (value) => {
  variables.sortKey = value.column;
  variables.sortValue = value.direction;
});

watch(data, (value) => {
  if (value) {
    pageTotal.value = value.candidatesCount.count;
  }
});
</script>

<template>
  <UCard
    class="w-full"
    :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: {
        padding: '',
        base: 'divide-y divide-gray-200 dark:divide-gray-700',
      },
      footer: { padding: 'p-4' },
    }"
  >
    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput
        v-model="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Search..."
      />

      <USelectMenu
        v-model="selectedStatus"
        :options="statuses"
        multiple
        placeholder="Status"
        class="w-40"
      />
    </div>

    <!-- Header and Action buttons -->
    <div class="flex justify-between items-center w-full px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span class="text-sm leading-5">Rows per page:</span>

        <USelect
          v-model.number="variables.limit"
          :options="[3, 5, 10, 15, 20, 30, 40]"
          class="me-2 w-20"
          size="xs"
        />
      </div>

      <div class="flex gap-1.5 items-center">
        <UButton
          v-if="selectedRows.length >= 1"
          icon="i-mage-box-cross"
          size="xs"
          variant="outline"
          color="red"
          @click="deleteCandidates"
          >{{ selectedRows.length > 1 ? "Delete All" : "Delete" }}</UButton
        >

        <UDropdown
          v-if="selectedRows.length > 1"
          :items="actions"
          :ui="{ width: 'w-36' }"
        >
          <UButton
            icon="i-heroicons-chevron-down"
            trailing
            color="gray"
            size="xs"
          >
            Mark as
          </UButton>
        </UDropdown>

        <USelectMenu v-model="selectedColumns" :options="columns" multiple>
          <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
            Columns
          </UButton>
        </USelectMenu>

        <UButton
          icon="i-heroicons-funnel"
          color="gray"
          size="xs"
          :disabled="search === '' && selectedStatus.length === 0"
          @click="resetFilters"
        >
          Reset
        </UButton>
      </div>
    </div>

    <!-- Table -->
    <UTable
      v-model="selectedRows"
      v-model:sort="sort"
      :rows="data?.candidates"
      :columns="columnsTable"
      :loading="pending"
      sort-asc-icon="i-heroicons-arrow-up"
      sort-desc-icon="i-heroicons-arrow-down"
      sort-mode="manual"
      class="w-full"
      :ui="{
        td: { base: 'max-w-[0] truncate' },
        default: { checkbox: { color: 'gray' } },
      }"
      @select="selectRow"
    >
      <template #status-data="{ row }">
        <UBadge
          size="xs"
          :label="row.status === 'ACTIVE' ? 'Active' : 'Pause'"
          :color="row.status ? 'emerald' : 'orange'"
          variant="subtle"
        />
      </template>

      <template #endType-data="{ row }">
        <UBadge
          v-if="row.endType === 'COUNT'"
          size="xs"
          :label="'Count'"
          :color="'orange'"
          variant="subtle"
        />
        <UBadge
          v-else-if="row.endType === 'DATE'"
          size="xs"
          :label="'Date'"
          color="lime"
          variant="subtle"
        />
        <UBadge
          v-else
          size="xs"
          :label="'Never'"
          color="rose"
          variant="subtle"
        />
      </template>

      <template #actions-data="{ row }">
        <div class="flex gap-2">
          <NuxtLink :to="{ name: 'campaign-create', params: { id: row.id } }">
            <UButton
              icon="i-mage-edit"
              size="xs"
              variant="outline"
              color="primary"
              >Edit</UButton
            >
          </NuxtLink>
        </div>
      </template>

      <template #createdAt-data="{ row }">
        {{ useRelativeTime(row.createdAt) }}
      </template>
    </UTable>

    <!-- Number of rows & Pagination -->
    <template #footer>
      <div class="flex flex-wrap justify-between items-center">
        <div>
          <span class="text-sm leading-5">
            Showing
            <span class="font-medium">{{ pageFrom }}</span>
            to
            <span class="font-medium">{{ pageTo }}</span>
            of
            <span class="font-medium">{{ pageTotal }}</span>
            results
          </span>
        </div>

        <UPagination
          v-model="page"
          :page-count="variables.limit"
          :total="pageTotal"
          :ui="{
            wrapper: 'flex items-center gap-1',
            rounded: '!rounded-full min-w-[32px] justify-center',
            default: {
              activeButton: {
                variant: 'outline',
              },
            },
          }"
        />
      </div>
    </template>
  </UCard>
  <ClientOnly>
    <Teleport to="#nav-toolbar">
      <NuxtLink :to="{ name: 'campaign-create' }">
        <UButton variant="solid" icon="i-mage-plus">Create</UButton>
      </NuxtLink>
    </Teleport>
  </ClientOnly>
</template>
