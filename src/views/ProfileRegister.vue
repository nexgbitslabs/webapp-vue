<template>
  <div class="registration-page">

    <!-- =========================================================
         REGISTRATION CARD
    ========================================================== -->

    <v-card
      class="registration-card"
      elevation="2"
    >

      <!-- =======================================================
           HEADER
      ======================================================== -->

      <v-card-title class="registration-header">

        <div class="header-content">

          <v-avatar
            color="primary"
            variant="tonal"
            size="52"
          >
            <v-icon
              icon="mdi-account-plus-outline"
              size="28"
            />
          </v-avatar>


          <div>

            <h2>
              Create Account
            </h2>

            <p>
              Enter your account and profile information.
            </p>

          </div>

        </div>

      </v-card-title>


      <v-divider />


      <!-- =======================================================
           FORM
      ======================================================== -->

      <v-card-text class="pa-6">

        <v-form
          ref="registrationForm"
          v-model="formValid"
          @submit.prevent="register"
        >

          <!-- ===================================================
               ACCOUNT INFORMATION
          ==================================================== -->

          <div class="section-title">

            <v-icon
              icon="mdi-account-outline"
              size="20"
            />

            <span>
              Account Information
            </span>

          </div>


          <v-row>

            <!-- =================================================
                 USERNAME
            ================================================== -->

            <v-col
              cols="12"
              md="6"
            >

              <v-text-field
                v-model="form.username"
                label="Username"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-account-outline"
                :rules="usernameRules"
                :disabled="loading"
                autocomplete="username"
                clearable
              />

            </v-col>


            <!-- =================================================
                 EMAIL
            ================================================== -->

            <v-col
              cols="12"
              md="6"
            >

              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-email-outline"
                :rules="emailRules"
                :disabled="loading"
                autocomplete="email"
                clearable
              />

            </v-col>


            <!-- =================================================
                 PASSWORD
            ================================================== -->

            <v-col
              cols="12"
              md="6"
            >

              <v-text-field
                v-model="form.password"
                label="Password"
                :type="
                  showPassword
                    ? 'text'
                    : 'password'
                "
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="
                  showPassword
                    ? 'mdi-eye-off-outline'
                    : 'mdi-eye-outline'
                "
                :rules="passwordRules"
                :disabled="loading"
                autocomplete="new-password"
                @click:append-inner="
                  showPassword = !showPassword
                "
              />

            </v-col>


            <!-- =================================================
                 CONFIRM PASSWORD
            ================================================== -->

            <v-col
              cols="12"
              md="6"
            >

              <v-text-field
                v-model="form.confirmPassword"
                label="Confirm Password"
                :type="
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                "
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-lock-check-outline"
                :append-inner-icon="
                  showConfirmPassword
                    ? 'mdi-eye-off-outline'
                    : 'mdi-eye-outline'
                "
                :rules="confirmPasswordRules"
                :disabled="loading"
                autocomplete="new-password"
                @click:append-inner="
                  showConfirmPassword =
                    !showConfirmPassword
                "
              />

            </v-col>

          </v-row>


          <!-- ===================================================
               PROFILE INFORMATION
          ==================================================== -->

          <div class="section-title mt-4">

            <v-icon
              icon="mdi-card-account-details-outline"
              size="20"
            />

            <span>
              Profile Information
            </span>

          </div>


          <v-row>

            <!-- =================================================
                 FULL NAME
            ================================================== -->

            <v-col cols="12">

              <v-text-field
                v-model="form.fullName"
                label="Full Name"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="
                  mdi-card-account-details-outline
                "
                :rules="fullNameRules"
                :disabled="loading"
                autocomplete="name"
                clearable
              />

            </v-col>

          </v-row>


          <!-- ===================================================
               ACCOUNT TYPE INFORMATION
          ==================================================== -->

          <v-alert
            type="info"
            variant="tonal"
            density="comfortable"
            class="mb-5"
            icon="mdi-information-outline"
          >
            New accounts are registered with the
            <strong>User</strong> role.
          </v-alert>


          <!-- ===================================================
               RESPONSE MESSAGE
          ==================================================== -->

          <v-alert
            v-if="message"
            :type="messageType"
            variant="tonal"
            class="mb-5"
            closable
            @click:close="message = ''"
          >
            {{ message }}
          </v-alert>


          <!-- ===================================================
               ACTIONS
          ==================================================== -->

          <div class="form-actions">

            <v-btn
              variant="text"
              :disabled="loading"
              prepend-icon="mdi-refresh"
              @click="resetForm"
            >
              Clear
            </v-btn>


            <v-btn
              color="primary"
              type="submit"
              size="large"
              :loading="loading"
              :disabled="
                !formValid ||
                loading
              "
              prepend-icon="mdi-account-plus-outline"
            >
              Create Account
            </v-btn>

          </div>

        </v-form>

      </v-card-text>

    </v-card>

  </div>
</template>


<script setup>

import {
  ref,
  computed
} from "vue"

import api from "@/api/api"


// ============================================================
// STATE
// ============================================================

const registrationForm =
  ref(null)

const formValid =
  ref(false)

const loading =
  ref(false)

const message =
  ref("")

const messageType =
  ref("success")

const showPassword =
  ref(false)

const showConfirmPassword =
  ref(false)


// ============================================================
// FORM
// ============================================================

const createEmptyForm = () => ({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  fullName: ""
})


const form =
  ref(
    createEmptyForm()
  )


// ============================================================
// REQUIRED VALIDATION
// ============================================================

const requiredRules = [

  value =>
    !!String(
      value ?? ""
    ).trim() ||
    "This field is required"

]


// ============================================================
// USERNAME VALIDATION
// ============================================================

const usernameRules = [

  value =>
    !!String(
      value ?? ""
    ).trim() ||
    "Username is required",

  value =>
    String(
      value ?? ""
    ).trim().length >= 3 ||
    "Username must contain at least 3 characters",

  value =>
    String(
      value ?? ""
    ).trim().length <= 100 ||
    "Username cannot exceed 100 characters"

]


// ============================================================
// EMAIL VALIDATION
// ============================================================

const emailRules = [

  value =>
    !!String(
      value ?? ""
    ).trim() ||
    "Email is required",

  value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      String(
        value ?? ""
      ).trim()
    ) ||
    "Enter a valid email address",

  value =>
    String(
      value ?? ""
    ).trim().length <= 255 ||
    "Email cannot exceed 255 characters"

]


// ============================================================
// FULL NAME VALIDATION
// ============================================================

const fullNameRules = [

  ...requiredRules,

  value =>
    String(
      value ?? ""
    ).trim().length <= 200 ||
    "Full name cannot exceed 200 characters"

]


// ============================================================
// PASSWORD VALIDATION
// ============================================================

const passwordRules = [

  value =>
    !!value ||
    "Password is required",

  value =>
    String(
      value ?? ""
    ).length >= 8 ||
    "Password must contain at least 8 characters"

]


// ============================================================
// CONFIRM PASSWORD VALIDATION
// ============================================================

const confirmPasswordRules =
  computed(() => [

    value =>
      !!value ||
      "Please confirm your password",

    value =>
      value ===
        form.value.password ||
      "Passwords do not match"

  ])


// ============================================================
// REGISTER
// ============================================================

async function register() {

  // ==========================================================
  // CLEAR OLD MESSAGE
  // ==========================================================

  message.value = ""


  // ==========================================================
  // VALIDATE FORM
  // ==========================================================

  const validation =
    await registrationForm.value
      ?.validate()


  if (!validation?.valid) {
    return
  }


  // ==========================================================
  // VERIFY PASSWORD CONFIRMATION
  // ==========================================================

  if (
    form.value.password !==
    form.value.confirmPassword
  ) {

    messageType.value =
      "error"

    message.value =
      "Passwords do not match."

    return
  }


  // ==========================================================
  // START REQUEST
  // ==========================================================

  loading.value = true


  try {

    // ========================================================
    // REGISTER ACCOUNT
    //
    // IMPORTANT:
    //
    // This is the ONLY registration request.
    //
    // Backend performs the complete transaction:
    //
    // 1. Creates Login
    // 2. Hashes password
    // 3. Creates Profile
    // 4. Associates Profile with Login
    // 5. Assigns Role = User
    //
    // Endpoint:
    //
    // POST /api/auth/register
    // ========================================================

    const response =
      await api.post(
        "/auth/register",
        {
          username:
            form.value
              .username
              .trim(),

          password:
            form.value
              .password,

          fullName:
            form.value
              .fullName
              .trim(),

          email:
            form.value
              .email
              .trim()
        }
      )


    // ========================================================
    // SUCCESS
    // ========================================================

    console.log(
      "Registration successful:",
      response.data
    )


    messageType.value =
      "success"


    message.value =
      "Account created successfully. You can now sign in."


    // ========================================================
    // CLEAR FORM BUT KEEP SUCCESS MESSAGE
    // ========================================================

    await resetForm(false)

  }
  catch (error) {

    console.error(
      "Registration failed:",
      error
    )


    messageType.value =
      "error"


    // ========================================================
    // DUPLICATE USERNAME / EMAIL
    // HTTP 409
    // ========================================================

    if (
      error.response?.status === 409
    ) {

      message.value =
        error.response
          ?.data
          ?.message ||
        "The username or email address is already registered."

      return
    }


    // ========================================================
    // VALIDATION ERROR
    // HTTP 400
    // ========================================================

    if (
      error.response?.status === 400
    ) {

      const validationMessage =
        getValidationMessage(
          error.response?.data
        )


      message.value =
        validationMessage ||
        error.response
          ?.data
          ?.message ||
        error.response
          ?.data
          ?.title ||
        "Please check the information entered."

      return
    }


    // ========================================================
    // UNAUTHORIZED
    // HTTP 401
    // ========================================================

    if (
      error.response?.status === 401
    ) {

      message.value =
        error.response
          ?.data
          ?.message ||
        "The registration request was not authorized."

      return
    }


    // ========================================================
    // FORBIDDEN
    // HTTP 403
    // ========================================================

    if (
      error.response?.status === 403
    ) {

      message.value =
        error.response
          ?.data
          ?.message ||
        "You do not have permission to perform this operation."

      return
    }


    // ========================================================
    // METHOD NOT ALLOWED
    // HTTP 405
    // ========================================================

    if (
      error.response?.status === 405
    ) {

      message.value =
        "The registration endpoint does not allow this request method."

      return
    }


    // ========================================================
    // SERVER ERROR
    // ========================================================

    if (
      error.response?.status >= 500
    ) {

      message.value =
        error.response
          ?.data
          ?.message ||
        "The server encountered an error while creating the account."

      return
    }


    // ========================================================
    // NETWORK ERROR
    // ========================================================

    if (!error.response) {

      message.value =
        "Unable to connect to the server."

      return
    }


    // ========================================================
    // BACKEND MESSAGE
    // ========================================================

    if (
      error.response
        ?.data
        ?.message
    ) {

      message.value =
        error.response
          .data
          .message

      return
    }


    // ========================================================
    // STRING RESPONSE
    // ========================================================

    if (
      typeof error.response
        ?.data === "string"
    ) {

      message.value =
        error.response.data

      return
    }


    // ========================================================
    // FALLBACK
    // ========================================================

    message.value =
      "Unable to create the account."

  }
  finally {

    // ========================================================
    // END REQUEST
    // ========================================================

    loading.value = false

  }
}


// ============================================================
// ASP.NET VALIDATION MESSAGE HELPER
// ============================================================

function getValidationMessage(
  responseData
) {

  if (
    !responseData ||
    !responseData.errors
  ) {
    return ""
  }


  const errors =
    Object.values(
      responseData.errors
    )
      .flat()
      .filter(Boolean)


  return errors.join(" ")

}


// ============================================================
// RESET FORM
// ============================================================

async function resetForm(
  clearMessage = true
) {

  form.value =
    createEmptyForm()


  showPassword.value =
    false

  showConfirmPassword.value =
    false


  // Wait until Vuetify receives the
  // new form values before clearing
  // validation state.

  await Promise.resolve()


  registrationForm.value
    ?.resetValidation()


  if (clearMessage) {

    message.value = ""

  }

}

</script>


<style scoped>

/* ============================================================
   PAGE
============================================================ */

.registration-page {

  width: 100%;

  padding: 32px 24px;

  display: flex;

  justify-content: center;

}


/* ============================================================
   CARD
============================================================ */

.registration-card {

  width: 100%;

  max-width: 900px;

  border:
    1px solid
    rgba(0, 0, 0, 0.08);

}


/* ============================================================
   HEADER
============================================================ */

.registration-header {

  padding: 24px;

}


.header-content {

  display: flex;

  align-items: center;

  gap: 16px;

}


.registration-header h2 {

  margin: 0;

  font-size: 28px;

  font-weight: 600;

  line-height: 1.2;

}


.registration-header p {

  margin: 6px 0 0;

  font-size: 14px;

  opacity: 0.7;

  white-space: normal;

}


/* ============================================================
   SECTIONS
============================================================ */

.section-title {

  margin-bottom: 16px;

  display: flex;

  align-items: center;

  gap: 8px;

  font-size: 16px;

  font-weight: 600;

}


/* ============================================================
   ACTIONS
============================================================ */

.form-actions {

  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 12px;

}


/* ============================================================
   MOBILE
============================================================ */

@media (
  max-width: 600px
) {

  .registration-page {

    padding:
      16px 12px;

  }


  .registration-header {

    padding: 20px;

  }


  .header-content {

    align-items:
      flex-start;

  }


  .registration-header h2 {

    font-size: 24px;

  }


  .form-actions {

    flex-direction:
      column-reverse;

    align-items:
      stretch;

  }


  .form-actions
  :deep(.v-btn) {

    width: 100%;

  }

}

</style>