<script setup>
import NavLink from './components/NavLink.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (href) => route.fullPath === href;
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="space-x-8 flex">
              <NavLink href="/" :active="isActive('/')">
                Início
              </NavLink>
              <NavLink href="/sales" :active="isActive('/sales')">
                Ultimas Vendas
              </NavLink>
              <NavLink href="/products" :active="isActive('/products')">
                Produtos
              </NavLink>
              <NavLink href="/product-types" :active="isActive('/product-types')">
                Tipos de produtos
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
