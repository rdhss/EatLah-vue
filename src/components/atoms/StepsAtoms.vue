<template>
    <div className='flex flex-col items-center text-center px-7'>
        <img :src="require(`@/assets/step/${images}`)" :alt="images" />
        <h1 className='text-2xl font-bold mt-7'>{{ head }}</h1>
        <p className='text-lg text-muted mt-2'>{{ title }}</p>
    </div>
</template>
  
  
<script lang="ts" setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    title: String,
    head: String,
    images: String
})

</script>