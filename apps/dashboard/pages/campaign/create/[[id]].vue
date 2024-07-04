<script setup lang="ts">
import {
  CreateCampaignDocument,
  CampaignByIdDocument,
  UpdateCampaignDocument,
} from "@/generated/graphql/graphql.js";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { params } = useRoute();

definePageMeta({
  name: `campaign-create`,
  title: "Campaign",
  icon: "i-mage-file-plus",
  parent: "campaign",
});
const schema = z.object({
  name: z.string().min(4, "Must be at least 4 characters"),
  keyword: z.string().min(6, "Must be at least 6 characters"),
  providers: z.array(z.string()).min(1, "At least one provider is required"),
  endType: z.string().min(1, "End type is required"),
});
const toast = useToast();
const form = ref<HTMLFormElement>();

type Schema = z.output<typeof schema>;

type Providers = "WORKUA" | "ROBOTAUA" | "LINKEDIN";

type CampaignEndType = "NEVER" | "DATE" | "COUNT";

const state = reactive<{
  name: string | undefined;
  keyword: string | undefined;
  providers: Providers[];
  endType: CampaignEndType;
}>({
  name: undefined,
  keyword: undefined,
  providers: ["WORKUA"],
  endType: "NEVER",
});

const providersList = ref<{ label: string; value: Providers; icon: string }[]>([
  {
    label: "LinkedIn",
    value: "LINKEDIN",
    icon: "i-bxl-linkedin-square",
  },
  {
    label: "Google",
    value: "WORKUA",
    icon: "i-bxl-google",
  },
  {
    label: "Amazon",
    value: "ROBOTAUA",
    icon: "i-bxl-amazon",
  },
]);

const endTypeList = ref<CampaignEndType[]>(["COUNT", "DATE", "NEVER"]);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const isUpdate = !!params.id;

  const result = await useMutation(
    isUpdate ? UpdateCampaignDocument : CreateCampaignDocument,
    {
      variables: isUpdate
        ? { updateCampaignInput: event.data, id: params.id }
        : { createCampaignInput: event.data },
    }
  ).mutate();

  const success = !result?.errors?.length;

  toast.add({
    title: success ? "Success" : "Error",
    description: success
      ? `Campaign ${isUpdate ? "Updated" : "Created"}`
      : `Error`,
    color: success ? "primary" : "red",
  });

  if (success) {
    navigateTo({ name: "campaign" });
  }
}

if (params.id) {
  const { data } = await useAsyncQuery(CampaignByIdDocument, {
    id: params.id as string,
  });

  const campaign = data.value?.campaignById;

  if (campaign) {
    state.name = campaign.name;
    state.keyword = campaign.keyword;
    state.providers = [...campaign.providers] as Providers[];
    state.endType = campaign.endType as CampaignEndType;
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <Teleport to="#nav-toolbar">
        <UButton class="w-fit" @click="form?.submit()"> Submit </UButton>
      </Teleport>
    </ClientOnly>
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="flex gap-10 w-full"
      @submit="onSubmit"
    >
      <div class="flex flex-col gap-4 basis-1/3">
        <UFormGroup size="lg" label="Name" name="name">
          <UInput
            v-model="state.name"
            placeholder="HireHub back-end June"
            icon="i-mage-bookmark-minus"
          />
        </UFormGroup>

        <UFormGroup
          size="lg"
          label="Keyword"
          name="keyword"
          help="Will be used as main search keyword"
        >
          <UInput
            v-model="state.keyword"
            placeholder="Senior Pomidor"
            hint="Required"
            icon="i-mage-stars-c"
          />
        </UFormGroup>

        <UFormGroup
          size="lg"
          label="Trigger of end"
          name="endType"
          help="Define when campaign should be stopped"
        >
          <USelectMenu v-model="state.endType" :options="endTypeList" />
        </UFormGroup>
      </div>

      <div class="flex flex-col gap-4 basis-2/3">
        <UFormGroup
          size="lg"
          label="Providers"
          name="providers"
          help="Providers to search for candidates"
        >
          <div class="flex gap-2">
            <div
              v-for="provider of providersList"
              class="size-32 border-2 rounded-xl grid place-items-center cursor-pointer"
              :class="
                state.providers.find((el) => el === provider.value)
                  ? 'border-black'
                  : 'border-gray-400'
              "
              @click="
                state.providers?.includes(provider.value)
                  ? state.providers.splice(
                      state.providers.indexOf(provider.value),
                      1
                    )
                  : state.providers.push(provider.value)
              "
            >
              <UIcon
                :name="provider.icon"
                class="size-16"
                :class="
                  state.providers.find((el) => el === provider.value)
                    ? 'text-black'
                    : 'text-gray-400'
                "
              />
            </div>
          </div>
        </UFormGroup>
      </div>
    </UForm>
  </div>
</template>
