import { axiosTemplate } from '@/axios/axiosTemplate';
import { defineStore } from 'pinia';
import { ref } from 'vue';


interface MenuType {
  id: string;
  type: string;
  name: string;
  price: number;
  url: string;
}

type CartType = {
  id: string;
  menu: any;
  totalPrice: number;
}



export const useMenuStore = defineStore('menu', () => {
  const listOfMenu = ref<MenuType[]>([])
  const listOfCart = ref<CartType[]>([])
  const loadingData = ref<boolean>(true)

  const listMenuAPI = async () => {
    try {
      const response = await axiosTemplate('Menu', { method: 'GET' })
      listOfMenu.value = response.data
      loadingData.value = false

    } catch (error) {
      console.log(error);
      alert('request to much, wait a second')
    }
  }

  const listCartAPI = async () => {
    try {
      const response = await axiosTemplate('cart', { method: 'GET' })
      listOfCart.value = response.data
      loadingData.value = false

    } catch (error) {
      console.log(error);
      alert('request to much, wait a second')

    }
  }

  const saveCartAPI = async () => {
    try {

      const response = await axiosTemplate('cart/1', {
        method: 'PUT', data: {
          menu: listOfCart.value[0].menu,
          totalPrice: listOfCart.value[0].totalPrice
        }
      })

    } catch (error) {
      console.log(error);
      alert('request to much, wait a second')

    }
  }

  const addValueCarts = (id: string) => {
    const result = listOfCart.value[0].menu.map((item: any) => {
      if (item.id == id) {
        item.qty++
        listOfCart.value[0].totalPrice += item.price
      }
    })
    saveCartAPI()
  }

  const reduceValueCarts = (id: string) => {
    const result = listOfCart.value[0].menu.map((item: any) => {
      if (item.id == id && item.qty == 1) {
        listOfCart.value[0].menu = listOfCart.value[0].menu.filter((itemfilter: any) => item.id != itemfilter.id)
        listOfCart.value[0].totalPrice -= item.price
      } else if (item.id == id) {
        item.qty--
        listOfCart.value[0].totalPrice -=  item.price
      }
    })
    saveCartAPI()
  }

  const addToCart = (payload: any) => {
    listOfCart.value[0].menu.push(payload)
    listOfCart.value[0].totalPrice += payload.price
    saveCartAPI()
  }

  const deleteToCart = (id: any) => {
    const totalPrice = listOfCart.value[0].menu.filter((item: any) => item.id == id)
    listOfCart.value[0].menu = listOfCart.value[0].menu.filter((item: any) => item.id != id)
    listOfCart.value[0].totalPrice -= totalPrice[0].price * totalPrice[0].qty

    saveCartAPI()
  }

  const newMenuCart = () => {
    listOfCart.value[0].menu = []
    console.log(listOfCart.value[0]);
    
    saveCartAPI()
  }


  return {
    loadingData,
    listOfMenu,
    listOfCart,
    listMenuAPI,
    listCartAPI,
    addValueCarts,
    reduceValueCarts,
    addToCart,
    deleteToCart,
    newMenuCart
  };
});