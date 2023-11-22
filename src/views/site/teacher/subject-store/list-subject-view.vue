

<template>
<div>
  <div class="subject-list">
    <div class="inner-title">
      <span>Fan nomi:</span>Soliq va Soliqqa tortish
    </div>
    <button @click="showModal" class="add-lesson">
      Mavzu qo‘shish <img src="/svg/plus.svg" alt=""/>
    </button>
    <div class="modal-custom" v-show="isOpenModal">
      <div class="modal-custom-inner">
        <div @click="closeModal" class="close">
          <img src="/svg/exit.svg" alt=""/>
        </div>
        <div class="header-modal">
          Mavzu yaratish
        </div>
        <form  @submit.prevent="createTitle">
        <div class="body-modal container">

            <base-input v-model="title" label="Mavzu nomi" placeholder="Mavzu nomi" rules="required" />

        </div>
        <div class="footer-modal container">
          <button type="submit" class="common-use-button big-one">
            Yaratish
          </button>
        </div>
        </form>
      </div>
    </div>
    <div class="lesson-list">

      <div v-for="t in this.subjuects" :key="t" class="lesson-list-item">
        <div class="name">
          <div class="tr">
            1.
          </div>
          <div>
{{t}}
          </div>
        </div>
        <div class="action">
          <div class="switcher">
            <el-switch
                v-model="value1"
                active-color="#13ce66"
                >
            </el-switch>
          </div>
          <router-link to="add">
          <button class="common-use-button">
            Resurslar
            <img src="/svg/upload.svg" alt=""/>
          </button>
          </router-link>
          <button class="common-use-button">
            Topshiriqlar
            <img src="/svg/subject.svg" alt=""/>
          </button>
          <button class="common-use-button">
            Ko‘rish
            <img src="/svg/view.svg" alt=""/>
          </button>
          <button class="common-use-button">
            Dars xonasini yaratish
            <img src="/svg/room.svg" alt=""/>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import BaseInput from "@/components/shared-components/BaseInput.vue";

export default {
  components: {BaseInput},
  data() {
    return {
      value1: true,
      isOpenModal: false,
      title:'',
      subjuects:[]
    }
  },
  methods: {
    showModal() {
      this.isOpenModal = !this.isOpenModal
    },
    closeModal(){
      this.isOpenModal = !this.isOpenModal
    },
    createTitle(){
      this.subjuects.push(this.title)
      this.closeModal()
      this.title = ''
    }
  }
};
</script>
<style scoped lang="scss">

.subject-list{
  .inner-title{
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.28px;
  }
  .add-lesson{
    margin-top: 20px;
    width: 198px;
    height: 53px;
    border-radius: 12px;
    background:  #F8FAFF;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px  ;
    color:  #031B3C;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.32px;
  }
  .lesson-list{
    margin-top: 40px;
    .lesson-list-item{
      display: flex;
      border-radius: 12px;
      height: 53px;
      background:  #F8FAFF;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px 0 20px;
      margin-bottom: 20px;
      .name{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        color: #031B3C;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.32px;
      }
      .action{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
    }
  }


  .modal-custom {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.35);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;



    .modal-custom-inner {
      max-width: 600px;
      width: 100%;
      background: #fff;
      border-radius: 24px;
      position: relative;
      .close{
        position: absolute;
        right: -20px;
        top: -20px;
        cursor: pointer;
      }
      .header-modal {
        margin-bottom: 10px;
        height: 82px;
        border-radius: 24px;
        background: linear-gradient(133deg, #008BF8 0.82%, #0043A7 99.18%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-rectangle, #FFF);
        font-family: Manrope;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.4px;
      }
      .footer-modal{
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .big-one{
        padding: 10px 20px;
      }
    }
  }
}
</style>