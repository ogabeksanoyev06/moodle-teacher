<template>
  <nav
      class="header-navbar navbar-expand-lg navbar navbar-with-menu floating-nav navbar-light navbar-shadow mx-1"
  >
    <div class="navbar-wrapper">
      <div class="navbar-container content">
        <div class="navbar-collapse" id="navbar-mobile">
          <div
              class="mr-auto float-left bookmark-wrapper d-flex align-items-center"
          >
            <ul class="nav navbar-nav">
              <li class="nav-item mobile-menu d-xl-none mr-auto">
                <a
                    class="nav-link nav-menu-main menu-toggle hidden-xs is-active"
                    href="#"
                >
                  <i class="ficon feather icon-menu" />
                </a>
              </li>
            </ul>
          </div>
          <ul class="nav navbar-nav float-right">
            <li class="dropdown dropdown-user nav-item">
              <a
                  class="dropdown-toggle nav-link dropdown-user-link"
                  data-toggle="dropdown"
                  href="#"
              >
                <div class="user-nav d-sm-flex d-none">
                  <span class="user-name text-bold-600">
                    {{this.name}}
                  </span>
                  <span style="font-size: 15px">
                    O'qituvchi
                  </span>
                </div>
                <span>
                  <img
                      :src="this.image"
                      alt="avatar"
                      class="round"
                      height="40"
                      width="40"
                  />
                </span>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a
                    class="dropdown-item"
                    @click.prevent="$router.push({ name: 'dashboard-profile' })"
                >
                  <i class="feather icon-user" />
                  Mening profilim
                </a>
                <a class="dropdown-item" @click.prevent="logout">
                  <i class="feather icon-power" />
                  Chiqish
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>


import TokenService from "@/service/TokenService";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navigation",
  data() {
    return {
      name:JSON.parse(localStorage.getItem('employeeInfo')).name,
      image:JSON.parse(localStorage.getItem('employeeInfo')).picture
    };
  },
  methods: {
    logout() {
      this.$router.push({ name: "landing-page" });
      TokenService.removeToken();
      TokenService.removeRefreshToken();
      localStorage.removeItem("staffId");
      window.open('https://hemis.tfi.uz/dashboard/logout')
    },
  },
  created() {},
};
</script>

<style scoped></style>
