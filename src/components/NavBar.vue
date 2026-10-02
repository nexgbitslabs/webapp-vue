<template>

  <!-- =========================================================
       AUTHENTICATED NAVIGATION
  ========================================================== -->

  <nav
    v-if="authStore.isLogin"
    class="navbar navbar-expand-lg fixed-top wave-navbar"
  >

    <div class="container-fluid wave-navbar-container">

      <!-- =====================================================
           BRAND
      ====================================================== -->

      <router-link
        class="navbar-brand wave-brand"
        to="/home"
      >

        <span class="wave-brand-logo">
          W
        </span>

        <span class="wave-brand-name">
          WaveApp
        </span>

      </router-link>


      <!-- =====================================================
           MOBILE MENU BUTTON
      ====================================================== -->

      <button
        type="button"
        class="navbar-toggler wave-navbar-toggler d-lg-none"
        aria-label="Open navigation"
        :aria-expanded="sidebarOpen"
        @click="openSidebar"
      >

        <span class="navbar-toggler-icon"></span>

      </button>


      <!-- =====================================================
           DESKTOP NAVIGATION
      ====================================================== -->

      <div
        class="
          d-none
          d-lg-flex
          align-items-center
          flex-grow-1
          wave-desktop-navigation
        "
      >

        <!-- =================================================
             LEFT NAVIGATION
        ================================================== -->

        <ul class="navbar-nav wave-navbar-links">

          <!-- HOME -->

          <li class="nav-item">

            <router-link
              class="nav-link"
              to="/home"
            >
              Home
            </router-link>

          </li>


          <!-- PROFILE -->

          <li class="nav-item">

            <router-link
              class="nav-link"
              to="/profile"
            >
              Profile
            </router-link>

          </li>
          <li class="nav-item">
            <router-link
                class="nav-link"
                to="/products"
            >
                Products
            </router-link>

            </li>


          <!-- =================================================
               MANAGEMENT DROPDOWN
          ================================================== -->

          <li class="nav-item dropdown">

            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click.prevent
            >
              Management
            </a>


            <ul class="dropdown-menu">

              <li>

                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent
                >
                  Action
                </a>

              </li>


              <li>

                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent
                >
                  Another action
                </a>

              </li>


              <li>

                <hr class="dropdown-divider">

              </li>


              <li>

                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent
                >
                  Something else
                </a>

              </li>

            </ul>

          </li>

        </ul>


        <!-- =================================================
             DESKTOP SEARCH - FAR RIGHT
        ================================================== -->

        <form
          class="d-flex ms-auto wave-desktop-search"
          role="search"
          @submit.prevent="search"
        >

          <input
            v-model="searchText"
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          >


          <button
            class="btn btn-outline-primary"
            type="submit"
          >
            Search
          </button>

        </form>
      </div>

      <!-- =========================================================
            USER AVATAR POPOVER
        ========================================================== -->

        <div class="wave-user-popover">

        <v-menu
            v-model="userMenu"
            :close-on-content-click="false"
            location="bottom end"
        >

            <!-- =====================================================
                ACTIVATOR
            ====================================================== -->

            <template v-slot:activator="{ props }">

            <v-btn
                v-bind="props"
                variant="text"
                class="wave-user-menu-btn"
            >

                <v-avatar
                color="indigo"
                size="38"
                >
                <span class="wave-avatar-text">
                    {{ userInitial }}
                </span>
                </v-avatar>


                <v-icon
                icon="mdi-chevron-down"
                size="18"
                class="ml-1"
                />

            </v-btn>

            </template>


            <!-- =====================================================
                POPOVER CARD
            ====================================================== -->

            <v-card
            min-width="300"
            class="wave-user-popover-card"
            >

            <!-- ===================================================
                USER INFORMATION
            ==================================================== -->

            <v-list>

                <v-list-item>

                <template v-slot:prepend>

                    <v-avatar
                    color="indigo"
                    size="46"
                    >

                    <span class="wave-avatar-text">
                        {{ userInitial }}
                    </span>

                    </v-avatar>

                </template>


                <v-list-item-title
                    class="wave-popover-user-name"
                >

                    {{
                    authStore.user?.fullName ||
                    authStore.user?.username ||
                    "User"
                    }}

                </v-list-item-title>


                <v-list-item-subtitle>

                    {{
                    authStore.user?.email ||
                    authStore.user?.username ||
                    ""
                    }}

                </v-list-item-subtitle>


                <template v-slot:append>

                    <v-chip
                    size="small"
                    color="primary"
                    variant="tonal"
                    >

                    {{
                        authStore.user?.role ||
                        "User"
                    }}

                    </v-chip>

                </template>

                </v-list-item>

            </v-list>


            <v-divider />


            <!-- ===================================================
                MENU ITEMS
            ==================================================== -->

            <v-list
                density="comfortable"
            >

                <!-- VIEW PROFILE -->

                <v-list-item
                prepend-icon="mdi-account-outline"
                title="View Profile"
                subtitle="View your account information"
                @click="viewProfile"
                />


                <!-- LOGOUT -->

                <v-list-item
                prepend-icon="mdi-logout"
                title="Logout"
                subtitle="Sign out of WaveApp"
                class="wave-logout-menu-item"
                @click="logout"
                />

            </v-list>


            <v-divider />


            <!-- ===================================================
                ACTION
            ==================================================== -->

            <v-card-actions>

                <v-spacer />


                <v-btn
                variant="text"
                @click="userMenu = false"
                >
                Close
                </v-btn>

            </v-card-actions>

            </v-card>

        </v-menu>

        </div>

    </div>

  </nav>


  <!-- =========================================================
       MOBILE SIDEBAR

       IMPORTANT:
       Teleport places the sidebar directly under <body>.
       This prevents clipping by App.vue, router-view,
       containers, overflow rules, transforms, etc.
  ========================================================== -->

  <Teleport to="body">

    <!-- =======================================================
         BACKDROP
    ======================================================== -->

    <transition name="wave-fade">

      <div
        v-if="
          authStore.isLogin &&
          sidebarOpen
        "
        class="wave-sidebar-backdrop"
        @click="closeSidebar"
      />

    </transition>


    <!-- =======================================================
         FLOATING SIDEBAR
    ======================================================== -->

    <transition name="wave-sidebar-slide">

      <aside
        v-if="
          authStore.isLogin &&
          sidebarOpen
        "
        class="wave-mobile-sidebar"
      >

        <!-- ===================================================
             SIDEBAR HEADER
        ==================================================== -->

        <div class="wave-sidebar-header">

          <!-- BRAND -->

          <router-link
            class="wave-sidebar-brand"
            to="/home"
            @click="closeSidebar"
          >

            <span class="wave-sidebar-logo">
              W
            </span>

            <span class="wave-sidebar-brand-name">
              WaveApp
            </span>

          </router-link>


          <!-- CLOSE -->

          <button
            type="button"
            class="wave-sidebar-close"
            aria-label="Close navigation"
            @click="closeSidebar"
          >
            &times;
          </button>

        </div>


        <!-- ===================================================
             DIVIDER
        ==================================================== -->

        <div class="wave-sidebar-divider"></div>


        <!-- ===================================================
             SIDEBAR NAVIGATION
        ==================================================== -->

        <div class="wave-sidebar-menu">

          <!-- =================================================
               HOME
          ================================================== -->

          <router-link
            class="wave-sidebar-item"
            to="/home"
            @click="closeSidebar"
          >

            <span class="wave-sidebar-item-icon">
              <i class="bi bi-house"></i>
            </span>

            <span class="wave-sidebar-item-text">
              Home
            </span>

          </router-link>


          <!-- =================================================
               PROFILE
          ================================================== -->

          <router-link
            class="wave-sidebar-item"
            to="/profile"
            @click="closeSidebar"
          >

            <span class="wave-sidebar-item-icon">
              <i class="bi bi-person"></i>
            </span>

            <span class="wave-sidebar-item-text">
              Profile
            </span>

          </router-link>

          <router-link
            class="wave-sidebar-item"
            to="/products"
            @click="closeSidebar"
            >

            <span class="wave-sidebar-item-icon">

                <v-icon
                icon="mdi-shopping-outline"
                size="20"
                />

            </span>

            <span class="wave-sidebar-item-text">
                Products
            </span>

            </router-link>


          <!-- =================================================
               MANAGEMENT
          ================================================== -->

          <button
            type="button"
            class="
              wave-sidebar-item
              wave-sidebar-button
            "
            @click="toggleManagement"
          >

            <span class="wave-sidebar-item-icon">
              <i class="bi bi-grid"></i>
            </span>

            <span class="wave-sidebar-item-text">
              Management
            </span>


            <span class="wave-sidebar-chevron">

              <i
                :class="
                  managementOpen
                    ? 'bi bi-chevron-up'
                    : 'bi bi-chevron-down'
                "
              ></i>

            </span>

          </button>


          <!-- =================================================
               MANAGEMENT SUBMENU
          ================================================== -->

          <transition name="wave-submenu">

            <div
              v-if="managementOpen"
              class="wave-sidebar-submenu"
            >

              <a
                href="#"
                class="wave-sidebar-submenu-item"
                @click.prevent
              >
                Action
              </a>


              <a
                href="#"
                class="wave-sidebar-submenu-item"
                @click.prevent
              >
                Another action
              </a>


              <a
                href="#"
                class="wave-sidebar-submenu-item"
                @click.prevent
              >
                Something else
              </a>

            </div>

          </transition>

        </div>


        <!-- ===================================================
             SIDEBAR BOTTOM
        ==================================================== -->

        <div class="wave-sidebar-bottom">

          <!-- =================================================
               SEARCH
          ================================================== -->

          <div class="wave-sidebar-search-container">

            <form
              class="wave-sidebar-search"
              role="search"
              @submit.prevent="search"
            >

              <input
                v-model="searchText"
                class="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              >


              <button
                class="btn btn-primary"
                type="submit"
              >

                <i class="bi bi-search"></i>

                <span class="wave-search-label">
                  Search
                </span>

              </button>

            </form>

          </div>


          <!-- =================================================
               USER INFORMATION
          ================================================== -->

          <div class="wave-sidebar-user">

            <!-- AVATAR -->

            <div class="wave-user-avatar">
              {{ userInitial }}
            </div>


            <!-- USER -->

            <div class="wave-user-information">

              <strong class="wave-user-name">

                {{
                  authStore.user?.fullName ||
                  authStore.user?.username ||
                  "User"
                }}

              </strong>


              <small class="wave-user-role">

                {{
                  authStore.user?.role ||
                  "User"
                }}

              </small>

            </div>

          </div>

        </div>

      </aside>

    </transition>

  </Teleport>

</template>


<script setup>

import {
  ref,
  computed,
  watch,
  onBeforeUnmount
} from "vue"

import { useRoute, useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"


// ============================================================
// ROUTE
// ============================================================

const route = useRoute()
const router = useRouter()

// ============================================================
// AUTH STORE
// ============================================================

const authStore = useAuthStore()


// ============================================================
// STATE
// ============================================================

const searchText = ref("")
const sidebarOpen = ref(false)
const managementOpen = ref(false)

const userMenu = ref(false)
// ============================================================
// USER INITIAL
// ============================================================

const userInitial =
  computed(() => {

    const name =
      authStore.user?.fullName ||
      authStore.user?.username ||
      "U"


    return String(name)
      .trim()
      .charAt(0)
      .toUpperCase()

  })

  // ============================================================
// VIEW PROFILE
// ============================================================

async function viewProfile() {

  userMenu.value =
    false


  await router.push(
    "/profile"
  )

}


// ============================================================
// LOGOUT
// ============================================================

async function logout() {

  userMenu.value =
    false


  try {

    await authStore.logout()

  }
  finally {

    closeSidebar()


    await router.push(
      "/login"
    )

  }

}

// ============================================================
// OPEN SIDEBAR
// ============================================================

function openSidebar() {

  sidebarOpen.value =
    true


  // Prevent the page behind
  // the sidebar from scrolling.

  document.body.style.overflow =
    "hidden"

}


// ============================================================
// CLOSE SIDEBAR
// ============================================================

function closeSidebar() {

  sidebarOpen.value =
    false


  document.body.style.overflow =
    ""

}


// ============================================================
// TOGGLE MANAGEMENT
// ============================================================

function toggleManagement() {

  managementOpen.value =
    !managementOpen.value

}


// ============================================================
// SEARCH
// ============================================================

function search() {

  const value =
    searchText.value.trim()


  if (!value) {
    return
  }


  console.log(
    "Search:",
    value
  )


  // ---------------------------------------------------------
  // Your search navigation/API can be added here.
  // ---------------------------------------------------------


  closeSidebar()

}


// ============================================================
// CLOSE SIDEBAR WHEN ROUTE CHANGES
// ============================================================

watch(
  () => route.fullPath,
  () => {

    closeSidebar()

  }
)


// ============================================================
// CLOSE SIDEBAR WHEN USER LOGS OUT
// ============================================================

watch(
  () => authStore.isLogin,
  isLoggedIn => {

    if (!isLoggedIn) {

      closeSidebar()

    }

  }
)


// ============================================================
// CLEANUP
// ============================================================

onBeforeUnmount(() => {

  document.body.style.overflow =
    ""

})

</script>


<style scoped>

/* ============================================================
   DESKTOP / TOP NAVBAR
============================================================ */

.wave-navbar {

  width: 100%;

  min-height: 64px;

  background: #ffffff;

  border-bottom:
    1px solid #dee2e6;

  box-shadow:
    0 2px 8px
    rgba(0, 0, 0, 0.08);

  z-index: 9999;

}


.wave-navbar-container {

  width: 100%;

  padding-left: 24px;

  padding-right: 24px;

}


/* ============================================================
   BRAND
============================================================ */

.wave-brand {

  display: flex;

  align-items: center;

  gap: 10px;

  margin-right: 20px;

  text-decoration: none;

}


.wave-brand-logo {

  width: 36px;

  height: 36px;

  flex:
    0 0 36px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  background: #111111;

  color: #ffffff;

  border-radius: 5px;

  font-size: 19px;

  font-weight: 700;

}


.wave-brand-name {

  color: #171717;

  font-size: 20px;

  font-weight: 600;

}


/* ============================================================
   DESKTOP NAVIGATION
============================================================ */

.wave-desktop-navigation {

  min-width: 0;

}


.wave-navbar-links {

  display: flex;

  align-items: center;

}


.wave-navbar-links
.nav-link {

  padding-left: 12px;

  padding-right: 12px;

  color: #343a40;

}


.wave-navbar-links
.nav-link:hover {

  color: #0d6efd;

}


.wave-navbar-links
.router-link-active {

  color: #0d6efd;

  font-weight: 500;

}


/* ============================================================
   DESKTOP SEARCH
============================================================ */

.wave-desktop-search {

  flex:
    0 0 auto;

  margin-left: auto;

}


/* ============================================================
   NAVBAR TOGGLER
============================================================ */

.wave-navbar-toggler {

  margin-left: auto;

  border:
    1px solid #adb5bd;

  border-radius: 5px;

  box-shadow: none !important;

}


/* ============================================================
   SIDEBAR BACKDROP

   Teleported directly to BODY.
============================================================ */

.wave-sidebar-backdrop {

  position: fixed !important;

  top: 0 !important;

  right: 0 !important;

  bottom: 0 !important;

  left: 0 !important;

  width: 100vw !important;

  height: 100vh !important;

  background:
    rgba(0, 0, 0, 0.42);

  z-index: 2147483000 !important;

}


/* ============================================================
   FLOATING MOBILE SIDEBAR
============================================================ */

.wave-mobile-sidebar {

  position: fixed !important;

  top: 14px !important;

  left: 14px !important;

  bottom: 14px !important;

  width: 300px !important;

  max-width:
    calc(100vw - 28px) !important;

  height:
    calc(100dvh - 28px) !important;

  display: flex !important;

  flex-direction: column !important;

  background:
    #ffffff !important;

  border:
    1px solid #d7dce1;

  border-radius: 8px;

  box-shadow:
    0 18px 55px
    rgba(0, 0, 0, 0.30);

  overflow: hidden;

  z-index: 2147483001 !important;

}


/* ============================================================
   SIDEBAR HEADER
============================================================ */

.wave-sidebar-header {

  flex:
    0 0 auto;

  min-height: 70px;

  padding:
    14px 16px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  background: #ffffff;

}


.wave-sidebar-brand {

  min-width: 0;

  display: flex;

  align-items: center;

  gap: 12px;

  color: #171717;

  text-decoration: none;

}


.wave-sidebar-logo {

  width: 38px;

  height: 38px;

  flex:
    0 0 38px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #111111;

  color: #ffffff;

  border-radius: 5px;

  font-size: 20px;

  font-weight: 700;

}


.wave-sidebar-brand-name {

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  font-size: 21px;

  font-weight: 600;

}


.wave-sidebar-close {

  width: 38px;

  height: 38px;

  flex:
    0 0 38px;

  margin-left: 10px;

  padding: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border: none;

  background: transparent;

  color: #495057;

  font-size: 30px;

  line-height: 1;

  cursor: pointer;

}


.wave-sidebar-close:hover {

  color: #000000;

  background: #f1f3f5;

  border-radius: 5px;

}


/* ============================================================
   DIVIDER
============================================================ */

.wave-sidebar-divider {

  flex:
    0 0 1px;

  height: 1px;

  margin:
    0 16px;

  background: #dee2e6;

}


/* ============================================================
   SIDEBAR MENU

   This takes all available space between
   the header and bottom user/search section.
============================================================ */

.wave-sidebar-menu {

  flex:
    1 1 auto;

  min-height: 0;

  padding:
    16px 10px;

  overflow-x: hidden;

  overflow-y: auto;

}


/* ============================================================
   SIDEBAR ITEM
============================================================ */

.wave-sidebar-item {

  width: 100%;

  min-height: 48px;

  margin-bottom: 5px;

  padding:
    10px 13px;

  display: flex;

  align-items: center;

  gap: 12px;

  border: none;

  border-radius: 5px;

  background: transparent;

  color: #252525;

  text-align: left;

  text-decoration: none;

  font-family: inherit;

  font-size: 16px;

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    color 0.15s ease;

}


.wave-sidebar-item:hover {

  background: #f1f3f5;

  color: #0d6efd;

}


.wave-sidebar-item.router-link-active {

  background: #0d6efd;

  color: #ffffff;

}


/* ============================================================
   SIDEBAR ICON
============================================================ */

.wave-sidebar-item-icon {

  width: 24px;

  flex:
    0 0 24px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  font-size: 18px;

}


.wave-sidebar-item-text {

  flex: 1;

}


/* ============================================================
   MANAGEMENT BUTTON
============================================================ */

.wave-sidebar-button {

  appearance: none;

}


.wave-sidebar-chevron {

  margin-left: auto;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  font-size: 12px;

}


/* ============================================================
   SUBMENU
============================================================ */

.wave-sidebar-submenu {

  margin:
    0 0 10px 47px;

  padding:
    3px 0 3px 12px;

  border-left:
    1px solid #dee2e6;

}


.wave-sidebar-submenu-item {

  display: block;

  padding:
    8px 10px;

  border-radius: 4px;

  color: #555f68;

  text-decoration: none;

  font-size: 14px;

}


.wave-sidebar-submenu-item:hover {

  background: #f1f3f5;

  color: #0d6efd;

}


/* ============================================================
   SIDEBAR BOTTOM
============================================================ */

.wave-sidebar-bottom {

  flex:
    0 0 auto;

  background: #ffffff;

  border-top:
    1px solid #dee2e6;

}


/* ============================================================
   SIDEBAR SEARCH
============================================================ */

.wave-sidebar-search-container {

  padding:
    14px;

}


.wave-sidebar-search {

  width: 100%;

  display: flex;

  gap: 8px;

}


.wave-sidebar-search
.form-control {

  min-width: 0;

  flex: 1;

}


.wave-sidebar-search
.btn {

  flex:
    0 0 auto;

  white-space: nowrap;

}


.wave-search-label {

  margin-left: 4px;

}


/* ============================================================
   USER
============================================================ */

.wave-sidebar-user {

  min-height: 68px;

  padding:
    13px 16px;

  display: flex;

  align-items: center;

  gap: 11px;

  border-top:
    1px solid #eeeeee;

}


.wave-user-avatar {

  width: 38px;

  height: 38px;

  flex:
    0 0 38px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background: #0d6efd;

  color: #ffffff;

  font-size: 16px;

  font-weight: 700;

}


.wave-user-information {

  min-width: 0;

  flex: 1;

  display: flex;

  flex-direction: column;

}


.wave-user-name {

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  color: #212529;

  font-size: 14px;

}


.wave-user-role {

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  color: #6c757d;

  font-size: 12px;

}


/* ============================================================
   BACKDROP TRANSITION
============================================================ */

.wave-fade-enter-active,
.wave-fade-leave-active {

  transition:
    opacity 0.18s ease;

}


.wave-fade-enter-from,
.wave-fade-leave-to {

  opacity: 0;

}


/* ============================================================
   SIDEBAR TRANSITION
============================================================ */

.wave-sidebar-slide-enter-active,
.wave-sidebar-slide-leave-active {

  transition:
    transform 0.22s ease,
    opacity 0.22s ease;

}


.wave-sidebar-slide-enter-from,
.wave-sidebar-slide-leave-to {

  transform:
    translateX(-110%);

  opacity: 0;

}


/* ============================================================
   SUBMENU TRANSITION
============================================================ */

.wave-submenu-enter-active,
.wave-submenu-leave-active {

  transition:
    opacity 0.15s ease,
    transform 0.15s ease;

}


.wave-submenu-enter-from,
.wave-submenu-leave-to {

  opacity: 0;

  transform:
    translateY(-5px);

}

/* ============================================================
   USER POPOVER
============================================================ */

.wave-user-popover {

  flex:
    0 0 auto;

  margin-left: 8px;

  display: flex;

  align-items: center;

}


/* ============================================================
   ACTIVATOR
============================================================ */

.wave-user-menu-btn {

  min-width: auto !important;

  height: 46px !important;

  padding:
    3px 7px !important;

  border-radius:
    6px !important;

  color:
    #495057 !important;

  text-transform:
    none !important;

}


.wave-user-menu-btn:hover {

  background:
    #f1f3f5 !important;

}


/* ============================================================
   AVATAR
============================================================ */

.wave-avatar-text {

  color: #ffffff;

  font-size: 16px;

  font-weight: 700;

  text-transform: uppercase;

}


/* ============================================================
   POPOVER CARD
============================================================ */

.wave-user-popover-card {

  margin-top: 4px;

  border:
    1px solid
    #dee2e6 !important;

  border-radius:
    7px !important;

  overflow: hidden;

}


/* ============================================================
   USER
============================================================ */

.wave-popover-user-name {

  max-width: 145px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  font-weight: 600;

}


/* ============================================================
   LOGOUT
============================================================ */

.wave-logout-menu-item {

  color:
    #dc3545 !important;

}


.wave-logout-menu-item :deep(.v-icon) {

  color:
    #dc3545 !important;

}
/* ============================================================
   MOBILE / TABLET
============================================================ */

@media (
  max-width: 991.98px
) {

  .wave-navbar {

    min-height: 64px;

  }


  .wave-navbar-container {

    padding-left: 16px;

    padding-right: 16px;

  }


  .wave-brand {

    margin-right: 0;

  }

}


/* ============================================================
   SMALL MOBILE
============================================================ */

@media (
  max-width: 480px
) {

  .wave-mobile-sidebar {

    top: 8px !important;

    left: 8px !important;

    bottom: 8px !important;

    width:
      calc(100vw - 16px) !important;

    max-width:
      calc(100vw - 16px) !important;

    height:
      calc(100dvh - 16px) !important;

    border-radius: 7px;

  }


  .wave-sidebar-search {

    flex-direction: column;

  }


  .wave-sidebar-search
  .btn {

    width: 100%;

  }

}


/* ============================================================
   VERY SMALL MOBILE
============================================================ */

@media (
  max-width: 350px
) {

  .wave-brand-name {

    font-size: 18px;

  }


  .wave-sidebar-brand-name {

    font-size: 19px;

  }

}

</style>