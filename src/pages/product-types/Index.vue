<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api";
import Button from "../../components/Link.vue";
import Pagination from "../../components/Pagination.vue";
import { formatCurrency } from "../../services/currency";

const productTypes = ref([]);

const fetchProductsTypes = async (page = 1) => {
    const { data } = await api.get(`product-types?page=${page}`);
    productTypes.value = data;
};

const updatePage = async (page) => {
    await fetchProductsTypes(page);
};

onMounted(async () => {
    await fetchProductsTypes();
});

</script>
<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between my-4">
            <h1 class="text-3xl font-bold text-gray-900">Tipos de produtos</h1>
            <Button url="/product-types/create">Adicionar novo</Button>
        </div>

      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">#ID</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Nome</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Percentual de imposto</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                <tr v-if="productTypes.data?.length" v-for="tipo in productTypes.data" :key="tipo.id">
                    <td class="px-6 py-4">{{ tipo.id }}</td>
                    <td class="px-6 py-4 w-2/4">{{ tipo.name }}</td>
                    <td class="px-6 py-4">{{ tipo.tax_percent }}%</td>
                </tr>
                <tr v-else>
                    <td class="px-6 py-4 text-center" colspan="5">Nenhum produto encontrado</td>
                </tr>
            </tbody>
        </table> 
      </div>
      <Pagination
        :key="1"
        @update::page="updatePage"
        v-if="productTypes.meta" :meta="productTypes.meta"/>
    </div>
  </div>
</template>
