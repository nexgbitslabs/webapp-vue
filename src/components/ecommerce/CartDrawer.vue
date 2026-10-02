<template>

  <v-navigation-drawer
    v-model="drawerModel"
    location="right"
    temporary
    width="420"
    class="cart-drawer"
  >

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <div class="cart-header">

      <div>

        <h2>
          Shopping Cart
        </h2>

        <span>
          {{ cartStore.cartCount }}
          item(s)
        </span>

      </div>


      <v-btn
        icon="mdi-close"
        variant="text"
        @click="drawerModel = false"
      />

    </div>


    <v-divider />


    <!-- =====================================================
         EMPTY
    ====================================================== -->

    <div
      v-if="!cartStore.items.length"
      class="empty-cart"
    >

      <v-icon
        icon="mdi-cart-outline"
        size="64"
      />

      <h3>
        Your cart is empty
      </h3>

      <p>
        Add some products to continue.
      </p>


      <v-btn
        color="primary"
        variant="outlined"
        @click="drawerModel = false"
      >
        Continue Shopping
      </v-btn>

    </div>


    <!-- =====================================================
         CART
    ====================================================== -->

    <template v-else>

      <div class="cart-items">

        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="cart-item"
        >

          <v-img
            :src="
              item.thumbnailUrl ||
              item.imageUrl ||
              'https://placehold.co/200x200?text=Product'
            "
            width="76"
            height="76"
            cover
            class="cart-image"
          />


          <div class="cart-item-content">

            <strong>
              {{ item.name }}
            </strong>


            <small v-if="item.sku">
              {{ item.sku }}
            </small>


            <span class="cart-price">

              {{
                formatCurrency(
                  item.price,
                  item.currency
                )
              }}

            </span>


            <div class="quantity-controls">

              <v-btn
                icon="mdi-minus"
                size="x-small"
                variant="outlined"
                @click="
                  cartStore.decreaseQuantity(
                    item.id
                  )
                "
              />


              <span>
                {{ item.quantity }}
              </span>


              <v-btn
                icon="mdi-plus"
                size="x-small"
                variant="outlined"
                @click="
                  cartStore.increaseQuantity(
                    item.id
                  )
                "
              />


              <v-btn
                icon="mdi-delete-outline"
                size="x-small"
                variant="text"
                color="error"
                class="ml-auto"
                @click="
                  cartStore.removeFromCart(
                    item.id
                  )
                "
              />

            </div>

          </div>

        </div>

      </div>


      <!-- ===================================================
           TOTALS
      ==================================================== -->

      <div class="cart-summary">

        <div class="summary-row">

          <span>
            Subtotal
          </span>

          <strong>
            {{
              formatCurrency(
                cartStore.subtotal
              )
            }}
          </strong>

        </div>


        <div class="summary-row">

          <span>
            Tax
          </span>

          <strong>
            {{
              formatCurrency(
                cartStore.tax
              )
            }}
          </strong>

        </div>


        <div class="summary-row">

          <span>
            Shipping
          </span>

          <strong>

            <template
              v-if="
                cartStore.shipping === 0
              "
            >
              FREE
            </template>

            <template v-else>

              {{
                formatCurrency(
                  cartStore.shipping
                )
              }}

            </template>

          </strong>

        </div>


        <v-divider class="my-3" />


        <div class="summary-row total-row">

          <span>
            Total
          </span>

          <strong>
            {{
              formatCurrency(
                cartStore.total
              )
            }}
          </strong>

        </div>


        <v-btn
          block
          size="large"
          color="primary"
          class="mt-5"
          prepend-icon="mdi-credit-card-outline"
          @click="checkout"
        >
          Checkout
        </v-btn>

      </div>

    </template>

  </v-navigation-drawer>

</template>


<script setup>

import {
  computed
} from "vue"

import {
  useCartStore
} from "@/stores/cart"


const props =
  defineProps({

    modelValue: {
      type: Boolean,
      default: false
    }

  })


const emit =
  defineEmits([
    "update:modelValue",
    "checkout"
  ])


const cartStore =
  useCartStore()


const drawerModel =
  computed({

    get() {

      return props.modelValue

    },

    set(value) {

      emit(
        "update:modelValue",
        value
      )

    }

  })


function checkout() {

  drawerModel.value = false

  emit("checkout")

}


function formatCurrency(
  value,
  currency = "CAD"
) {

  return new Intl.NumberFormat(
    "en-CA",
    {
      style: "currency",
      currency
    }
  ).format(
    Number(value || 0)
  )

}

</script>


<style scoped>

.cart-drawer {

  z-index: 10050 !important;

}


.cart-header {

  padding:
    20px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

}


.cart-header h2 {

  margin: 0;

  font-size: 21px;

}


.cart-header span {

  color: #6c757d;

  font-size: 13px;

}


.empty-cart {

  height: 70vh;

  padding: 24px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 12px;

  text-align: center;

}


.empty-cart h3,
.empty-cart p {

  margin: 0;

}


.empty-cart p {

  color: #6c757d;

}


.cart-items {

  padding:
    10px 18px;

}


.cart-item {

  padding:
    14px 0;

  display: flex;

  gap: 14px;

  border-bottom:
    1px solid #eeeeee;

}


.cart-image {

  flex:
    0 0 76px;

  border-radius: 5px;

}


.cart-item-content {

  min-width: 0;

  flex: 1;

  display: flex;

  flex-direction: column;

}


.cart-item-content strong {

  font-size: 14px;

}


.cart-item-content small {

  color: #8a8a8a;

}


.cart-price {

  margin:
    4px 0 8px;

  color: #0d6efd;

  font-weight: 600;

}


.quantity-controls {

  display: flex;

  align-items: center;

  gap: 10px;

}


.cart-summary {

  padding: 20px;

  border-top:
    1px solid #dee2e6;

}


.summary-row {

  margin-bottom: 8px;

  display: flex;

  justify-content:
    space-between;

}


.total-row {

  font-size: 19px;

}

</style>