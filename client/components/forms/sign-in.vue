<template>
  <Form
    @submit="onSubmit"
    class="flex w-full flex-col gap-4 dark:text-gray-200"
  >
    <p class="text-center text-3xl font-bold">Sign In</p>
    <p class="text-center text-xl">Welcome back!</p>
    <div class="flex flex-col">
      <Field
        name="email"
        type="email"
        placeholder="Email"
        class="rounded-lg border-2 border-sky-400 px-2 py-1 text-lg dark:border-gray-600 dark:bg-slate-900"
      />
    </div>

    <div class="flex flex-col gap-1">
      <Field
        name="password"
        type="password"
        placeholder="Password"
        class="rounded-lg border-2 border-sky-400 px-2 py-1 text-lg dark:border-gray-600 dark:bg-slate-900"
      />
    </div>

    <button
      type="submit"
      class="rounded-lg bg-sky-400 p-2 text-xl font-bold text-white dark:bg-sky-900 dark:hover:bg-sky-800"
    >
      Sign In
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/stores/user";

const onSubmit = async (values: any) => {
  const userStore = useUserStore();

  await userStore.signIn(values.email, values.password);

  if (userStore.token) {
    await navigateTo("/learn");
  }
};
</script>
