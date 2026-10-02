<template>

  <v-dialog
    v-model="dialogModel"
    max-width="520"
    persistent
  >

    <v-card class="success-card">

      <v-card-text class="success-content">

        <!-- =================================================
             SUCCESS ICON
        ================================================== -->

        <div class="success-icon">

          <v-icon
            icon="mdi-check"
            size="54"
            color="white"
          />

        </div>


        <h2>
          Payment Successful!
        </h2>


        <p>
          Thank you for your purchase.
          Your simulated payment was completed successfully.
        </p>


        <!-- =================================================
             ORDER
        ================================================== -->

        <div
          v-if="order"
          class="order-information"
        >

          <div>

            <span>
              Order Reference
            </span>

            <strong>
              {{ order.reference }}
            </strong>

          </div>


          <div>

            <span>
              Amount Paid
            </span>

            <strong>
              {{
                formatCurrency(
                  order.amount
                )
              }}
            </strong>

          </div>


          <div>

            <span>
              Items
            </span>

            <strong>
              {{ order.itemCount }}
            </strong>

          </div>


          <div>

            <span>
              Status
            </span>

            <v-chip
              color="success"
              size="small"
              variant="tonal"
            >
              Paid
            </v-chip>

          </div>

        </div>


        <v-btn
          block
          color="primary"
          size="large"
          class="mt-6"
          @click="finish"
        >
          Continue Shopping
        </v-btn>

      </v-card-text>

    </v-card>

  </v-dialog>

</template>


<script setup>

import {
  computed
} from "vue"


const props =
  defineProps({

    modelValue: {
      type: Boolean,
      default: false
    },

    order: {
      type: Object,
      default: null
    }

  })


const emit =
  defineEmits([
    "update:modelValue",
    "close"
  ])


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


function finish() {

  dialogModel.value =
    false

  emit("close")

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

.success-card {

  border-radius: 10px;

}


.success-content {

  padding:
    42px 34px !important;

  text-align: center;

}


.success-icon {

  width: 92px;

  height: 92px;

  margin:
    0 auto 22px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #198754;

  border-radius: 50%;

}


.success-content h2 {

  margin:
    0 0 10px;

  font-size: 27px;

}


.success-content > p {

  margin:
    0 auto 26px;

  max-width: 390px;

  color: #6c757d;

  line-height: 1.6;

}


.order-information {

  padding:
    18px;

  background: #f8f9fa;

  border:
    1px solid #dee2e6;

  border-radius: 6px;

  text-align: left;

}


.order-information > div {

  min-height: 38px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 16px;

}


.order-information span {

  color: #6c757d;

  font-size: 13px;

}


.order-information strong {

  text-align: right;

}

</style>