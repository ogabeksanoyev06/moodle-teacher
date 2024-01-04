<template>
  <div>
    <div class="subject-list">
      <div class="inner-title">
        <span>Fan nomi:</span>Soliq va Soliqqa tortish
      </div>


      <div class="lesson-list">

        <div v-for="(t, index) in this.subjuects" :key="t.id" class="lesson-list-item">
          <div class="name">
            <div class="tr">
              {{ index + 1 }}.
            </div>
            <div class="name">
              {{ t.name }}
              <div v-if="t.in_progress" class="loader"></div>
            </div>
          </div>
          <div class="action">


            <router-link :to="{ name: 'task-view-for-result', params: { id: t.id } }">
              <button class="common-use-button">
                Topshiriqlar
                <img src="/svg/subject.svg" alt=""/>
              </button>
            </router-link>

            <button @click="openBBB(t.id)" class="common-use-button">
              Dars xonasini kirish
              <img src="/svg/room.svg" alt=""/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios";

export default {
  name: 'AppLesson',
  props: ['id', 'nextId'],

  data() {
    return {
      value1: true,
      isOpenModalBBB: false,
      title: '',
      subjuects: [],

    }
  },
  mounted() {

    this.getSubjects()
  },
  methods: {
    openBBB(id) {
      axios.get(`https://api.fastlms.uz/api/teacher/bigbluebutton/create/?teacher_id=${JSON.parse(localStorage.getItem('employeeInfo')).employee_id_number}&topic_id=${id}`).then((res) => {
        console.log(res.data.results.id)
        this.join(res.data.results.id)
      }).catch(()=>{
        this.errorNotification("Nimadir xato")
      })
    },
    join(id) {
      axios.post(`https://api.fastlms.uz/api/bigbluebutton/join/moderator/`,{
        username:JSON.parse(localStorage.getItem('employeeInfo')).name,
        id:id
      }).then((res) => {
        window.open(res.data.url)
        console.log(res)
      }).catch(()=>{
        this.errorNotification("Dars xona mavjud emas")
      })
    },
    getSubjects() {
      axios.post("https://api.fastlms.uz/api/teacher_topics/", {
        teacher_id: JSON.parse(localStorage.getItem('employeeInfo')).employee_id_number,
        content_id_topic: this.id,
        content_teacher_connect: this.nextId
      }).then((res) => {
        this.subjuects = res.data.result
        console.log(res)
      })
    },

  }
};
</script>
<style scoped lang="scss">
.name {
  display: flex;
}

.loader {
  width: 15px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #000;
  box-shadow: 0 0 0 0 #0004;
  animation: l1 1s infinite;
}

@keyframes l1 {
  100% {
    box-shadow: 0 0 0 30px #0000
  }
}

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