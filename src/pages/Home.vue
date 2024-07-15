<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import Link from "../components/Link.vue";
import Button from "../components/Button.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { formatCurrency } from "../services/currency";
import { useRouter } from "vue-router";

const router = useRouter();
const products = ref([]);
const saleItems = ref([]);
const totalPurchase = ref(0);
const totalTaxes = ref(0);

const fetchProducts = async () => {
    const { data } = await api.get("products/all");
    products.value =  data;
};

const schema = yup.object({
    quantity: yup.number()
        .required("A quantidade é obrigatória")
        .min(1, "A quantidade deve ser maior que 0"),
});

const handleSubmit = async (values, { resetForm }) => {
    try {
        const product = products.value.find(product => product.id === values.product);
        const total = product.price * values.quantity;
        const taxes = total * (product.tax_percent / 100);
        totalPurchase.value += total;
        totalTaxes.value += taxes;

        saleItems.value.push({
            product: product.name,
            productId: product.id,
            quantity: values.quantity,
            price: product.price,
            taxes: taxes, 
            total: total,
        });

        resetForm();
    } catch (error) {
        console.error(error);
    }
};

const saveSale = async () => {
    try {
        await api.post("sales", { items: saleItems.value });
        saleItems.value = [];
        totalPurchase.value = 0;
        totalTaxes.value = 0;
        router.push("/sales");
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    fetchProducts();
});
</script>
<template>
    <div class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Nova compra</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Registre uma nova compra.</p>
                </div>
                <div class="border-t border-gray-200">
                    <Form @submit="handleSubmit" :validation-schema="schema">
                        <div class="px-4 py-5 sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="product" class="block text-sm font-medium text-gray-700">Produto</label>
                                    <Field name="product" as="select" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option value="">Selecione um tipo</option>
                                        <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
                                    </Field>
                                    <ErrorMessage name="product" class="text-red-500 text-sm" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="quantity" class="block text-sm font-medium text-gray-700">Quantidade</label>
                                    <Field name="quantity" type="number" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    <ErrorMessage name="quantity" class="text-red-500 text-sm" />
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-between px-4 py-4 items-center  bg-gray-50 border-t">
                            <div class="flex">
                                <div class="px-2">
                                    <h3 class="leading-6 text-gray-900">
                                        <span class="font-bold">Valor total:</span> {{ formatCurrency(totalPurchase) }}
                                    </h3>
                                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Valor total da compra.</p>
                                </div>
                                <div class="px-2">
                                    <h3 class="leading-6 text-gray-900">
                                        <span class="font-bold">Total impostos:</span> {{ formatCurrency(totalTaxes) }}
                                    </h3>
                                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Valor total da importação.</p>
                                </div>  
                            </div>
                            <div>
                                <Button type="submit" class="bg-gray-50 mr-2">Adicionar item</Button>
                                <Button type="button"
                                    @click="saveSale"
                                    class="bg-gray-50">Finalizar compra</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="mt-3">
                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">Itens da compra</h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">Lista de itens da compra.</p>
                    </div>
                    <div class="">
                        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                          <thead>
                            <tr>
                                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Produto</th>
                                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Quantidade</th>
                                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Valor unitário</th>
                                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Valor imposto</th>
                                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Valor total</th>
                            </tr>
                          </thead>
                            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                                <tr v-if="saleItems.length"
                                    v-for="item in saleItems" :key="item.product">
                                    <td class="px-6 py-4">{{ item.product }}</td>
                                    <td class="px-6 py-4">{{ item.quantity }}</td>
                                    <td class="px-6 py-4">{{ formatCurrency(item.price) }}</td>
                                    <td class="px-6 py-4">{{ formatCurrency(item.taxes) }}</td>
                                    <td class="px-6 py-4">{{ formatCurrency(item.total) }}</td>
                                </tr>
                                <tr v-else>
                                    <td class="px-6 py-4 text-center" colspan="5">Ainda não há itens na compra</td>
                                </tr>
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>