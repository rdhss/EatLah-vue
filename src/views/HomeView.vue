<template>
  <HeaderVue :itemTotal="listOfCart?.[0]?.menu?.length || 0" @shopClick="handleRoute('/cart')"/>
  <main class="md:pt-10 text-black ">
    <section class="grid grid-cols-1 md:grid-cols-2 gap-y-20 px-14 md:px-20 md:pt-32 pt-10">
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-center md:text-left my-20 text-6xl tracking-tight font-bold">
          Beautiful food & takeaway
          <span class="text-primary">delivered</span> to your door.
        </h1>
        <p class="text-muted text-center w-full md:text-left md;pr-28">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500.
        </p>
        <div class="w-full flex justify-center md:justify-start pt-6">
          <ButtonAtoms @clicked="HandleToMenu" title="Place an Order" />
        </div>
        <div class="mt-7 w-full md:justify-start">
          <p class="text-center font-bold flex gap-2 items-center justify-center md:justify-start">
            <FontAwesomeIcon icon={faStar} width={25} class="inline mb-1 text-green-400" />
            Trustpilot
          </p>
          <p class="text-center md:text-left mt-2">
            <span class="text-green-400">4.8 out of 5</span> based on
            2000+ reviews
          </p>
        </div>
      </div>
      <div class="md:flex md:justify-end mr-[-4rem]">
        <img :src="Hero1" alt="hero" />
      </div>
    </section>

    <section class="mt-10">
      <h1 class="text-center text-5xl text-primary font-bold">
        How it works.
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-3 mt-16 gap-16">
        <div v-for="step in allStep" :key="step.title">
          <StepsAtoms :title="step.title" :head="step.head" :images="step.url" />
        </div>
      </div>
    </section>

    <section ref="menurefs" class="px-3 pt-20 mt-11 pb-16 bg-primary/[0.02]">
      <h1 class="text-center text-5xl text-primary font-bold">
        Browse our menu
      </h1>
      <div class="md:hidden text-center mt-6 text-muted">
        <p>Use our menu to place an order online, or phone</p>
        <p>our store to</p>
        <p>place a pickup order. Fast and fresh food.</p>
      </div>
      <div class="hidden md:block text-center mt-6 text-muted">
        <p>Use our menu to place an order online, or phone our store to</p>
        <p>place a pickup order. Fast and fresh food.</p>
      </div>
      <div class="md:flex md:justify-center grid grid-cols-2 place-items-center gap-5 my-4">
        <ButtonAtoms v-for="menu in MenuList" :key="menu" :outline="menu !== currentMenu" @clicked="currentMenu = menu" :title="menu" classname="py-3 !w-[150px]" />
      </div>
      <div v-if="loadingData" class="flex justify-center my-20">
        <LoadingSpiner />
      </div>
      <div className="grid mt-10 grid-cols-2 gap-4 animate-fade-in md:px-4">
        <CardItem v-for="menu in filterMenu" @add="(n) => addValueCarts(n)" @reduce="(n) => reduceValueCarts(n)"
          @addToCart="addToCart({ ...menu, qty: 1 })" :key="menu.id" :name="menu.name" :price="menu.price"
          :images="menu.url" :inCart="listOfCart?.[0]?.menu" />
      </div>
    </section>
  </main>
  <footer class="bg-primary text-white flex justify-center">
    <p class="font-lobster">
      made by Ridho Suhendar
    </p>
  </footer>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useMenuStore } from '@/store/menuStore'
import { storeToRefs } from 'pinia'

// src
import Hero1 from '@/assets/hero1.png'


//component
import HeaderVue from '@/components/molecules/HeaderVue.vue';
import ButtonAtoms from '@/components/atoms/ButtonAtoms.vue';
import StepsAtoms from '@/components/atoms/StepsAtoms.vue';
import CardItem from '@/components/molecules/CardItem.vue';
import LoadingSpiner from '@/components/atoms/LoadingSpiner.vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const store = useMenuStore()
const { listOfMenu, listOfCart, loadingData } = storeToRefs(store)
const { listMenuAPI, listCartAPI, addValueCarts, reduceValueCarts, addToCart } = store
const allStep = ref<any[]>([
  {
    url: 'Step01.png',
    head: "Adapt your menu items",
    title:
      "Easily adapt your menu using the webflow CMS and allow customers to browse your items.",
  },
  {
    url: 'Step02.png',
    head: "Accept online orders & takeout",
    title:
      "Let your customers order and pay via the powerful ecommerce system, or simple let them call your store.",
  },
  {
    url: 'Step03.png',
    head: "Manage delivery or takeout",
    title:
      "Manage your own logistics and take orders simply through the ecommerce system.",
  },
])
const menurefs = ref<any>(null)
const MenuList = ref(["Full Menu", "Burger", "Sides", "Drinks"])
const currentMenu = ref<string>('Full Menu')
const filterMenu = computed({
  get() {
    if (currentMenu.value == 'Burger') {
      return listOfMenu.value.filter(item => item.type == currentMenu.value)
    } else if (currentMenu.value == 'Drinks') {
      return listOfMenu.value.filter(item => item.type == currentMenu.value)
    } else if (currentMenu.value == 'Sides') {
      return listOfMenu.value.filter(item => item.type == currentMenu.value)
    } else {
      return listOfMenu.value
    }
  },
  set() {
    //
  }
})

const handleRoute = (name : string) => {
    router.push(name)
}

const HandleToMenu = () => {
  menurefs.value?.scrollIntoView({ behavior: "smooth" })
}

onMounted(() => {
  listMenuAPI()
  listCartAPI()
})
</script>
