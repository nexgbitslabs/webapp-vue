import { defineStore } from "pinia"
import { ref, computed } from "vue"
import api from "@/api/api"


export const useAuthStore =
  defineStore("auth", () => {

    // =========================================================
    // STATE
    // =========================================================

    const isLogin =
      ref(false)

    const user =
      ref(null)

    const initialized =
      ref(false)


    // =========================================================
    // COMPUTED
    // =========================================================

    const isAdmin =
      computed(() =>
        user.value?.role === "Admin"
      )


    const fullName =
      computed(() =>
        user.value?.fullName || ""
      )


    const username =
      computed(() =>
        user.value?.username || ""
      )


    // =========================================================
    // INITIALIZE AUTHENTICATION
    //
    // Called when the application starts.
    // =========================================================

    function initializeAuth() {

      const accessToken =
        localStorage.getItem(
          "wave_access_token"
        )

      const storedUser =
        localStorage.getItem(
          "wave_user"
        )


      if (
        accessToken &&
        storedUser
      ) {

        try {

          user.value =
            JSON.parse(storedUser)

          isLogin.value =
            true

        }
        catch {

          clearAuth()

        }

      }
      else {

        isLogin.value =
          false

        user.value =
          null

      }


      initialized.value =
        true
    }


    // =========================================================
    // SET LOGIN
    //
    // Called after successful authentication.
    // =========================================================

    function setLogin(data) {

      const authenticatedUser = {

        loginId:
          data.loginId,

        username:
          data.username,

        fullName:
          data.fullName,

        email:
          data.email,

        role:
          data.role

      }


      // -------------------------------------------------------
      // STORE TOKENS
      // -------------------------------------------------------

      localStorage.setItem(
        "wave_access_token",
        data.accessToken
      )


      localStorage.setItem(
        "wave_refresh_token",
        data.refreshToken
      )


      // -------------------------------------------------------
      // TOKEN EXPIRATION
      // -------------------------------------------------------

      if (
        data.accessTokenExpiresAt
      ) {

        localStorage.setItem(
          "wave_access_token_expires_at",
          data.accessTokenExpiresAt
        )

      }


      if (
        data.refreshTokenExpiresAt
      ) {

        localStorage.setItem(
          "wave_refresh_token_expires_at",
          data.refreshTokenExpiresAt
        )

      }


      // -------------------------------------------------------
      // USER
      // -------------------------------------------------------

      localStorage.setItem(
        "wave_user",
        JSON.stringify(
          authenticatedUser
        )
      )


      // -------------------------------------------------------
      // PINIA STATE
      // -------------------------------------------------------

      user.value =
        authenticatedUser

      isLogin.value =
        true

    }


    // =========================================================
    // CLEAR AUTHENTICATION
    // =========================================================

    function clearAuth() {

      localStorage.removeItem(
        "wave_access_token"
      )

      localStorage.removeItem(
        "wave_refresh_token"
      )

      localStorage.removeItem(
        "wave_access_token_expires_at"
      )

      localStorage.removeItem(
        "wave_refresh_token_expires_at"
      )

      localStorage.removeItem(
        "wave_user"
      )

      localStorage.removeItem(
        "wave_remember_me"
      )


      user.value =
        null

      isLogin.value =
        false

    }


    // =========================================================
    // LOGOUT
    // =========================================================

    async function logout() {

      const refreshToken =
        localStorage.getItem(
          "wave_refresh_token"
        )


      try {

        if (refreshToken) {

          await api.post(
            "/auth/logout",
            {
              refreshToken
            }
          )

        }

      }
      catch (error) {

        console.error(
          "Logout request failed:",
          error
        )

      }
      finally {

        clearAuth()

      }

    }


    // =========================================================
    // RETURN
    // =========================================================

    return {

      // State
      isLogin,
      user,
      initialized,

      // Computed
      isAdmin,
      fullName,
      username,

      // Functions
      initializeAuth,
      setLogin,
      clearAuth,
      logout

    }

  })