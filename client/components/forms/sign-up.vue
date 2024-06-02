<template>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    class="flex w-full flex-col gap-4 dark:text-gray-200"
  >
    <p class="text-center text-3xl font-bold">Sign Up</p>
    <p class="text-center text-xl">Welcome to Web Shelter</p>
    <div class="flex flex-col">
      <Field
        name="email"
        type="email"
        placeholder="Email"
        class="rounded-lg border-2 border-sky-400 px-2 py-1 text-lg dark:border-gray-600 dark:bg-slate-900"
      />
      <ErrorMessage name="email" class="ml-2 text-red-500" />
    </div>

    <div class="flex flex-col">
      <Field
        name="username"
        type="text"
        placeholder="Username"
        class="rounded-lg border-2 border-sky-400 px-2 py-1 text-lg dark:border-gray-600 dark:bg-slate-900"
      />
      <ErrorMessage name="username" class="ml-2 text-red-500" />
    </div>

    <div class="flex flex-col gap-1">
      <Field
        name="password"
        type="password"
        placeholder="Password"
        class="rounded-lg border-2 border-sky-400 px-2 py-1 text-lg dark:border-gray-600 dark:bg-slate-900"
      />
      <ErrorMessage name="password" class="ml-2 text-red-500" />
    </div>

    <div class="flex flex-col gap-1">
      <Field
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        class="rounded-lg border-2 border-sky-400 px-2 py-1 text-lg dark:border-gray-600 dark:bg-slate-900"
      />
      <ErrorMessage name="confirmPassword" class="ml-2 text-red-500" />
    </div>

    <button
      type="submit"
      class="rounded-lg bg-sky-400 p-2 text-xl font-bold text-white dark:bg-sky-900 dark:hover:bg-sky-800"
    >
      Sign Up
    </button>
  </Form>
</template>

<script lang="ts" setup>
import * as yup from "yup";

import { useUserStore } from "~/stores/user";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .test("passwords-match", "Passwords don't match", function (value) {
      return this.parent.password === value;
    }),
});

const onSubmit = async (values: any) => {
  const userStore = useUserStore();

  await userStore.signUp(values.email, values.username, values.password);

  if (userStore.token) {
    await navigateTo("/learn");
  }
};
</script>
