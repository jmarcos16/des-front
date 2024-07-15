<script setup>
import { ref, onMounted } from 'vue'
import api from "../../services/api";
import Button from "../../components/Link.vue";
import Pagination from "../../components/Pagination.vue";
import { formatCurrency } from "../../services/currency";
import moment from "moment";

const sales = ref([]);

const fetchSales = async (page = 1) => {
    const response = await api.get(`sales?page=${page}`);
    console.log(response.data);
    sales.value = response.data;
};

const updatePage = async (page) => {
    await fetchSales(page);
};

onMounted(async () => {
    await fetchSales();
});
</script>
<template>
    <div class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between my-4">
                <h1 class="text-3xl font-bold text-gray-900">Ultimas compras</h1>
                <Button url="/">Nova compra</Button>
            </div>
    
          <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md">
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">#ID</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Valor total</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Valor imposto</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Total de produtos</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900 w-auto">Data</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                    <tr v-if="sales.data?.length" v-for="sale in sales.data" :key="sale.id">
                        <td class="px-6 py-4">{{ sale.id }}</td>
                        <td class="px-6 py-4">{{ formatCurrency(sale.total) }}</td>
                        <td class="px-6 py-4">{{ formatCurrency(sale.total_tax) }}</td>
                        <td class="px-6 py-4">{{ sale.items_count }}</td>
                        <td class="px-6 py-4">{{ moment(sale.created_at).format('DD/MM/YYYY, HH:mm') }}</td>
                    </tr>
                    <tr v-else>
                        <td class="px-6 py-4 text-center" colspan="5">Nenhum produto encontrado</td>
                    </tr>
                </tbody>
            </table> 
          </div>
          <Pagination
            @update::page="updatePage"
            v-if="sales.meta" :meta="sales.meta"/>
        </div>
      </div>
</template>