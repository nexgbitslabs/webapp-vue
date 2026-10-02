<template>

  <div class="products-page">

    <!-- =====================================================
         PAGE TOOLBAR
    ====================================================== -->

    <div class="products-toolbar">

      <div>

        <span class="toolbar-eyebrow">
          WAVE STORE
        </span>

        <h1>
          Shop Products
        </h1>

      </div>


      <!-- ===================================================
           CART BUTTON
      ==================================================== -->

      <v-btn
        color="primary"
        variant="flat"
        size="large"
        prepend-icon="mdi-cart-outline"
        @click="cartDrawer = true"
      >

        Cart


        <v-badge
          v-if="
            cartStore.cartCount > 0
          "
          :content="
            cartStore.cartCount
          "
          color="error"
          inline
          class="ml-2"
        />

      </v-btn>

    </div>


    <!-- =====================================================
         PRODUCT LIST
    ====================================================== -->

    <ProductList />


    <!-- =====================================================
         CART
    ====================================================== -->

    <CartDrawer
      v-model="cartDrawer"
      @checkout="openCheckout"
    />


    <!-- =====================================================
         CHECKOUT / PAYMENT
    ====================================================== -->

    <CheckoutDialog
      v-model="checkoutDialog"
      @success="paymentSuccessful"
    />


    <!-- =====================================================
         SUCCESS
    ====================================================== -->

    <PaymentSuccessDialog
      v-model="successDialog"
      :order="completedOrder"
      @close="completedOrder = null"
    />

  </div>

</template>


<script setup>

import {
  ref
} from "vue"

import {
  useCartStore
} from "@/stores/cart"

import ProductList
  from "@/components/ecommerce/ProductList.vue"

import CartDrawer
  from "@/components/ecommerce/CartDrawer.vue"

import CheckoutDialog
  from "@/components/ecommerce/CheckoutDialog.vue"

import PaymentSuccessDialog
  from "@/components/ecommerce/PaymentSuccessDialog.vue"


const cartStore =
  useCartStore()


const cartDrawer =
  ref(false)

const checkoutDialog =
  ref(false)

const successDialog =
  ref(false)

const completedOrder =
  ref(null)


function openCheckout() {

  if (!cartStore.items.length) {
    return
  }


  cartDrawer.value =
    false

  checkoutDialog.value =
    true

}


function paymentSuccessful(order) {

  // Keep order details before
  // clearing the cart.

  completedOrder.value =
    order


  cartStore.clearCart()


  checkoutDialog.value =
    false

  successDialog.value =
    true

}

</script>


<style scoped>

.products-page {

  width: 100%;

  max-width: 1500px;

  margin:
    0 auto;

  padding:
    32px 24px 60px;

}


.products-toolbar {

  margin-bottom: 36px;

  padding:
    28px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 20px;

  background:
    linear-gradient(
      135deg,
      #0f172a 0%,
      #1e3a8a 55%,
      #4338ca 100%
    );

  color: #ffffff;

  border-radius: 8px;

}


.products-toolbar h1 {

  margin:
    3px 0 0;

  font-size: 31px;

  font-weight: 700;

}


.toolbar-eyebrow {

  color:
    rgba(
      255,
      255,
      255,
      0.70
    );

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 1.5px;

}


@media (
  max-width: 600px
) {

  .products-page {

    padding:
      20px 12px 40px;

  }


  .products-toolbar {

    padding: 20px;

  }


  .products-toolbar h1 {

    font-size: 23px;

  }

}

</style>