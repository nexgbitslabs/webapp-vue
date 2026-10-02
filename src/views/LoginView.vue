<template>
  <div>
    <form
      @submit.prevent="login"
      style="max-width: 330px; padding: 15px; margin: auto;"
    >
      <h1 class="h3 mb-3 fw-normal">
        Please sign in
      </h1>

      <!-- Username -->
      <div class="form-floating">
        <input
          id="floatingInput"
          v-model.trim="username"
          type="text"
          class="form-control"
          placeholder="Username"
          autocomplete="username"
          :disabled="loading"
        />

        <label for="floatingInput">
          Username
        </label>
      </div>

      <!-- Password -->
      <div class="form-floating">
        <input
          id="floatingPassword"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          :disabled="loading"
        />

        <label for="floatingPassword">
          Password
        </label>
      </div>

      <!-- Remember Me -->
      <div class="form-check text-start my-3">
        <input
          id="checkDefault"
          v-model="rememberMe"
          class="form-check-input"
          type="checkbox"
        />

        <label
          class="form-check-label"
          for="checkDefault"
        >
          Remember me
        </label>
      </div>

      <!-- Login Button -->
      <button
        type="submit"
        class="btn btn-primary w-100 py-2"
        :disabled="loading"
      >
        <span v-if="loading">
          Signing in...
        </span>

        <span v-else>
          Sign in
        </span>
      </button>

      <!-- Registration -->
      <div class="mt-3">
        <p>
          Not yet registered?

          <router-link to="/register">
            Create an account
          </router-link>
        </p>
      </div>

      <!-- Message -->
      <p
        v-if="message"
        class="mt-3"
        :class="{
          'text-danger': !loginSuccess,
          'text-success': loginSuccess
        }"
      >
        {{ message }}
      </p>
    </form>
  </div>
</template>


<script setup>

import { ref } from "vue"
import { useRouter } from "vue-router"

import api from "@/api/api"
import { useAuthStore } from "@/stores/auth"
const router = useRouter()

// =========================================================
// ROUTER
// =========================================================




// =========================================================
// AUTH STORE
// =========================================================

const authStore = useAuthStore()


// =========================================================
// STATE
// =========================================================

const username =
  ref("")

const password =
  ref("")

const rememberMe =
  ref(false)

const loading =
  ref(false)

const message =
  ref("")

const loginSuccess =
  ref(false)


// =========================================================
// LOGIN
// =========================================================

async function login() {

  message.value = ""

  loginSuccess.value =
    false


  // -------------------------------------------------------
  // VALIDATION
  // -------------------------------------------------------

  if (
    !username.value.trim()
  ) {

    message.value =
      "Username is required."

    return

  }


  if (!password.value) {

    message.value =
      "Password is required."

    return

  }


  loading.value =
    true


  try {

    // -----------------------------------------------------
    // LOGIN API
    // -----------------------------------------------------

    const response =
      await api.post(
        "/auth/login",
        {
          username:
            username.value.trim(),

          password:
            password.value
        }
      )


    const data =
      response.data


    // -----------------------------------------------------
    // VALIDATE RESPONSE
    // -----------------------------------------------------

    if (
      !data.accessToken
    ) {

      throw new Error(
        "The server did not return an access token."
      )

    }


    if (
      !data.refreshToken
    ) {

      throw new Error(
        "The server did not return a refresh token."
      )

    }


    // -----------------------------------------------------
    // REMEMBER ME
    // -----------------------------------------------------

    localStorage.setItem(
      "wave_remember_me",
      rememberMe.value
        ? "true"
        : "false"
    )


    // -----------------------------------------------------
    // UPDATE AUTH STORE
    //
    // This stores:
    //
    // access token
    // refresh token
    // expiration
    // user
    //
    // and sets:
    //
    // isLogin = true
    // -----------------------------------------------------

    authStore.setLogin(data)


    // -----------------------------------------------------
    // SUCCESS
    // -----------------------------------------------------

    loginSuccess.value =
      true

    message.value =
      "Logged in successfully."


    // -----------------------------------------------------
    // REDIRECT
    // -----------------------------------------------------

    await router.push(
      "/products"
    )

  }
  catch (err) {

    console.error(
      "Login failed:",
      err
    )


    // -----------------------------------------------------
    // INVALID CREDENTIALS
    // -----------------------------------------------------

    if (
      err.response?.status === 401
    ) {

      message.value =
        err.response
          ?.data
          ?.message ||
        "Invalid username or password."

      return

    }


    // -----------------------------------------------------
    // VALIDATION ERROR
    // -----------------------------------------------------

    if (
      err.response?.status === 400
    ) {

      message.value =
        err.response
          ?.data
          ?.message ||

        err.response
          ?.data
          ?.title ||

        "Please check your login information."

      return

    }


    // -----------------------------------------------------
    // SERVER ERROR
    // -----------------------------------------------------

    if (
      err.response?.status >= 500
    ) {

      message.value =
        "The server encountered an error. Please try again."

      return

    }


    // -----------------------------------------------------
    // NETWORK ERROR
    // -----------------------------------------------------

    if (!err.response) {

      message.value =
        "Unable to connect to the server."

      return

    }


    // -----------------------------------------------------
    // FALLBACK
    // -----------------------------------------------------

    message.value =
      "Unable to sign in."

  }
  finally {

    loading.value =
      false

  }

}

</script>