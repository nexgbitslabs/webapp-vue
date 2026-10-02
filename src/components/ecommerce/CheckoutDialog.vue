<template>

  <v-dialog
    v-model="dialogModel"
    max-width="760"
    persistent
  >

    <v-card>

      <!-- =====================================================
           HEADER
      ====================================================== -->

      <v-card-title class="checkout-header">

        <div>

          <h2>
            Checkout
          </h2>

          <p>
            Complete your order information.
          </p>

        </div>


        <v-btn
          icon="mdi-close"
          variant="text"
          :disabled="processing"
          @click="dialogModel = false"
        />

      </v-card-title>


      <v-divider />


      <v-card-text class="pa-6">

        <v-form
          ref="checkoutForm"
          @submit.prevent="processPayment"
        >

          <!-- =================================================
               CUSTOMER
          ================================================== -->

          <div class="section-title">

            <v-icon
              icon="mdi-account-outline"
            />

            Customer Information

          </div>


          <v-row>

            <v-col
              cols="12"
              md="6"
            >

              <v-text-field
                v-model="form.fullName"
                label="Full Name"
                variant="outlined"
                :rules="[required]"
              />

            </v-col>


            <v-col
              cols="12"
              md="6"
            >

              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                variant="outlined"
                :rules="[
                  required,
                  emailRule
                ]"
              />

            </v-col>

          </v-row>


          <!-- =================================================
               SHIPPING
          ================================================== -->

          <div class="section-title">

            <v-icon
              icon="mdi-truck-outline"
            />

            Shipping Address

          </div>


          <v-text-field
            v-model="form.address"
            label="Street Address"
            variant="outlined"
            :rules="[required]"
          />


          <v-row>

            <v-col
              cols="12"
              md="5"
            >

              <v-text-field
                v-model="form.city"
                label="City"
                variant="outlined"
                :rules="[required]"
              />

            </v-col>


            <v-col
              cols="12"
              md="4"
            >

              <v-text-field
                v-model="form.province"
                label="Province / State"
                variant="outlined"
                :rules="[required]"
              />

            </v-col>


            <v-col
              cols="12"
              md="3"
            >

              <v-text-field
                v-model="form.postalCode"
                label="Postal Code"
                variant="outlined"
                :rules="[required]"
              />

            </v-col>

          </v-row>


          <!-- =================================================
               PAYMENT
          ================================================== -->

          <div class="section-title">

            <v-icon
              icon="mdi-credit-card-outline"
            />

            Payment

          </div>


          <v-alert
            type="info"
            variant="tonal"
            density="comfortable"
            class="mb-5"
          >
            Demo payment only. Do not enter a real
            credit card number.
          </v-alert>


          <v-text-field
            v-model="form.cardNumber"
            label="Card Number"
            placeholder="4242 4242 4242 4242"
            variant="outlined"
            maxlength="19"
            prepend-inner-icon="mdi-credit-card-outline"
            :rules="[required]"
          />


          <v-row>

            <v-col
              cols="6"
            >

              <v-text-field
                v-model="form.expiry"
                label="Expiry"
                placeholder="12/30"
                variant="outlined"
                maxlength="5"
                :rules="[required]"
              />

            </v-col>


            <v-col
              cols="6"
            >

              <v-text-field
                v-model="form.cvv"
                label="CVV"
                placeholder="123"
                variant="outlined"
                maxlength="4"
                type="password"
                :rules="[required]"
              />

            </v-col>

          </v-row>


          <!-- =================================================
               ORDER TOTAL
          ================================================== -->

          <div class="checkout-total">

            <span>
              Order Total
            </span>

            <strong>
              {{
                formatCurrency(
                  cartStore.total
                )
              }}
            </strong>

          </div>

        </v-form>

      </v-card-text>


      <!-- =====================================================
           ACTIONS
      ====================================================== -->

      <v-card-actions class="pa-6 pt-0">

        <v-spacer />


        <v-btn
          variant="text"
          :disabled="processing"
          @click="dialogModel = false"
        >
          Cancel
        </v-btn>


        <v-btn
          color="primary"
          variant="flat"
          size="large"
          prepend-icon="mdi-lock-outline"
          :loading="processing"
          @click="processPayment"
        >

          Pay
          {{
            formatCurrency(
              cartStore.total
            )
          }}

        </v-btn>

      </v-card-actions>

    </v-card>

  </v-dialog>

</template>


<script setup>

import {
  ref,
  reactive,
  computed
} from "vue"

import {
  useCartStore
} from "@/stores/cart"

import {
  useAuthStore
} from "@/stores/auth"


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
    "success"
  ])


const cartStore =
  useCartStore()

const authStore =
  useAuthStore()


const checkoutForm =
  ref(null)

const processing =
  ref(false)


const dialogModel =
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


const form =
  reactive({

    fullName:
      authStore.user?.fullName || "",

    email:
      authStore.user?.email || "",

    address: "",

    city: "",

    province: "Ontario",

    postalCode: "",

    cardNumber:
      "4242 4242 4242 4242",

    expiry:
      "12/30",

    cvv:
      "123"

  })


const required =
  value =>
    !!String(value || "").trim() ||
    "Required"


const emailRule =
  value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(value) ||
    "Enter a valid email address"


async function processPayment() {

  const validation =
    await checkoutForm.value
      ?.validate()


  if (
    validation &&
    !validation.valid
  ) {
    return
  }


  if (!cartStore.items.length) {
    return
  }


  processing.value = true


  try {

    // =======================================================
    // SIMULATED PAYMENT PROCESSING
    //
    // No payment gateway is called.
    // =======================================================

    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          1500
        )
    )


    const order =
    {
      reference:
        `WAVE-${Date.now()}`,

      customer:
        form.fullName,

      email:
        form.email,

      amount:
        cartStore.total,

      currency:
        "CAD",

      itemCount:
        cartStore.cartCount,

      paidAt:
        new Date()
    }


    dialogModel.value =
      false


    emit(
      "success",
      order
    )

  }
  finally {

    processing.value =
      false

  }

}


function formatCurrency(
  value
) {

  return new Intl.NumberFormat(
    "en-CA",
    {
      style: "currency",
      currency: "CAD"
    }
  ).format(
    Number(value || 0)
  )

}

</script>


<style scoped>

.checkout-header {

  padding:
    22px 24px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

}


.checkout-header h2 {

  margin: 0;

  font-size: 23px;

}


.checkout-header p {

  margin:
    4px 0 0;

  color: #6c757d;

  font-size: 13px;

}


.section-title {

  margin:
    5px 0 18px;

  display: flex;

  align-items: center;

  gap: 8px;

  font-size: 16px;

  font-weight: 600;

}


.checkout-total {

  margin-top: 12px;

  padding:
    18px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  background: #f8f9fa;

  border:
    1px solid #dee2e6;

  border-radius: 6px;

  font-size: 18px;

}


.checkout-total strong {

  color: #0d6efd;

  font-size: 22px;

}

</style>