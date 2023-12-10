<template>
    <div  class="p-5 border-[1px] rounded-lg md:flex">
        <img class="rounded-lg md:w-32 md:mr-9" :src="require(`@/assets/menu/${images}`)" :alt="images" />
        <div>
            <div class="md:flex md:justify-between w-full">
                <h1 class="mt-4 md:mt-0 font-bold text-xl">{{ name }}</h1>
                <p class="text-primary">$ {{ price }} USD</p>
            </div>
            <div>
                <p class="text-muted my-5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>

                <div v-if="InCart?.length !== 0" class="flex items-center">
                    <PlusCircleIcon class="text-primary w-10 cursor-pointer" @click="$emit('add', InCart?.[0]?.id)"/>
                    <div class=" border-primary text-primary text-2xl text-center w-10">{{ InCart?.[0]?.qty }}</div>
                    <MinusCircleIcon class="text-primary w-10 cursor-pointer" @click="$emit('reduce', InCart?.[0]?.id)"/>
                </div>
                <ButtonAtoms v-else title="Add To Cart" classname="!py-1" @clicked="$emit('addToCart')"/>    
            </div>
        </div>
    </div>
</template>
  
  
<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/24/outline'

import ButtonAtoms from '../atoms/ButtonAtoms.vue';


const props = defineProps({
    title: String,
    keys : String,
    images: String,
    name: String,
    price: Number,
    inCart: { type: Array, required: true},
    qty : { type: Number, required: false }
})

const InCart = computed({
    get() {
        let result : any[] = []
        result = props?.inCart?.filter((item : any) => item.name == props.name)
        return result
    },
    set(){
        //
    }
})




</script>