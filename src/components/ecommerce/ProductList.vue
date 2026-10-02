<template>

  <div class="product-list">

    <!-- =====================================================
         HEADER / SEARCH
    ====================================================== -->

    <div class="product-list-header">

      <div>

        <h1>
          Products
        </h1>

        <p>
          Browse our Wave product collection.
        </p>

      </div>


      <v-text-field
        v-model="searchText"
        class="product-search"
        label="Search products"
        placeholder="Keyboard, monitor, electronics..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="comfortable"
        clearable
        hide-details
        @keyup.enter="searchProducts"
        @click:clear="clearSearch"
      >

        <template #append-inner>

          <v-btn
            icon="mdi-arrow-right"
            variant="text"
            size="small"
            @click="searchProducts"
          />

        </template>

      </v-text-field>

    </div>


    <!-- =====================================================
         LOADING
    ====================================================== -->

    <div
      v-if="loading"
      class="product-loading"
    >

      <v-progress-circular
        indeterminate
        color="primary"
        size="48"
      />

      <span>
        Loading products...
      </span>

    </div>


    <!-- =====================================================
         ERROR
    ====================================================== -->

    <v-alert
      v-else-if="errorMessage"
      type="error"
      variant="tonal"
      class="my-5"
    >

      {{ errorMessage }}

    </v-alert>


    <!-- =====================================================
         RESULTS
    ====================================================== -->

    <template v-else>

      <div class="results-information">

        <span>

          {{ products.length }}

          {{
            products.length === 1
              ? "product"
              : "products"
          }}

        </span>


        <v-chip
          v-if="activeSearch"
          size="small"
          closable
          @click:close="clearSearch"
        >
          Search: {{ activeSearch }}
        </v-chip>

      </div>


      <!-- ===================================================
           PRODUCTS
      ==================================================== -->

      <v-row
        v-if="products.length"
      >

        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >

          <ProductCard
            :product="product"
            @added="productAdded"
          />

        </v-col>

      </v-row>


      <!-- ===================================================
           EMPTY
      ==================================================== -->

      <div
        v-else
        class="empty-products"
      >

        <v-icon
          icon="mdi-package-variant"
          size="64"
        />

        <h3>
          No products found
        </h3>

        <p>
          Try another search term.
        </p>

        <v-btn
          color="primary"
          variant="outlined"
          @click="clearSearch"
        >
          View All Products
        </v-btn>

      </div>

    </template>


    <!-- =====================================================
         SNACKBAR
    ====================================================== -->

    <v-snackbar
      v-model="snackbar"
      color="success"
      timeout="2500"
    >

      {{ snackbarMessage }}

      <template #actions>

        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>

      </template>

    </v-snackbar>

  </div>

</template>


<script setup>

import {
  ref,
  onMounted
} from "vue"

import api from "@/api/api"

import ProductCard
  from "@/components/ecommerce/ProductCard.vue"


const products =
  ref([])

const searchText =
  ref("")

const activeSearch =
  ref("")

const loading =
  ref(false)

const errorMessage =
  ref("")

const snackbar =
  ref(false)

const snackbarMessage =
  ref("")


async function loadProducts() {

  loading.value = true

  errorMessage.value = ""


  try {

    const response =
      await api.get(
        "/products"
      )


    products.value =
      response.data || []

  }
  catch (error) {

    console.error(
      "Unable to load products:",
      error
    )


    errorMessage.value =
      "Unable to load products."

  }
  finally {

    loading.value = false

  }

}


async function searchProducts() {

  const value =
    searchText.value?.trim()


  if (!value) {

    await clearSearch()

    return

  }


  loading.value = true

  errorMessage.value = ""

  activeSearch.value = value


  try {

    const response =
      await api.get(
        "/products/search",
        {
          params: {
            q: value
          }
        }
      )


    products.value =
      response.data || []

  }
  catch (error) {

    console.error(
      "Product search failed:",
      error
    )


    errorMessage.value =
      "Unable to search products."

  }
  finally {

    loading.value = false

  }

}


async function clearSearch() {

  searchText.value = ""

  activeSearch.value = ""

  await loadProducts()

}


function productAdded(product) {

  snackbarMessage.value =
    `${product.name} added to cart.`

  snackbar.value = true

}


onMounted(() => {

  loadProducts()

})

</script>


<style scoped>

.product-list {

  width: 100%;

}


.product-list-header {

  display: flex;

  align-items: flex-end;

  justify-content:
    space-between;

  gap: 24px;

  margin-bottom: 28px;

}


.product-list-header h1 {

  margin: 0;

  font-size: 32px;

  font-weight: 700;

}


.product-list-header p {

  margin:
    6px 0 0;

  color: #6c757d;

}


.product-search {

  width: 100%;

  max-width: 430px;

}


.results-information {

  min-height: 40px;

  margin-bottom: 16px;

  display: flex;

  align-items: center;

  gap: 12px;

  color: #6c757d;

  font-size: 14px;

}


.product-loading,
.empty-products {

  min-height: 350px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 14px;

  text-align: center;

}


.empty-products h3 {

  margin: 0;

}


.empty-products p {

  margin: 0;

  color: #6c757d;

}


@media (
  max-width: 767px
) {

  .product-list-header {

    flex-direction: column;

    align-items: stretch;

  }


  .product-search {

    max-width: none;

  }

}

</style>