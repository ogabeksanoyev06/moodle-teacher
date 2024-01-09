<template>
  <div class="card">
    <app-loading v-if="loading" />
    <div class="items" v-else>
      <div class="items-left">
        <div class="box box-default">
          <div class="box-header">
            <div class="grid-block-2">
              <AppButton
                  @click="$router.push({ name: 'subject-resource-catalog' })"
                  :font-size="isMobile ? 14 : 16"
                  :sides="isMobile ? 10 : 20"
                  radius="5"
                  height="40"
                  width="200"
              >
                <i class="fa fa-plus mr-5"></i>
                Resurslar katalogi
              </AppButton>
              <AppButton
                  theme="secondary"
                  @click="$router.push({ name: 'subject-resource-add' })"
                  :font-size="isMobile ? 14 : 16"
                  :sides="isMobile ? 10 : 20"
                  radius="5"
                  height="40"
                  width="120"
              >
                <i class="fa fa-plus mr-5"></i>
                Yaratish
              </AppButton>
            </div>
          </div>
          <div class="box-body">
            <div class="table-block">
              <table class="table">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Sarlavha</th>
                  <th>Fanlar ro'yxati</th>
                  <th>Fayllar</th>
                  <th>Yaratilgan</th>
                  <th>Faol</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, i) in 10" :key="i">
                  <td
                      style="cursor: pointer"
                  >
                   {{i+1}}
                  </td>
                  <td
                      style="cursor: pointer"
                  >
Matematika
                  </td>
                  <td>
                    Tarix
                  </td>
                  <td>
                    Excel
                  </td>
                  <td>
                    True
                  </td>
                  <td>
                    <label class="switch">
                      <input
                          type="checkbox"
                          @click="toggleCheckbox(i)"
                          v-model="item.status"
                      />
                      <div class="slider round"></div>
                    </label>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
      <div class="items-right">
        <div class="box">
          <div class="box-body pa-10">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(departmentSave)">
                <base-select
                    type="text"
                    label="Fakultet"
                    placeholder="Fakultetni tanlang"
                    :options-prop="faculty"
                    v-model="department_type_update.faculty"
                    @itemSelected="facultyType"
                />
                <base-select
                    type="text"
                    label="O'quv reja"
                    placeholder="O'quv rejani tanlang"
                    :options-prop="faculty"
                    v-model="department_type_update.faculty"
                    @itemSelected="facultyType"
                />
                <base-select
                    type="text"
                    label="Fanlar ro'yxati"
                    placeholder="Fanlar ro'yxatini tanlang"
                    :options-prop="faculty"
                    v-model="department_type_update.faculty"
                    @itemSelected="facultyType"
                />
                <base-select
                    type="text"
                    label="Mashg'ulot"
                    placeholder="Mashg'ulotni tanlang"
                    :options-prop="faculty"
                    v-model="department_type_update.faculty"
                    @itemSelected="facultyType"
                />
                <base-select
                    type="text"
                    label="Xodim"
                    placeholder="Xodimni tanlang"
                    :options-prop="faculty"
                    v-model="department_type_update.faculty"
                    @itemSelected="facultyType"
                />
                <base-select
                    type="text"
                    label="Til"
                    placeholder="Tilni tanlang"
                    :options-prop="faculty"
                    v-model="department_type_update.faculty"
                    @itemSelected="facultyType"
                />
                <base-input
                    type="text"
                    label="Qidirish"
                    placeholder="Resurs nomi bo'yicha qidirish"
                    v-mask="'336-101-##'"
                    v-model="department_type_update.kod"
                />

              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapGetters } from "vuex";
import AppLoading from "@/components/shared-components/AppLoading.vue";
import BaseInput from "@/components/shared-components/BaseInput.vue";
import BaseSelect from "@/components/shared-components/BaseSelect.vue";
import AppButton from "@/components/shared-components/AppButton.vue";

export default {
  name: "structure-department",
  components: {
    AppButton,
    ValidationObserver,
    AppLoading,
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },

        {
          value: "Option5",
          label: "Option5",
        },
      ],
      loading: false,
      showSelect: false,
      filterSelect: false,
      filterValue: "",
      checkbox: true,
      department_id: "",
      department: [],
      department_type_update: {
        faculty: "",
        name: "",
        kod: "",
      },
    };
  },
  methods: {
    ...mapActions(["getFaculty"]),
    facultyId(item) {
      this.showSelect = false;
      this.department_type_update.faculty = item.name;
    },
    filterFaculty(item) {
      this.filterSelect = false;
      this.filterValue = item.value;
    },
    hideSelectDropdown() {
      this.showSelect = false;
      this.filterSelect = false;
    },
    toggleCheckbox() {
      this.checkbox = !this.checkbox;
      this.$emit("setCheckboxVal", this.checkbox);
    },
    toggleFilterSelect() {
      this.filterSelect = !this.filterSelect;
    },
    // getDepartment() {
    //   this.loading = true;
    //   this.$http
    //       .get(`department`)
    //       .then((res) => {
    //         this.department = res;
    //         this.successNotification("Ma'lumotlar muvaffaqiyatli olingan!");
    //       })
    //       .finally(() => {
    //         this.loading = false;
    //       })
    //       .catch(() => {
    //         this.loading = false;
    //       });
    // },
    // departmentGetId(id) {
    //   this.loading = true;
    //   this.$http
    //       .get(`department/get/${id}`)
    //       .then((res) => {
    //         this.department_type_update.faculty = res.faculty;
    //         this.department_type_update.name = res.name;
    //         this.department_type_update.kod = res.kod;
    //         this.department_id = res.id;
    //       })
    //       .catch(() => {
    //         this.loading = false;
    //       })
    //       .finally(() => {
    //         this.loading = false;
    //       });
    // },

  },
  computed: {
    ...mapGetters(["faculty"]),
  },
  mounted() {
    this.getDepartment();
    this.getFaculty();
  },
};
</script>

<style lang="scss" scoped>
.grid-block-2{
  display: flex;
  align-content: center;
}
.box {
  position: relative;
  border-radius: 3px;
  background: #ffffff;
  border-top: 3px solid #40d88a;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.box-footer {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top: 1px solid #f4f4f4;
  padding: 10px;
  background-color: #fff;
  width: fit-content;
}
.box-header {
  background-color: #f3f3f3 !important;
  padding: 10px 0;
}

.items {
  display: flex;
  width: 100%;
  &-left {
    max-width: 70%;
    width: 100%;
    padding-right: 40px;
  }
  &-right {
    max-width: 30%;
    width: 100%;
  }
}

@media (max-width: 991px) {
  .items {
    flex-direction: column;
    &-left {
      max-width: 100%;
      width: 100%;
      padding-right: 0px;
    }

    &-right {
      max-width: 100%;
      width: 100%;
    }
  }
}
</style>
