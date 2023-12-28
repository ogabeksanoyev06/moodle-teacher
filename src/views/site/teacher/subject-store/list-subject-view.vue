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
          <form @submit.prevent="createTitle">
            <div class="body-modal container">

              <base-input v-model="title" label="Mavzu nomi" placeholder="Mavzu nomi" rules="required"/>

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
            <form @submit.prevent="createBBB" class="form-group">
              <base-input
                  type="text"
                  vid="Konfrensiya nomi"
                  rules="required"
                  label="Konfrensiya nomi"
                  placeholder="Konfrensiya nomi"
                  v-model="bigbluebutton.name"
              />
              <base-input
                  type="text"
                  label="Konfrensiya davomiyligi (ixtiyoriy)"
                  placeholder="Konfrensiya davomiyligi (ixtiyoriy)"
                  v-model="bigbluebutton.duration"
              />
              <base-input
                  type="text"
                  label="Konfrensiyada qatnashuvchilar soni (ixtiyoriy)"
                  placeholder="Konfrensiyada qatnashuvchilar soni (ixtiyoriy)"
                  v-model="bigbluebutton.maxParticipants"
              />
              <div class="footer-modal container">
                <button type="submit" class="common-use-button big-one">
                  Yaratish
                </button>
              </div>
            </form>
          </div>


        </div>
      </div>

      <div class="modal-custom" v-show="isOpenEdit">
        <div class="modal-custom-inner">
          <div @click="closeModalEdit" class="close">
            <img src="/svg/exit.svg" alt=""/>
          </div>
          <div class="header-modal">
            Mavzuni tahrirlash
          </div>
          <form @submit.prevent="edit">
            <div class="body-modal container">

              <base-input v-model="changedTitle" label="Mavzu nomi" placeholder="Mavzu nomi" rules="required"/>

            </div>
            <div class="footer-modal container">
              <button type="submit" class="common-use-button big-one">
                Tahrirlash
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="lesson-list">

        <div v-for="(t, index) in this.subjuects" :key="t.id" class="lesson-list-item">
          <div class="name">
            <div class="tr">
              <img @click="showModalEdit(t.id)" style="cursor: pointer" src="/svg/editable.svg"/>
              {{ index + 1 }}.
            </div>
            <div>
              {{ t.name }}
            </div>
          </div>
          <div class="action">
            <div class="switcher">
              <el-switch
                  v-model="t.in_progress"
                  active-color="#13ce66"
                  @change="onChangeSwitch(t, $event)"
              ></el-switch>

            </div>
            <router-link :to="{name:'list-add',params:{id:t.id}}">
              <button class="common-use-button">
                Resurslar
                <img src="/svg/upload.svg" alt=""/>
              </button>
            </router-link>
            <router-link :to="{name:'task-view',params:{id:t.id}}">
              <button class="common-use-button">
                Topshiriqlar
                <img src="/svg/subject.svg" alt=""/>
              </button>
            </router-link>
            <button class="common-use-button">
              Ko‘rish
              <img src="/svg/view.svg" alt=""/>
            </button>
            <button @click="showModalBBB(t.id)" class="common-use-button">
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
  props: ['id', 'nextId'],

  data() {
    return {
      value1: true,
      isOpenModal: false,
      isOpenModalBBB: false,
      isOpenEdit: false,
      title: '',
      topicId:'',
      subjuects: [],
      teacher: '',
      changedTitle: '',
      editId: "",
      bigbluebutton: {
        name: '',
        maxParticipants: null,
        duration: null
      }
    }
  },
  mounted() {
    axios.post('https://api.fastlms.uz/api/teacher_get_basic_id/', {
      teacher_id: 625,

    }).then((res) => {
      console.log(res.data.teacher)

      this.teacher = res.data.teacher
    })
    this.getSubjects()
  },
  methods: {
    createBBB() {
      axios.post(`https://api.fastlms.uz/api/teacher/bigbluebutton/create/`, {
        name: this.bigbluebutton.name,
        maxParticipants: this.bigbluebutton.maxParticipants,
        duration: this.bigbluebutton.duration,
        teacher_id:625,
        topic_id:this.topicId
      }).then((res) => {
        console.log(res)
        this.successNotification("Dars xona yaratildi")
        this.closeModalBBB()
      })
    },
    edit() {
      axios.put(`https://api.fastlms.uz/api/teacher_topic/change/${this.editId}/`,
          {
            name: this.changedTitle,
            content_teacher_connect: this.id,
            teacher_id: 625
          }).then(() => {
        this.getSubjects()
        this.closeModalEdit()
      })
    },
    onChangeSwitch(newValue) {
      axios.post(`https://api.fastlms.uz/api/teacher_topic/active/`, {
        teacher_id: 625,
        content_id_topic: this.id,
        content_teacher_connect: this.nextId,
        topic_id: newValue.id
      }).then((res) => {
        this.getSubjects()
        console.log(res)
      })
    },
    showModal() {

      this.isOpenModal = !this.isOpenModal
    },
    closeModal() {
      this.isOpenModal = !this.isOpenModal
    },
    showModalEdit(id) {
      this.editId = id
      this.isOpenEdit = !this.isOpenEdit
    },
    closeModalEdit() {

      this.isOpenEdit = !this.isOpenEdit
    },
    showModalBBB(id) {
      this.topicId=id
      this.isOpenModalBBB = !this.isOpenModalBBB
    },
    closeModalBBB() {
      this.isOpenModalBBB = !this.isOpenModalBBB
    },
    getSubjects() {
      axios.post("https://api.fastlms.uz/api/teacher_topics/", {
        teacher_id: 625,
        content_id_topic: this.id,
        content_teacher_connect: this.nextId
      }).then((res) => {
        this.subjuects = res.data.result
        console.log(res)
      })
    },
    createTitle() {
      console.log(this.id)
      axios.post('https://api.fastlms.uz/api/teacher_topic/add/', {
        content_id_topic: this.id,
        teacher_id: 625,
        name: this.title,
        content_teacher_connect: this.nextId
      }).then((res) => {
        console.log(res)
        this.closeModal()
        this.getSubjects()
      })
      this.title = ''
    }
  }
};
</script>
<style scoped lang="scss">

.subject-list {
  .inner-title {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.28px;
  }

  .add-lesson {
    margin-top: 20px;
    width: 198px;
    height: 53px;
    border-radius: 12px;
    background: #F8FAFF;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: #031B3C;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.32px;
  }

  .lesson-list {
    margin-top: 40px;

    .lesson-list-item {
      display: flex;
      border-radius: 12px;
      height: 53px;
      background: #F8FAFF;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px 0 20px;
      margin-bottom: 20px;

      .name {
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

      .action {
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

      .close {
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

      .footer-modal {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .big-one {
        padding: 10px 20px;
      }
    }
  }
}
</style>