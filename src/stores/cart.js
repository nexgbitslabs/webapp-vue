import { defineStore } from "pinia"
import { computed, ref } from "vue"


export const useCartStore = defineStore(
  "cart",
  () => {

    // =========================================================
    // CART
    // =========================================================

    const items = ref([])


    // =========================================================
    // CART COUNT
    // =========================================================

    const cartCount = computed(() =>
      items.value.reduce(
        (total, item) =>
          total + item.quantity,
        0
      )
    )


    // =========================================================
    // SUBTOTAL
    // =========================================================

    const subtotal = computed(() =>
      items.value.reduce(
        (total, item) =>
          total +
          Number(item.price) *
          item.quantity,
        0
      )
    )


    // =========================================================
    // TAX
    // =========================================================

    const tax = computed(() =>
      items.value.reduce(
        (total, item) => {

          if (!item.isTaxable) {
            return total
          }

          const rate =
            Number(item.taxRate || 0) / 100

          return (
            total +
            Number(item.price) *
              item.quantity *
              rate
          )

        },
        0
      )
    )


    // =========================================================
    // SHIPPING
    //
    // Simulation:
    // Free shipping for $100+
    // =========================================================

    const shipping = computed(() => {

      if (items.value.length === 0) {
        return 0
      }

      return subtotal.value >= 100
        ? 0
        : 12.99

    })


    // =========================================================
    // TOTAL
    // =========================================================

    const total = computed(() =>
      subtotal.value +
      tax.value +
      shipping.value
    )


    // =========================================================
    // ADD PRODUCT
    // =========================================================

    function addToCart(product) {

      if (!product) {
        return
      }


      const existing =
        items.value.find(
          item =>
            item.id === product.id
        )


      if (existing) {

        if (
          product.trackInventory &&
          !product.allowBackorder &&
          existing.quantity >=
            product.quantityInStock
        ) {
          return
        }


        existing.quantity++

        return
      }


      items.value.push({
        id:
          product.id,

        name:
          product.name,

        slug:
          product.slug,

        sku:
          product.sku,

        price:
          Number(product.price),

        currency:
          product.currency || "CAD",

        imageUrl:
          product.imageUrl,

        thumbnailUrl:
          product.thumbnailUrl,

        isTaxable:
          product.isTaxable,

        taxRate:
          Number(product.taxRate || 0),

        trackInventory:
          product.trackInventory,

        quantityInStock:
          product.quantityInStock,

        allowBackorder:
          product.allowBackorder,

        quantity: 1
      })

    }


    // =========================================================
    // INCREASE
    // =========================================================

    function increaseQuantity(id) {

      const item =
        items.value.find(
          x => x.id === id
        )


      if (!item) {
        return
      }


      if (
        item.trackInventory &&
        !item.allowBackorder &&
        item.quantity >=
          item.quantityInStock
      ) {
        return
      }


      item.quantity++

    }


    // =========================================================
    // DECREASE
    // =========================================================

    function decreaseQuantity(id) {

      const item =
        items.value.find(
          x => x.id === id
        )


      if (!item) {
        return
      }


      if (item.quantity <= 1) {

        removeFromCart(id)

        return
      }


      item.quantity--

    }


    // =========================================================
    // REMOVE
    // =========================================================

    function removeFromCart(id) {

      items.value =
        items.value.filter(
          item => item.id !== id
        )

    }


    // =========================================================
    // CLEAR
    // =========================================================

    function clearCart() {

      items.value = []

    }


    return {

      items,

      cartCount,

      subtotal,

      tax,

      shipping,

      total,

      addToCart,

      increaseQuantity,

      decreaseQuantity,

      removeFromCart,

      clearCart

    }

  },
  {
    persist: true
  }
)