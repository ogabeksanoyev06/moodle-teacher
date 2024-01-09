<template>
  <section class="card">
    <app-loading v-if="loading" />
    <div class="box" v-else>
      <ValidationObserver  v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(updateOTM)">
          <div class="box-body">

            <base-select
                type="text"
                vid="name"
                label="O'quv reja"
                placeholder="O'quv rejani tanlang"
                v-model="otmcity.name"
            />
            <div class="grid-block-2">
              <base-select
                  type="text"
                  vid="subject-name"
                  rules="required"
                  label="Fan nomi"
                  placeholder="Fan nomini tanlang"
                  disabled
              />
              <base-select
                  type="text"
                  vid="name"
                  label="Mashg'ulot"
                  placeholder="Mashg'ulot"
                  v-model="otmcity.stir"
              />
            </div>
            <base-select
                type="text"
                vid="name"
                rules="required"
                label="Sarlavha"
                placeholder="Sarlavha"
            />
            <base-select
                type="text"
                vid="name"
                rules="required"
                label="Til"
                placeholder="Til"
            />
            <base-text-area
                type="text"
                vid="name"
                label="Izoh"
                placeholder="Izoh"
            />
            <base-input
                type="text"
                vid="name"
                rows="4"
                label="Url"
                placeholder="url"
            />

            <div class="box-footer">
              <div class="box-header">
                <app-button
                    theme="secondary"
                    type="submit"
                    :font-size="isMobile ? 14 : 16"
                    :sides="isMobile ? 10 : 20"
                    radius="5"
                    height="40"
                >
                  <i class="fa fa-check"></i>
                  Saqlash
                </app-button>
                <app-button
                    type="submit"
                    :font-size="isMobile ? 14 : 16"
                    :sides="isMobile ? 10 : 20"
                    radius="5"
                    height="40"
                >
                  <i class="fa fa-check"></i>
                  Saqlash&Yangi
                </app-button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import "../../../../assets/styles/components/base-input.scss";
import AppButton from "@/components/shared-components/AppButton.vue";
import AppLoading from "@/components/shared-components/AppLoading.vue";
import BaseInput from "@/components/shared-components/BaseInput.vue";
import BaseTextArea from "@/components/shared-components/BaseTextArea.vue";
import BaseSelect from "@/components/shared-components/BaseSelect.vue";

export default {
  name: "structure-university",
  components: {
    BaseSelect,
    ValidationObserver,
    AppButton,
    AppLoading,
    BaseInput,
    BaseTextArea,
  },
  data() {
    return {
      otmcity: {
        kod: "",
        name: "",
        area_located: "",
        phone: "",
        stir: "",
        rektor: "",
        address: "",
        bank_info: "",
        akkreditasiya_info: "",
        city: null,
        ownership: null,
        universityForm: null,
      },
      loading: false,
      id: null,
      res: {},
    };
  },
  methods: {
    // getOTM() {
    //   this.loading = true;
    //   this.$http
    //       .get(`otm`)
    //       .then((res) => {
    //         if (res?.status_action) {
    //           this.otmcity.kod = res?.kod;
    //           this.otmcity.name = res?.name;
    //           this.otmcity.phone = res?.phone;
    //           this.otmcity.stir = res?.stir;
    //           this.otmcity.city = res?.city;
    //           this.otmcity.area_located = res?.area_located;
    //           this.otmcity.ownership = res?.ownership;
    //           this.otmcity.universityForm = res?.universityForm;
    //           this.otmcity.address = res?.address;
    //           this.otmcity.bank_info = res?.bank_info;
    //           this.otmcity.akkreditasiya_info = res?.akkreditasiya_info;
    //           this.id = res.id;
    //           this.successNotification("Ma'lumotlar muvaffaqiyatli olingan!");
    //         } else {
    //           this.errorNotification("Noto'g'ri javob ma'lumotlari.");
    //           this.loading = false;
    //         }
    //       })
    //       .finally(() => {
    //         this.loading = false;
    //       })
    //       .catch(() => {
    //         this.loading = false;
    //       });
    // },
    // updateOTM() {
    //   this.$http
    //       .patch(`otm/update/${this.id}`, {
    //         kod: this.otmcity.kod,
    //         name: this.otmcity.name,
    //         area_located: this.otmcity.area_located,
    //         phone: this.otmcity.phone,
    //         stir: this.otmcity.stir,
    //         rektor: "string",
    //         address: this.otmcity.address,
    //         bank_info: this.otmcity.bank_info,
    //         akkreditasiya_info: this.otmcity.akkreditasiya_info,
    //         city: this.otmcity.city.id,
    //         ownership: this.otmcity.ownership.id,
    //         universityForm: this.otmcity.universityForm.id,
    //       })
    //       .then((res) => {
    //         this.res = res;
    //         this.successNotification("O`zgartirildi");
    //       })
    //       .catch((error) => {
    //         if (error.response && error.response.data) {
    //           switch (true) {
    //             case !!error.response.data.phone:
    //               this.errorNotification(error.response.data.phone.message);
    //               break;
    //             case !!error.response.data.stir:
    //               this.errorNotification(error.response.data.stir.message);
    //               break;
    //             default:
    //               // Agar hech qanday xato ma'lum bo'lmasa
    //               break;
    //           }
    //         }
    //       });
    // },
  },
  mounted() {
    // this.getOTM();
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  border-radius: 5px;
  background-color: #fff;
  border-top: 3px solid #40d88a;
  margin-bottom: 20px;
  width: 100%;
  padding: 20px 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
