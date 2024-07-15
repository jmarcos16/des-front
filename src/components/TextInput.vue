<script setup>
    defineProps(['modelValue', 'name']);
    defineEmits(['update:modelValue']);
</script>
<template>
    <input
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        type="text"
        class="border border-gray-200 rounded-lg px-4 py-2"> 
</template>
