<template>

  <v-card
    class="product-card h-100"
    elevation="1"
  >

    <!-- =====================================================
         IMAGE
    ====================================================== -->

    <div class="product-image-wrapper">

      <v-img
        :src="
          product.imageUrl ||
          'https://placehold.co/800x600?text=Product'
        "
        :alt="product.name"
        height="220"
        cover
      >

        <!-- SALE -->

        <v-chip
          v-if="product.isOnSale"
          class="sale-chip"
          color="error"
          size="small"
        >
          Sale
        </v-chip>


        <!-- FEATURED -->

        <v-chip
          v-if="product.isFeatured"
          class="featured-chip"
          color="primary"
          size="small"
        >
          Featured
        </v-chip>

      </v-img>

    </div>


    <!-- =====================================================
         PRODUCT
    ====================================================== -->

    <v-card-text class="product-content">

      <!-- CATEGORY -->

      <div class="product-category">
        {{ product.category }}
      </div>


      <!-- NAME -->

      <h3 class="product-name">
        {{ product.name }}
      </h3>


      <!-- DESCRIPTION -->

      <p class="product-description">

        {{
          product.shortDescription ||
          product.description
        }}

      </p>


      <!-- ===================================================
           PRICE
      ==================================================== -->

      <div class="product-price">

        <span class="current-price">

          {{
            formatCurrency(
              product.price,
              product.currency
            )
          }}

        </span>


        <span
          v-if="product.isOnSale"
          class="old-price"
        >

          {{
            formatCurrency(
              product.compareAtPrice,
              product.currency
            )
          }}

        </span>

      </div>


      <!-- ===================================================
           STOCK
      ==================================================== -->

      <div class="stock-row">

        <v-icon
          size="17"
          :color="
            product.inStock
              ? 'success'
              : 'error'
          "
        >

          {{
            product.inStock
              ? "mdi-check-circle-outline"
              : "mdi-close-circle-outline"
          }}

        </v-icon>


        <span
          :class="
            product.inStock
              ? 'text-success'
              : 'text-error'
          "
        >

          {{
            product.inStock
              ? "In Stock"
              : "Out of Stock"
          }}

        </span>

      </div>

    </v-card-text>


    <!-- =====================================================
         ACTION
    ====================================================== -->

    <v-card-actions class="product-actions">

      <v-btn
        block
        color="primary"
        variant="flat"
        prepend-icon="mdi-cart-plus"
        :disabled="!product.inStock"
        @click="addProduct"
      >

        {{
          product.inStock
            ? "Add to Cart"
            : "Unavailable"
        }}

      </v-btn>

    </v-card-actions>

  </v-card>

</template>


<script setup>

import {
  useCartStore
} from "@/stores/cart"


const props =
  defineProps({

    product: {
      type: Object,
      required: true
    }

  })


const emit =
  defineEmits([
    "added"
  ])


const cartStore =
  useCartStore()


function addProduct() {

  cartStore.addToCart(
    props.product
  )


  emit(
    "added",
    props.product
  )

}


function formatCurrency(
  value,
  currency = "CAD"
) {

  return new Intl.NumberFormat(
    "en-CA",
    {
      style: "currency",
      currency:
        currency || "CAD"
    }
  ).format(
    Number(value || 0)
  )

}

</script>


<style scoped>

.product-card {

  display: flex;

  flex-direction: column;

  border:
    1px solid
    rgba(0, 0, 0, 0.08);

  border-radius: 8px;

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

}


.product-card:hover {

  transform:
    translateY(-3px);

  box-shadow:
    0 10px 25px
    rgba(0, 0, 0, 0.10);

}


.product-image-wrapper {

  position: relative;

}


.sale-chip {

  position: absolute;

  top: 12px;

  left: 12px;

}


.featured-chip {

  position: absolute;

  top: 12px;

  right: 12px;

}


.product-content {

  flex: 1;

}


.product-category {

  margin-bottom: 5px;

  color: #6c757d;

  font-size: 12px;

  font-weight: 600;

  text-transform: uppercase;

  letter-spacing: 0.6px;

}


.product-name {

  margin:
    0 0 8px;

  font-size: 18px;

  font-weight: 600;

}


.product-description {

  min-height: 42px;

  margin-bottom: 14px;

  color: #6c757d;

  font-size: 14px;

  line-height: 1.5;

}


.product-price {

  display: flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 12px;

}


.current-price {

  color: #0d6efd;

  font-size: 21px;

  font-weight: 700;

}


.old-price {

  color: #8a8a8a;

  font-size: 14px;

  text-decoration: line-through;

}


.stock-row {

  display: flex;

  align-items: center;

  gap: 5px;

  font-size: 13px;

}


.product-actions {

  padding:
    0 16px 16px;

}

</style>