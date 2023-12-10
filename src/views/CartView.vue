<template>
  <ModalConfirm v-if="Checkout" :loading="loadingModal" @complete="handleComplete" />
  <div class="about w-screen h-screen bg-primary flex justify-center items-center">
    <div class="container-card grid grid-cols-3 p-9 bg-white w-[75%] h-[80%]  rounded-2xl">
      <section class="col-span-2 w-[90%]">
        <p @click="handleRoute('/')" class="cursor-pointer font-semibold mb-4 flex gap-2 items-center">
          <ArrowLeftIcon class="w-5 " />Back To Menu
        </p>
        <div class="border-t-[1.3px] border-slate-400"></div>
        <div>
          <p class="text-lg font-semibold mt-5">Shopping cart</p>
          <p class="text-xs m-0">You have {{ listOfCart?.[0]?.menu.length || 0 }} item in your cart</p>
        </div>
        <div class="overflow-scroll h-80 mt-3 overflow-x-hidden">
          <div v-if="listOfCart?.[0]?.menu?.length !== 0">
            <ItemInCart v-for="cart in listOfCart?.[0]?.menu" :qty="cart.qty" :key="cart.id" :id="cart.id"
              :name="cart.name" :price="cart.price" :images="cart.url" @add="(n) => addValueCarts(n)"
              @reduce="(n) => reduceValueCarts(n)" @delete="(n) => deleteToCart(n)" />
          </div>

          <div v-else class="w-full flex justify-center mt-28">
            <ButtonAtoms title="Add Item" classname="!py-2" @clicked="handleRoute('/')" />
          </div>

        </div>
      </section>
      <section class="bg-primary px-5 rounded-3xl p-3">
        <div class="flex justify-between items-center">
          <p class="text-white mt-4  font-semibold text-lg">Shipping Info</p>
          <UserCircleIcon class="w-8 mt-4 text-white" />
        </div>
        <div class="name mt-3 flex flex-col gap-1 ">
          <p class="text-white text-xs">Name</p>
          <input value="Ridho Suhendar" disabled class="rounded-lg text-sm p-2 disabled:bg-slate-300" />
        </div>
        <div class="name mt-3 flex flex-col gap-1 ">
          <p class="text-white text-xs">Address</p>
          <input value="jl sudirman no 7" disabled class="rounded-lg text-sm p-2 disabled:bg-[#cbd5e1]" />
        </div>
        <div class="name mt-3 flex flex-col gap-1 ">
          <p class="text-white text-xs">Payment Method</p>
          <select value="Cash On Delivery" disabled class="rounded-lg text-sm p-2 disabled:bg-slate-300">
            <option value="Cash On Delivery">Cash On Delivery</option>
          </select>
        </div>
        <div class="border-t-[1.3px] mt-3 border-white mb-4"></div>
        <div class="text-sm text-white flex justify-between">
          <p>Subtotal</p>
          <p>${{ listOfCart?.[0]?.totalPrice }}</p>
        </div>
        <div class="text-sm text-white flex justify-between">
          <p>Shipping</p>
          <p>$2</p>
        </div>
        <div class="text-sm text-white flex justify-between">
          <p>Total (tax incl 2%)</p>
          <p>${{ Number(listOfCart?.[0]?.totalPrice) + tax + 2 }}</p>
        </div>
        <ButtonAtoms @clicked="handleCheckout" :disabled="listOfCart?.[0]?.menu?.length === 0" title="Checkout"
          classname="bg-white mt-5 !text-primary font-bold hover:bg-slate-100 transition-all !w-full !py-2 disabled:bg-slate-300" />
      </section>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import ItemInCart from '@/components/molecules/ItemInCart.vue';
import { useMenuStore } from '@/store/menuStore'
import { storeToRefs } from 'pinia'
import { UserCircleIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import HeaderVue from '@/components/molecules/HeaderVue.vue';
import ButtonAtoms from '@/components/atoms/ButtonAtoms.vue';
import { useRouter } from 'vue-router';
import ModalConfirm from '@/components/molecules/ModalConfirm.vue';

const router = useRouter()

const store = useMenuStore()
const Checkout = ref(false)
const loadingModal = ref(false)
const {  listOfCart } = storeToRefs(store)
const { listCartAPI, addValueCarts, reduceValueCarts, deleteToCart, newMenuCart } = store

const handleRoute = (name: string) => {
  router.push(name)
}

const handleCheckout = (name: string) => {
  Checkout.value = true
}

const handleComplete = async () => {
  loadingModal.value = true
   newMenuCart()
   setTimeout(() => {
  loadingModal.value = false  
    handleRoute('/')
  }
    , 1000);
  // handleRoute('/')
}

const tax = computed({
  get() {
    return listOfCart.value?.[0]?.totalPrice * 2 / 100
  },
  set() {
    //
  }
})

onMounted(() => {
  listCartAPI()
})


</script>

<style>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>