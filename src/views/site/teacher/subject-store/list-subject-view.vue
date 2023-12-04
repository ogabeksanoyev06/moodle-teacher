

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


    <div class="modal-custom" v-show="isOpenModalBBB">
      <div class="modal-custom-inner">
        <div @click="closeModalBBB" class="close">
          <img src="/svg/exit.svg" alt=""/>
        </div>
        <div class="header-modal">
          Dars xona yaratish
        </div>
        <div class="container">
          <form class="form-group">
            <base-input
                type="text"
                vid="Konfrensiya nomi"
                rules="required"
                label="Konfrensiya nomi"
                placeholder="Konfrensiya nomi"

            />
            <base-input
                type="text"
                label="Konfrensiya davomiyligi (ixtiyoriy)"
                placeholder="Konfrensiya davomiyligi (ixtiyoriy)"

            />
            <base-input
                type="text"
                label="Konfrensiyada qatnashuvchilar soni (ixtiyoriy)"
                placeholder="Konfrensiyada qatnashuvchilar soni (ixtiyoriy)"
            />
            <input type="checkbox" id="checkbox"  />
            <label  for="checkbox" class="checkbox-label">
              Dars yozib olinsinmi
<!--              <span-->
<!--                  style="margin-left: 10px"-->
<!--                  class="checkbox-custom"-->
<!--                  :class="{ checked: bbb.record }"-->
<!--              >-->
<!--                        <i v-if="bbb.record" class="fa fa-check"></i>-->
<!--                      </span>-->

            </label>
            <div class="footer-modal container">
              <button type="submit" class="common-use-button big-one">
                Yaratish
              </button>
            </div>
          </form>
        </div>


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
          <router-link to="task/view">
          <button class="common-use-button">
            Topshiriqlar
            <img src="/svg/subject.svg" alt=""/>
          </button>
          </router-link>
          <button class="common-use-button">
            Ko‘rish
            <img src="/svg/view.svg" alt=""/>
          </button>
          <button @click="showModalBBB" class="common-use-button">
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
import axios from "axios";

export default {
  components: {BaseInput},
  props: ['id'],
  data() {
    return {
      value1: true,
      isOpenModal: false,
      isOpenModalBBB: false,
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
    showModalBBB() {
      this.isOpenModalBBB = !this.isOpenModalBBB
    },
    closeModalBBB() {
      this.isOpenModalBBB = !this.isOpenModalBBB
    },
    getBasicId(hemisId){
      axios.post('https://api.fastlms.uz/api/teacher_get_basic_id/',{
        teacher_id:hemisId
      }).then((res)=>{
        return res.teacher
      })
    },
    createTitle(){
      axios.post('https://api.fastlms.uz/api/teacher_topics/',{
        content_id_topic:this.getBasicId(625),
        teacher_id:625,
        name:this.title
      }).then((res)=>{
        console.log(res)
      })
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