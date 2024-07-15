<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api";
import Button from "../../components/Link.vue";
import Pagination from "../../components/Pagination.vue";
import { formatCurrency } from "../../services/currency";

const products = ref([]);

const fetchProducts = async (page = 1) => {
    const { data } = await api.get(`products?page=${page}`);
    products.value = data;
};

const updatePage = async (page) => {
    await fetchProducts(page);
};

onMounted(async () => {
    await fetchProducts();
});

</script>
<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between my-4">
            <h1 class="text-3xl font-bold text-gray-900">Produtos</h1>
            <Button url="/products/create">Adicionar produto</Button>
        </div>

      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">#ID</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Nome</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Preço</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900 w-1/6">Tipo</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                <tr v-if="products.data?.length" v-for="product in products.data" :key="product.id">
                    <td class="px-6 py-4">{{ product.id }}</td>
                    <td class="px-6 py-4">{{ product.name }}</td>
                    <td class="px-6 py-4">{{ formatCurrency(product.price) }}</td>
                    <td class="px-6 py-4">{{ product.product_type }}</td>
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
        v-if="products.meta" :meta="products.meta"/>
    </div>
  </div>
</template>
