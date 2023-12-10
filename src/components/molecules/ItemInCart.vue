<template>
    <div  class="p-5 border-[1px] rounded-lg md:flex mt-3">
        <img class="rounded-lg md:w-[60px] h-[60px] md:mr-4"  :src="require(`@/assets/menu/${images}`)" :alt="images" />
        <div>
            <div class=" md:justify-between w-52">
                <h1 class="mt-4 md:mt-0 font-bold text-sm ">{{ name }}</h1>
                <p class="text-muted  text-sm m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
            </div>
        </div>
        <div  class="flex items-center gap-2">
            <PlusCircleIcon class="text-primary w-5 cursor-pointer" @click="$emit('add', id)"/>
            <div class=" border-primary text-primary text-lg text-center w-5">{{ qty }}</div>
            <MinusCircleIcon class="text-primary w-5 cursor-pointer" @click="$emit('reduce', id)"/>
        </div>
        <div class="flex items-center ml-5 w-14">
            <h1 class="text-primary"> $ {{ Number(qty) * Number(price) }}</h1>
        </div>
        <TrashIcon @click="$emit('delete', id)" class="w-5 ml-8 cursor-pointer"/>
    </div>
</template>
  
  
<script lang="ts" setup>
import { defineProps } from 'vue';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '@heroicons/vue/24/outline'


const props = defineProps({
    title: String,
    keys : String,
    images: String,
    name: String,
    price: Number,
    id : String,
    qty : { type: Number, required: false }
})





</script>