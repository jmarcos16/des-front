<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api";
import Button from "../../components/Button.vue";
import { useRouter } from "vue-router";
import Link from "../../components/Link.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { component as VueNumber } from '@coders-tm/vue-number-format'

const router = useRouter();
const productTypes = ref([]);
const price = ref(0);

const fetchProductTypes = async () => {
    const response = await api.get("product-types/all");
    productTypes.value = response.data;
};

const schema = yup.object({
    name: yup.string().required("O nome é obrigatório"),
    price: yup.string().required("O preço é obrigatório"),
    product_type_id: yup.string().required("O tipo é obrigatório"),
});

const handleSubmit = async (values) => {
    try {
        await api.post("products", values);
        router.push("/products");
    } catch (error) {
        console.error(error);
    }
};

const number = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    masked: true,
};

const handleChange = (value) => {
    price.value = value;
};

const handleBlur = (value) => {
    price.value = value;
};

onMounted(() => {
    fetchProductTypes();
});
</script>
<template>
    <div class="py-12">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="p-8 bg-white shadow rounded-lg">
                    <div class=" space-y-4">
                        <header>
                            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Informações do produto
                            </h2>
                            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Preencha os campos abaixo para adicionar um novo produto.
                            </p>
                        </header>
                        <Form @submit="handleSubmit" :validation-schema="schema">
                            <div class="grid grid-cols-1 gap-6">
                                <div>
                                    <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
                                    <Field name="name" type="name" class="border border-gray-200 rounded-lg px-4 py-2 w-full" />
                                    <ErrorMessage name="name" class="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label for="price" class="block text-sm font-medium text-gray-700">Preço</label>
                                    <Field name="price" v-model="price" type="price" v-slot="{ handleChange, handleBlur }">
                                        <VueNumber
                                            class="border border-gray-200 rounded-lg px-4 py-2 w-full"
                                            name="price"
                                            v-bind="number"
                                            :modelValue="price"
                                            @change="handleChange"
                                            @blur="handleBlur"
                                        />
                                    </Field>
                                    <ErrorMessage name="price" class="text-red-500 text-sm" />
                                </div>
                                
                                <div>
                                    <label for="product_type_id" class="block text-sm font-medium text-gray-700">Tipo</label>
                                    <Field name="product_type_id" as="select" class="border border-gray-200 rounded-lg px-4 py-2 w-full">
                                        <option value="">Selecione um tipo</option>
                                        <option v-for="type in productTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
                                    </Field>
                                    <ErrorMessage name="product_type_id" class="text-red-500 text-sm" />
                                </div>

                            </div>
                            <div class="mt-8 f flex justify-between">
                                <Link url="/products">Cancelar</Link>
                                <Button type="submit">Adicionar produto</Button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    </div>
</template>