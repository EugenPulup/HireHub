<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "@/components/ui/toast";

definePageMeta({
  name: "campaigns-create",
  title: "Create",
  parent: "campaigns",
});

const formSchema = toTypedSchema(
  z.object({
    campaign: z.string().min(2).max(50),
    keyword: z.string().min(6).max(50),
    providers: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    campaign: "",
    providers: [],
  },
});

const providers = [
  { id: "workua", label: "work UA", icon: "mdi:google" },
  { id: "robotaua", label: "Robota UA", icon: "mdi:amazon" },
  { id: "linkedin", label: "LinkedIn", icon: "bi:linkedin" },
];

const isValid = computed(() => {
  return Object.keys(errors.value).length === 0;
});

const onSubmit = handleSubmit((values) => {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
});
</script>

<template>
  <form class="size-full grid grid-cols-4 gap-5" @submit="onSubmit">
    <div class="col-span-2 flex flex-col gap-5">
      <FormField v-slot="{ componentField }" name="campaign">
        <FormItem class="max-w-sm">
          <FormLabel>Campaign Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="name..." v-bind="componentField" />
          </FormControl>
          <FormDescription>
            This is your campaign display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="keyword">
        <FormItem class="max-w-sm">
          <FormLabel>Position Keyword</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Senior Pomidor Developer"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription>
            Position keyword is the main search term for this campaign.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="col-span-2">
      <FormField name="providers">
        <FormItem>
          <div class="mb-4">
            <FormLabel class="text-base"> Providers </FormLabel>
            <FormDescription>
              Choose the providers you want to use for this campaign.
            </FormDescription>
          </div>

          <div class="flex flex-wrap gap-2">
            <FormField
              v-for="item in providers"
              v-slot="{ value, handleChange }"
              :key="item.id"
              type="checkbox"
              :value="item.id"
              :unchecked-value="false"
              name="providers"
            >
              <Tooltip :key="`1-${item.id}`" :delay-duration="1000">
                <TooltipTrigger as-child>
                  <FormItem
                    class="flex items-center justify-center size-24 border-2 rounded-lg relative curesor-pointer hover:scale-105"
                  >
                    <FormControl>
                      <Checkbox
                        :checked="value.includes(item.id)"
                        @update:checked="handleChange"
                        class="absolute opacity-0"
                      ></Checkbox>
                    </FormControl>

                    <FormLabel
                      class="size-full grid place-items-center z-10 -translate-y-0.5"
                    >
                      <Icon
                        :name="item.icon"
                        class="size-10 opacity-20 !text-black"
                        :class="{ '!opacity-100': value.includes(item.id) }"
                      ></Icon>
                    </FormLabel>
                  </FormItem>
                </TooltipTrigger>
                <TooltipContent side="bottom" class="flex items-center gap-4">
                  {{ item.label }}
                </TooltipContent>
              </Tooltip>
            </FormField>
          </div>

          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div
      class="absolute bottom-0 left-0 p-1 w-full flex justify-start gap-1 border-t-2"
    >
      <Button
        type="submit"
        variant="default"
        :class="{ '!opacity-50': !isValid }"
      >
        Create
      </Button>
      <NuxtLink :to="{ name: 'campaigns' }">
        <Button variant="destructive"> Cancel </Button>
      </NuxtLink>
    </div>
  </form>
</template>
