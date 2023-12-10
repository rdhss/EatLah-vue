<template>
    <div class="bg-black/40 w-screen h-screen fixed z-20 flex justify-center items-center">
        <div :class="`w-[40%] bg-white h-[50%] rounded-2xl p-8 flex flex-col ${loading && 'justify-center !w-[10%] !h-[20%]'} items-center py-10`">
            <CheckCircleIcon v-if="!loading" class="w-20 text-primary" />
            <div v-if="!loading" class="text-primary py-2">
                <p class="font-lobster text-3xl">
                    Thank you for ordering in EatLah
                </p>
                <p class="text-center mt-2">
                    sit down and relax, your order will arive soon
                </p>
            </div>
            <LoadingSpiner v-else />
            <ButtonAtoms v-if="!loading" @clicked="$emit('complete')" title="Back To Home" classname="!py-3 mt-4" />

        </div>
    </div>
</template>
  
  
<script lang="ts" setup>
import { defineProps } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import ButtonAtoms from '../atoms/ButtonAtoms.vue';
import LoadingSpiner from '../atoms/LoadingSpiner.vue';

const props = defineProps({
    loading: Boolean
})


</script>