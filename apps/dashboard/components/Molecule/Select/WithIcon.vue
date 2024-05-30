<script setup>
defineProps({
  placeholder: {
    type: String,
    default: "Select an option",
  },
  items: {
    type: [{ value: String, label: String, icon: String }],
    default: () => [],
  },
  selectedItem: {
    type: { value: String, label: String, icon: String },
    default: null,
  },
  collapsed: Boolean,
});
</script>

<template>
  <Select>
    <SelectTrigger>
      <SelectValue :placeholder="placeholder">
        <Icon :name="selectedItem.icon" class="mr-2 size-4" />
        {{ selectedItem.label }}
      </SelectValue>
    </SelectTrigger>

    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="item of items" :value="item.value">
          <Icon :name="item.icon" class="mr-2 size-4" />
          {{ item.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
