<script setup>
import Button from './Button.vue';

const emits  = defineEmits(['update::page']);
const props = defineProps ({
    meta: {
        type: Object,
        required: true
    }
});

const nextPage = () => {
    emits('update::page',Boolean(props.meta.page) + 1);
};
const previousPage = () => {
    emits('update::page', props.meta.page - 1);
};

</script>
<template>
    <div class="flex justify-between mt-2">
        
        <div>
            <span class="text-sm text-gray-700">
                Page {{ meta.page }} of {{ meta.total_pages ?? 1 }}
            </span>
        </div>

        <div>
            <Button
                class="mr-2"
                @click="previousPage"
                :disabled="!meta.has_previous">
                Previous
            </Button>
            <Button
                @click="nextPage"
                :disabled="!meta.has_more">
                Next
            </Button>
        </div>
    </div>
</template>