<template>
    <button @click="$emit('clicked')" :className="`bg-primary text-white text-xl px-6 py-5 ${classname} rounded-md text-center ${outline && `!bg-white border-2 !font-semibold !text-primary !border-primary`}`" >
        {{title}}
    </button>
</template>
  
  
<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
    title : String,
    classname : String,
    outline : Boolean
})

</script>