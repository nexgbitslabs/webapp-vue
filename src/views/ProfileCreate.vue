<template>

  <div class="profile-page">

    <v-card
      class="profile-card"
      elevation="2"
    >

      <!-- =====================================================
           HEADER
      ====================================================== -->

      <v-card-title class="profile-header">

        <div class="profile-header-content">

          <v-avatar
            size="56"
            color="primary"
            variant="tonal"
          >
            <v-icon
              size="30"
              icon="mdi-account-outline"
            />
          </v-avatar>


          <div>

            <h2>
              My Profile
            </h2>

            <p>
              View your Wave account information.
            </p>

          </div>

        </div>

      </v-card-title>


      <v-divider />


      <!-- =====================================================
           PROFILE
      ====================================================== -->

      <v-card-text class="pa-6">

        <!-- ===================================================
             PROFILE EXISTS
        ==================================================== -->

        <template v-if="profile">

          <!-- =================================================
               PROFILE SUMMARY
          ================================================== -->

          <div class="profile-summary">

            <v-avatar
              size="76"
              color="primary"
              class="profile-avatar"
            >
              <span class="profile-initial">
                {{ userInitial }}
              </span>
            </v-avatar>


            <div class="profile-summary-info">

              <h3>
                {{
                  profile.fullName ||
                  profile.username
                }}
              </h3>

              <p>
                {{ profile.email }}
              </p>


              <v-chip
                v-if="profile.role"
                color="primary"
                variant="tonal"
                size="small"
              >
                {{ profile.role }}
              </v-chip>

            </div>

          </div>


          <v-divider class="my-6" />


          <!-- =================================================
               PERSONAL INFORMATION
          ================================================== -->

          <div class="section-title">

            <v-icon
              icon="mdi-account-card-outline"
              size="20"
            />

            <span>
              Personal Information
            </span>

          </div>


          <v-row>

            <!-- FULL NAME -->

            <v-col
              cols="12"
              md="6"
            >

              <v-text-field
                :model-value="
                  profile.fullName || ''
                "
                label="Full Name"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="
                  mdi-card-account-details-outline
                "
                readonly
              />

            </v-col>


            <!-- EMAIL -->

            <v-col
              cols="12"
              md="6"
            >

              <v-text-field
                :model-value="
                  profile.email || ''
                "
                label="Email"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="
                  mdi-email-outline
                "
                readonly
              />

            </v-col>

          </v-row>


          <!-- =================================================
               ACCOUNT INFORMATION
          ================================================== -->

          <div class="section-title mt-4">

            <v-icon
              icon="mdi-shield-account-outline"
              size="20"
            />

            <span>
              Account Information
            </span>

          </div>


          <v-row>

            <!-- USERNAME -->

            <v-col
              cols="12"
              md="6"
            >

              <v-text-field
                :model-value="
                  profile.username || ''
                "
                label="Username"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="
                  mdi-account-outline
                "
                readonly
              />

            </v-col>


            <!-- ROLE -->

            <v-col
              cols="12"
              md="6"
            >

              <v-text-field
                :model-value="
                  profile.role || ''
                "
                label="Role"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="
                  mdi-account-key-outline
                "
                readonly
              />

            </v-col>

          </v-row>


          <!-- =================================================
               SYSTEM INFORMATION
          ================================================== -->

          <template v-if="profile.loginId">

            <div class="section-title mt-4">

              <v-icon
                icon="mdi-identifier"
                size="20"
              />

              <span>
                System Information
              </span>

            </div>


            <v-row>

              <!-- LOGIN ID -->

              <v-col
                cols="12"
                md="6"
              >

                <v-text-field
                  :model-value="
                    profile.loginId
                  "
                  label="Login ID"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="
                    mdi-login-variant
                  "
                  readonly
                />

              </v-col>

            </v-row>

          </template>

        </template>


        <!-- ===================================================
             NO PROFILE
        ==================================================== -->

        <div
          v-else
          class="empty-state"
        >

          <v-icon
            icon="mdi-account-off-outline"
            size="56"
          />

          <h3>
            Profile unavailable
          </h3>

          <p>
            Your profile information is not available.
          </p>

        </div>

      </v-card-text>

    </v-card>

  </div>

</template>


<script setup>

import {
  computed
} from "vue"

import {
  useAuthStore
} from "@/stores/auth"


// ============================================================
// AUTH STORE
// ============================================================

const authStore =
  useAuthStore()


// ============================================================
// PROFILE
//
// User information was populated during authentication:
//
// authStore.setLogin(data)
//
// Therefore there is no need to make another HTTP request
// simply to display the currently authenticated user.
// ============================================================

const profile =
  computed(() =>
    authStore.user
  )


// ============================================================
// USER INITIAL
// ============================================================

const userInitial =
  computed(() => {

    const name =
      profile.value?.fullName ||
      profile.value?.username ||
      "U"


    return String(name)
      .trim()
      .charAt(0)
      .toUpperCase()

  })

</script>


<style scoped>

/* ============================================================
   PAGE
============================================================ */

.profile-page {

  width: 100%;

  padding:
    32px 24px;

  display: flex;

  justify-content: center;

}


/* ============================================================
   CARD
============================================================ */

.profile-card {

  width: 100%;

  max-width: 900px;

  border:
    1px solid
    rgba(0, 0, 0, 0.08);

}


/* ============================================================
   HEADER
============================================================ */

.profile-header {

  padding: 24px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 16px;

}


.profile-header-content {

  display: flex;

  align-items: center;

  gap: 16px;

}


.profile-header h2 {

  margin: 0;

  font-size: 28px;

  font-weight: 600;

}


.profile-header p {

  margin:
    5px 0 0;

  font-size: 14px;

  opacity: 0.7;

}


/* ============================================================
   PROFILE SUMMARY
============================================================ */

.profile-summary {

  display: flex;

  align-items: center;

  gap: 20px;

  padding:
    4px 0 8px;

}


.profile-avatar {

  flex:
    0 0 auto;

}


.profile-initial {

  font-size: 28px;

  font-weight: 600;

}


.profile-summary-info {

  min-width: 0;

}


.profile-summary-info h3 {

  margin: 0;

  font-size: 22px;

  font-weight: 600;

}


.profile-summary-info p {

  margin:
    5px 0 9px;

  color:
    rgba(0, 0, 0, 0.65);

  font-size: 14px;

}


/* ============================================================
   SECTION
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
   READONLY FIELDS
============================================================ */

:deep(
  .v-field--disabled
) {

  opacity: 1;

}


/* ============================================================
   EMPTY STATE
============================================================ */

.empty-state {

  min-height: 300px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

}


.empty-state h3 {

  margin:
    16px 0 4px;

}


.empty-state p {

  margin:
    0 0 20px;

  opacity: 0.7;

}


/* ============================================================
   MOBILE
============================================================ */

@media (
  max-width: 600px
) {

  .profile-page {

    padding:
      16px 12px;

  }


  .profile-header {

    padding: 20px;

  }


  .profile-header-content {

    align-items:
      flex-start;

  }


  .profile-header h2 {

    font-size: 23px;

  }


  .profile-summary {

    align-items:
      flex-start;

  }


  .profile-avatar {

    width:
      60px !important;

    height:
      60px !important;

  }


  .profile-initial {

    font-size: 23px;

  }


  .profile-summary-info h3 {

    font-size: 19px;

  }

}

</style>