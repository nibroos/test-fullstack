<template>
  <div class="flex flex-col gap-4">

    <Head>
      <Title>Transactions • {{ runtimeConfig.public.APP_NAME }}
      </Title>
      <Meta name="description" content="Halaman pengelolaan pengguna aplikasi koperasi" />
    </Head>
    <div
      class="flex flex-row sm:flex-col sm:gap-3 sm:px-4 sm:text-left sm:items-start sm:w-full justify-between items-center">
      <LazyPageTitleComponent text="Transactions" />
      <LazyButtonModalCreateTransactionComponent v-if="transactionsModal.create" />
      <div @click="transactionsModal.create = true"
        class="font-semibold sm:w-full text-white dark:text-white bg-emerald-500 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-center py-2 px-4 rounded-lg transition ease-in-out duration-200 sm:my-2 cursor-pointer">
        +Transaction
      </div>
    </div>
    <TransactionsListTableComponent />
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const transactionsModal = useTransactionsModal()

</script>