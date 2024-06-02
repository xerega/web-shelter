<template>
  <div class="mx-auto flex w-[48rem] flex-col gap-12 p-4 dark:text-gray-200">
    <h1 class="text-3xl font-bold">Settings</h1>

    <div>
      <h2 class="text-2xl font-bold">Appearance</h2>
      <div
        class="mt-4 flex cursor-pointer items-center justify-between rounded-xl border-2 border-gray-200 p-4 dark:border-gray-600"
        @click="toggleTheme"
      >
        <p class="text-xl">Dark theme</p>
        <div
          class="flex h-8 w-14 items-center rounded-full bg-gray-300 p-1 duration-300 ease-in-out"
          :class="{ 'bg-sky-500': enabled }"
        >
          <div
            class="h-6 w-6 transform rounded-full bg-white shadow-md duration-300 ease-in-out"
            :class="{ 'translate-x-6': enabled }"
          ></div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold">Profile</h2>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "sidebar",
});

const { enabled, toggleTheme } = useTheme();
</script>

<style></style>
