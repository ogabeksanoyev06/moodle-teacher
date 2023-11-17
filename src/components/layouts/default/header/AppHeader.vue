<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header__inner">
          <div class="header__right">
            <div @click="showModalClick">
              aa
            </div>

            <AppModal
                @close="closeModal"
                :class="{ visible: showModal }"
                :width="500"
                :height="900"
            >
              <template #modalHeader> Konfrensiya yaratish</template>
              <template #modalBody>
                <div class="container">
                  <form @submit.prevent="createBBB" class="form-group">
                    <base-input
                        type="text"
                        vid="Konfrensiya nomi"
                        rules="required"
                        label="Konfrensiya nomi"
                        placeholder="Konfrensiya nomi"
                        v-model="bbb.name"

                    />
                    <base-input
                        type="text"
                        label="Konfrensiya davomiyligi (ixtiyoriy)"
                        placeholder="Konfrensiya davomiyligi (ixtiyoriy)"
                        v-model="bbb.duration"

                    />
                    <base-input
                        type="text"
                        label="Konfrensiyada qatnashuvchilar soni (ixtiyoriy)"
                        placeholder="Konfrensiyada qatnashuvchilar soni (ixtiyoriy)"
                        v-model="bbb.maxParticipants"
                    />
                    <input type="checkbox" id="checkbox" v-model="bbb.record" />
                    <label  for="checkbox" class="checkbox-label">
                      Dars yozib olinsinmi
                      <span
                          style="margin-left: 10px"
                          class="checkbox-custom"
                          :class="{ checked: bbb.record }"
                      >
                        <i v-if="bbb.record" class="fa fa-check"></i>
                      </span>

                    </label>
                    <AppButton type="submit">
                      Yaratish
                    </AppButton>
                  </form>

                </div>
              </template>

            </AppModal>
            <div
                class="header__language"
                @click="languageDropdown = !languageDropdown"
                v-on-click-outside:excludedClass="hideLanguageDropdown"
            >
              <span>O'zbekcha</span>
              <div class="header__dropdown-language">
                <ul
                    class="header__dropdown-language-wrap"
                    :class="languageDropdown ? 'active' : ''"
                >
                  <li class="header__dropdown-language-item">
                    <span> O'zbekcha </span>
                  </li>
                  <li class="header__dropdown-language-item">
                    <span> Russian </span>
                  </li>
                  <li class="header__dropdown-language-item">
                    <span> English </span>
                  </li>
                </ul>
              </div>
            </div>
            <div
                class="header__account"
                @click="accountDropdown = !accountDropdown"
                v-on-click-outside:excludedClass="hideAccountDropdown"
            >
              <!-- <div class="header__account-photo" v-if="user && user.photo">
                <img :src="baseURL + user.photo" alt="" />
              </div> -->
              <div class="header__account-photo">
                <img :src="employeeInfo.picture" alt=""/>
                <div>
                  <span class="user-name">{{ employeeInfo.name }}</span>
                  <span class="user-role">O'qituvchi</span>
                </div>
              </div>
              <div class="header__dropdown-user">
                <ul
                    class="header__dropdown-user-wrap"
                    :class="accountDropdown ? 'active' : ''"
                >
                  <li class="header__dropdown-user-header">
                    Foydalanuvchi rollari
                  </li>
                  <li class="divider"></li>

                  <li class="header__dropdown-user-item">
                    <router-link
                        :to="{ name: 'dashboard-profile' }"
                        class="header__dropdown-user-link"
                    >
                      <span>Super Administrator</span>
                    </router-link>
                  </li>
                  <li class="header__dropdown-user-item logout">
                    <div @click="logout" class="header__dropdown-user-link">
                      <img src="/icons/logout.svg" alt="" class="mr-10"/>
                      <span>Chiqish</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import "./header.scss";
import i18n from "@/locals/i18n";
import AppModal from "@/components/shared-components/AppModal.vue";
import BaseInput from "@/components/shared-components/BaseInput.vue";
import AppButton from "@/components/shared-components/AppButton.vue";
import axios from "axios";


export default {
  name: "AppHeader",
  components: {AppButton, BaseInput, AppModal},
  data() {
    return {
      bbb:{
        name:"",
        maxParticipants:0,
        record:false,
        duration:0,
      },
      isActive: true,
      languageDropdown: false,
      accountDropdown: false,
      setLang: "O‘zbekcha",
      employeeInfo: JSON.parse(localStorage.getItem('employeeInfo')),
      showModal: false
    };
  },
  methods: {
    createBBB(){
      axios.post("https://api.fastlms.uz/api/bigbluebutton_model/",this.bbb).then((res)=>{
        console.log(res.data.id)
        axios.post("https://api.fastlms.uz/api/bigbluebutton/createroom/",{id:res.data.id}).then(()=>{
          axios.post("https://api.fastlms.uz/api/bigbluebutton/join/moderator/",{
           id:res.data.id,
            username:JSON.parse(localStorage.getItem('employeeInfo')).name
          }).then((res3)=>{
            console.log(res3)
            window.open(res3.data.url, '_blank');
          })
        })

      }).catch((err)=>{
        console.log(err)
      })
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflowY = "scroll";
    },
    showModalClick() {
      this.showModal = true;
      document.body.style.overflowY = "hidden";
    },
    logout() {
      localStorage.clear()
      const newWindow = window.open('https://hemis.tfi.uz/dashboard/logout');
      newWindow.onload = function () {
        setTimeout(function () {
          window.location.href = 'http://localhost:8080';
        }, 2000);
      };

      window.location.href = 'http://localhost:8080';

      // this.$router.push('/landing-page')
    },
    hideLanguageDropdown() {
      this.languageDropdown = false;
    },
    hideAccountDropdown() {
      this.accountDropdown = false;
    },
    changeLanguage(lang) {
      localStorage.setItem("lang", lang);
      i18n.locale = lang;
      if (lang === "ru") {
        this.setLang = "Russian";
      } else if (lang === "en") {
        this.setLang = "English";
      } else {
        this.setLang = "O'zbek";
      }
    },
    clickMenu() {
      this.isActive = !this.isActive;
      this.$emit("closeNavigationDrawer");
    },
    hideUserDropdown() {
      this.userDropdown = false;
    },
    hideLangDropdown() {
      this.langDropdown = false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
