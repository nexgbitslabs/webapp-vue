<template>

  <footer class="wave-footer">

    <div class="container py-5">

      <div class="row">

        <!-- =====================================================
             PRODUCT
        ====================================================== -->

        <div class="col-6 col-md-2 mb-4">

          <h5 class="footer-heading">
            Product
          </h5>

          <ul class="nav flex-column">

            <li class="nav-item mb-2">

              <router-link
                to="/home"
                class="nav-link p-0"
              >
                Home
              </router-link>

            </li>


            <li class="nav-item mb-2">

              <a
                href="#features"
                class="nav-link p-0"
              >
                Features
              </a>

            </li>


            <li class="nav-item mb-2">

              <a
                href="#pricing"
                class="nav-link p-0"
              >
                Pricing
              </a>

            </li>


            <li class="nav-item mb-2">

              <a
                href="#"
                class="nav-link p-0"
              >
                Documentation
              </a>

            </li>

          </ul>

        </div>


        <!-- =====================================================
             SUPPORT
        ====================================================== -->

        <div class="col-6 col-md-2 mb-4">

          <h5 class="footer-heading">
            Support
          </h5>

          <ul class="nav flex-column">

            <li class="nav-item mb-2">

              <a
                href="#"
                class="nav-link p-0"
              >
                Help Center
              </a>

            </li>


            <li class="nav-item mb-2">

              <a
                href="#"
                class="nav-link p-0 "
              >
                FAQs
              </a>

            </li>


            <li class="nav-item mb-2">

              <a
                href="#"
                class="nav-link p-0"
              >
                Contact
              </a>

            </li>


            <li class="nav-item mb-2">

              <a
                href="#"
                class="nav-link p-0"
              >
                System Status
              </a>

            </li>

          </ul>

        </div>


        <!-- =====================================================
             COMPANY
        ====================================================== -->

        <div class="col-6 col-md-2 mb-4">

          <h5 class="footer-heading">
            Company
          </h5>

          <ul class="nav flex-column">

            <li class="nav-item mb-2">

              <a
                href="#"
                class="nav-link p-0 "
              >
                About
              </a>

            </li>


            <li class="nav-item mb-2">

              <a
                href="#"
                class="nav-link p-0 "
              >
                Privacy
              </a>

            </li>


            <li class="nav-item mb-2">

              <a
                href="#"
                class="nav-link p-0 "
              >
                Terms
              </a>

            </li>

          </ul>

        </div>


        <!-- =====================================================
             NEWSLETTER
        ====================================================== -->

        <div class="col-md-5 offset-md-1 mb-4">

          <form
            @submit.prevent="subscribe"
          >

            <h5 class="footer-heading">
              Subscribe to our newsletter
            </h5>

            <p class="">
              Monthly digest of what's new and exciting from us.
            </p>


            <div
              class="
                d-flex
                flex-column
                flex-sm-row
                w-100
                gap-2
              "
            >

              <label
                for="newsletterEmail"
                class="visually-hidden"
              >
                Email address
              </label>


              <input
                id="newsletterEmail"
                v-model.trim="email"
                type="email"
                class="form-control"
                placeholder="Email address"
                autocomplete="email"
                required
              >


              <button
                class="btn btn-primary"
                type="submit"
                :disabled="submitting"
              >

                <span v-if="submitting">
                  Subscribing...
                </span>

                <span v-else>
                  Subscribe
                </span>

              </button>

            </div>


            <!-- =================================================
                 SUBSCRIPTION MESSAGE
            ================================================== -->

            <small
              v-if="message"
              class="d-block mt-2"
              :class="
                success
                  ? 'text-success'
                  : 'text-danger'
              "
            >
              {{ message }}
            </small>

          </form>

        </div>

      </div>


      <!-- =======================================================
           FOOTER BOTTOM
      ======================================================== -->

      <div
        class="
          footer-bottom
          d-flex
          flex-column
          flex-sm-row
          justify-content-between
          align-items-center
          gap-3
          py-4
          mt-4
          border-top
        "
      >

        <!-- COPYRIGHT -->

        <p class="mb-0 ">

          &copy;
          {{ currentYear }}
          WaveApp.

          All rights reserved.

        </p>


        <!-- ===================================================
             SOCIAL LINKS
        ==================================================== -->

        <ul
          class="
            list-unstyled
            d-flex
            align-items-center
            gap-3
            mb-0
          "
        >

          <!-- GITHUB -->

          <li>

            <a
              class="social-link"
              href="#"
              aria-label="GitHub"
            >

              <i class="bi bi-github"></i>

            </a>

          </li>


          <!-- LINKEDIN -->

          <li>

            <a
              class="social-link"
              href="#"
              aria-label="LinkedIn"
            >

              <i class="bi bi-linkedin"></i>

            </a>

          </li>


          <!-- FACEBOOK -->

          <li>

            <a
              class="social-link"
              href="#"
              aria-label="Facebook"
            >

              <i class="bi bi-facebook"></i>

            </a>

          </li>

        </ul>

      </div>

    </div>

  </footer>

</template>


<script setup>

import {
  ref,
  computed
} from "vue"


// ============================================================
// STATE
// ============================================================

const email =
  ref("")

const submitting =
  ref(false)

const message =
  ref("")

const success =
  ref(false)


// ============================================================
// CURRENT YEAR
// ============================================================

const currentYear =
  computed(() =>
    new Date().getFullYear()
  )


// ============================================================
// NEWSLETTER SUBSCRIPTION
// ============================================================

async function subscribe() {

  message.value = ""

  success.value = false


  // ---------------------------------------------------------
  // VALIDATE EMAIL
  // ---------------------------------------------------------

  if (!email.value) {

    message.value =
      "Please enter your email address."

    return

  }


  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/


  if (
    !emailPattern.test(
      email.value
    )
  ) {

    message.value =
      "Please enter a valid email address."

    return

  }


  submitting.value =
    true


  try {

    // -------------------------------------------------------
    // TODO:
    //
    // Connect to newsletter API when endpoint is available.
    //
    // Example:
    //
    // await api.post(
    //   "/newsletter/subscribe",
    //   {
    //     email: email.value
    //   }
    // )
    // -------------------------------------------------------


    success.value =
      true

    message.value =
      "Thank you for subscribing."


    email.value =
      ""

  }
  catch (error) {

    console.error(
      "Newsletter subscription failed:",
      error
    )


    success.value =
      false

    message.value =
      "Unable to subscribe. Please try again."

  }
  finally {

    submitting.value =
      false

  }

}

</script>


<style scoped>

/* ============================================================
   FOOTER
============================================================ */

.wave-footer {

  width: 100%;

    background: linear-gradient(
    135deg,
    #00070e 0%,
    #070731 45%,
    #516580 100%
  );
  color: rgb(240, 238, 238);

  border-top:
    1px solid
    rgba(0, 0, 0, 0.08);

}


/* ============================================================
   HEADINGS
============================================================ */

.footer-heading {

  margin-bottom: 16px;

  font-size: 16px;

  font-weight: 600;
   color: rgb(240, 238, 238);

}


/* ============================================================
   LINKS
============================================================ */

.wave-footer
.nav-link {
  color: rgb(240, 238, 238);
  display: inline-block;

  font-size: 14px;

  text-decoration: none;

  transition:
    color 0.15s ease;

}


.wave-footer
.nav-link:hover {


 color: rgb(240, 238, 238);

}


/* ============================================================
   NEWSLETTER
============================================================ */

.wave-footer
.form-control {

  min-height: 42px;
   color: rgb(240, 238, 238);

}


.wave-footer
.btn {

  min-height: 42px;
   color: rgb(240, 238, 238);

}


/* ============================================================
   FOOTER BOTTOM
============================================================ */

.footer-bottom {

  font-size: 14px;
   color: rgb(240, 238, 238);

}


/* ============================================================
   SOCIAL LINKS
============================================================ */

.social-link {

  width: 38px;

  height: 38px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  border:
    1px solid
    #dee2e6;

  border-radius: 50%;


  text-decoration: none;

  font-size: 18px;

  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    background-color 0.15s ease;

}


.social-link:hover {

  color: #ffffff;

  background:
    var(--bs-primary);

  border-color:
    var(--bs-primary);

}


/* ============================================================
   MOBILE
============================================================ */

@media (
  max-width: 575.98px
) {

  .wave-footer {

    text-align: left;

  }


  .footer-bottom {

    align-items:
      flex-start !important;
       color: rgb(240, 238, 238);

  }

}

</style>