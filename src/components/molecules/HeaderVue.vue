<template>
    <header ref="content" @scroll="(e) => handleScroll(e)" :class="`flex w-screen transition-all items-center md:px-40 px-5 justify-between py-5 fixed bg-white ${scrollShadow && 'shadow-md'}`">
        <p class="cursor-pointer text-primary md:text-xl">Home</p>
        <p class="font-lobster text-primary md:text-6xl text-3xl">EatLah</p>
        <button @click="$emit('shopClick')" className=" md:w-14 md:h-14 w-10 h-10 rounded-lg bg-primary text-white relative flex justify-center items-center">
            <ShoppingBagIcon class="w-7"/>
            <span
                className="absolute bg-white w-6 h-6 rounded-full text-primary flex items-center justify-center top-[-5px] shadow-md right-[-10px]">
                {{ itemTotal }}
            </span>
        </button>
    </header>
</template>
  
  
<script lang="ts" setup>
import { computed, defineProps, onMounted, ref, watch } from 'vue';
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'


const content = ref()
const scrollShadow = ref(false)
const handleScroll = (e : any) => {
    console.log(window.scroll);
}



const x = ref<string>('2')

const props = defineProps({
    itemTotal: Number
})

const doScroll = (event : any) => {
    if(event.currentTarget.scrollY > 30){
        scrollShadow.value = true
    } else {
        scrollShadow.value = false
    }
}


onMounted(() => {
    window.addEventListener("scroll", doScroll)
})




</script>