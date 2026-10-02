<template>
  <v-app>

    <!-- =====================================================
         HEADER - FULL WIDTH
    ====================================================== -->
    <v-app-bar
      flat
      class="app-header"
    >
    
      <NavBar />
    </v-app-bar>


    <!-- =====================================================
         MAIN
    ====================================================== -->
    <v-main class="app-main" style="margin-top: 50px; margin-bottom: 100px;">

      <!-- Global loading indicator -->
      <v-progress-linear
        v-if="isLoading"
        indeterminate
        absolute
        top
      />

      <!-- CENTERED CONTENT AREA -->
      <div class="content-wrapper">

        <router-view v-slot="{ Component }">
          <transition
            name="fade"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>

      </div>

    </v-main>


    <!-- =====================================================
         FOOTER - FULL WIDTH
    ====================================================== -->
    <v-footer
      class="app-footer"
      style="margin-top: 100px;"
    >
      <div class="footer-inner">
        <FooterBar />
      </div>
    </v-footer>

  </v-app>
</template>


<script setup>
import { ref, onMounted } from "vue"
import NavBar from "@/components/NavBar.vue"
import FooterBar from "@/components/FooterBar.vue"
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()
const isLoading = ref(false)

onMounted(() => {
  authStore.initializeAuth()

})
</script>


<style scoped>

/* ==========================================================
   HEADER
   Vuetify handles positioning and application layout.
========================================================== */

.app-header {
  width: 100%;
    background-color: gray;
}


/* Make NavBar occupy the entire app bar */
.app-header :deep(.v-toolbar__content) {
  width: 100%;
  padding: 0;
  background: ligtgray;
}


/* ==========================================================
   MAIN
========================================================== */

.app-main {
  width: 100%;

}


/* ==========================================================
   CENTERED CONTENT
   ONLY this element is constrained.
========================================================== */

.content-wrapper {
  width: 75%;
  max-width: 1200px;
  min-height: 100%;

  margin: 0 auto;

}


/* ==========================================================
   FOOTER
========================================================== */

.app-footer {
  width: 100%;
  max-height: 100px;

  padding: 0;

  background: linear-gradient(
    135deg,
    #f8f9fa 0%,
    #e9f2ff 45%,
    #dbeafe 100%
  );
}




.footer-inner {
  width: 100%;
  min-height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  background: linear-gradient(
    135deg,
    #00070e 0%,
    #f7f7f8 45%,
    #516580 100%
  );
}


/* ==========================================================
   PAGE TRANSITION
========================================================== */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


/* ==========================================================
   TABLET
========================================================== */

@media (max-width: 1024px) {

  .content-wrapper {
    width: 85%;
  }

}


/* ==========================================================
   MOBILE
========================================================== */

@media (max-width: 768px) {

  .content-wrapper {
    width: 100%;
    max-width: none;
  }

  .app-footer,
  .footer-inner {
    min-height: 80px;
  }

}

</style>