<template>
  <div class="card">
    <div class="box">
      <div class="box-header">
        <div>
          <base-select
              type="text"
              :options-prop="faculty"
              placeholder="O'quv yilini tanlang"
              v-model="faculty_value"
              @itemSelected="facultyType"
          />
        </div>
        <div>
          <base-select
              type="text"
              :options-prop="faculty"
              placeholder="Semestrni tanlang"
              v-model="year_value"
              @itemSelected="facultyType"
          />
        </div>
        <div>
          <base-select
              type="text"
              :options-prop="faculty"
              placeholder="Guruhni tanlang"
              v-model="year_value"
              @itemSelected="facultyType"
          />
        </div>
        <div>
          <base-select
              type="text"
              :options-prop="faculty"
              placeholder="Fanlarni tanlang"
              v-model="year_value"
              @itemSelected="facultyType"
          />
        </div>

      </div>
      <div class="box-body">
        <div class="table-block">
          <table class="table">
            <thead>
            <tr>
              <th>#</th>
              <th>Fanlar</th>
              <th>O'quv reja</th>
              <th>Guruh</th>
              <th>Nazorat ishi</th>
              <th>Topshiriqlar</th>
              <th>Semestr</th>
              <th>Talim tili</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in 10" :key="i">
              <td class="text-muted">{{ i + 1 }}</td>
              <td style="cursor: pointer; color: #2c6082">
               Tarix
              </td>
              <td>
                2021-2023
                <p class="text-muted"></p>
              </td>
              <td>
                <a class="label label-success">
                  HBA-7
                </a>

              </td>
              <td>
                Amaliy
                <p class="text-muted"></p>

              </td>
              <td>
                ..........
                <p class="text-muted"></p>

              </td>
              <td>
                8
                <p class="text-muted"></p>

              </td>
              <td>
                rus
                <p class="text-muted"></p>

              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSelect from "@/components/shared-components/BaseSelect.vue";
export default {
  name: "curriculum-curriculum-list",
  components: { BaseSelect },
  data() {
    return {
      showSelectYear: false,
      showSelectFaculty: false,
      year_value: "",
      faculty_value: "",
      search_value: "",
    };
  },
  methods: {
    hideSelectDropdownYear() {
      this.showSelectYear = false;
    },
    hideSelectDropdownFaculty() {
      this.showSelectFaculty = false;
    },
    curriculumYear(item) {
      this.year_value = item;
    },
    curriculumFaculty(item) {
      this.faculty_value = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.label-success {
  display: inline-block;
  align-items: center !important;
  padding: 0.4em 0.6em 0.4em 0.6em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  vertical-align: baseline;
  border-radius: 0.25em;
  background-color: #3c8dbc !important;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
    margin-right: 0;
  }

}
.box {
  position: relative;
  border-radius: 3px;
  background-color: #fff !important;
  border-top: 3px solid #40d88a;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.box-header {
  background-color: #f3f3f3 !important;
  padding: 20px 10px;
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 3fr ;
  gap: 15px;
}
@media (max-width: 1024px) {
  .box-header {
    padding: 20px 0px;
    grid-template-columns: 1fr;
  }
}
</style>
