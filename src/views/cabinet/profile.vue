<template>
  <div class="profile">
    <div class="box box__info">
      <div class="box__header">
        <h3 class="title">Mening profilim</h3>
      </div>
      <div class="box__body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(changeUser)">
            <div class="box__inner">
              <div class="box__inner-left">
                <base-input
                  type="text"
                  vid="Login"
                  rules="required"
                  label="Login"
                  placeholder="Login"
                  v-model="profile.login"
                  disabled
                />
                <base-input
                  type="text"
                  vid="To‘liq ismi º"
                  rules="required"
                  label="To‘liq ismi º"
                  placeholder="To‘liq ismi º"
                  v-model="profile.name"
                  disabled
                />
                <base-input
                  type="text"
                  vid="ID raqami"
                  rules="required"
                  label="ID raqami"
                  placeholder="ID raqami"
                  v-model="profile.employee_id_number"
                  disabled
                />
                <base-input
                  type="text"
                  vid="Telefon raqam"
                  rules="required"
                  label="Telefon raqam"
                  placeholder="Telefon raqam"
                  v-model="profile.phone"
                  disabled
                />
                <base-input
                  type="text"
                  vid="Email"
                  rules="required|email"
                  label="Email"
                  placeholder="Email"
                  v-model="profile.email"
                />
                <br />

              </div>
              <div class="box__inner-right">
                <div class="account__photo">
                  <img :src="profile.picture" alt="" />
                </div>
                <!-- <div class="m_photo">
                  <i class="fa fa-camera"></i>
                </div> -->
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationObserver } from "vee-validate";
import BaseInput from "@/components/shared-components/BaseInput.vue";

export default {
  name: "StudentProfile",
  components: { ValidationObserver, BaseInput },
  data() {
    return {
      profile: JSON.parse(localStorage.getItem('employeeInfo')),
      confirmPassword: "",
      isChecked: false,
    };
  },
  methods: {
    changeUser() {
      console.log("tayyyoooooooorrrrr");
    },
    toggleCheckbox() {
      this.isChecked = !this.isChecked;
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  max-width: 700px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 36px;
  &__inner {
    display: flex;
    &-left {
      flex: 1;
      padding-right: 30px;
    }
    &-right {
      max-width: 120px;
      max-height: 120px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 50%;
      .account__photo {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  &__header {
    position: relative;
    margin-bottom: 15px;
    .title {
      display: inline-block;
      font-size: 20px;
      font-weight: 600;
      color: #031b3c;
      line-height: 1;
    }
  }
  &__footer {
    width: 100%;
    text-align: end;
    margin-top: 15px;
  }
}

@media (max-width: 576px) {
  .box {
    max-width: 700px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 24px;
    padding: 36px;
    &__inner {
      flex-direction: column;
      &-left {
        order: 2;
        padding-right: 0;
      }
      &-right {
        order: 1;
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
      }
    }
    &__header {
      margin-bottom: 20px;
      text-align: center;
    }
  }
}
</style>
