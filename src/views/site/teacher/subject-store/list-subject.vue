<template>
<div class="container list-subjects">
  <div v-for="item in subjects" :key="item.id" class="subject-list-card">
    <div class="header-card">
      <div class="title-card">{{item.content_id.subject_id.name}}</div>
      <div class="subtitle">
        <span>{{item.content_id.subject_id.subjectgroup.name}}</span> | <span>{{item.content_id.curriculum_id.markingsystem.gpa_limit}}</span>
      </div>
    </div>
    <div class="body-card">
      <div class='card-body-section'>
        <div class="title-section">
          Til
        </div>
        <div class="info-section">
          <div class="tag">
            {{item.group_lang.name}}
          </div>

        </div>
      </div>
      <div class='card-body-section'>
        <div class="title-section">
          Guruhlar
        </div>
        <div class="info-section">
          <el-tooltip class="item" effect="dark"  placement="top">
            <div slot="content">
              <div style="margin-bottom: 10px" v-for="group in item.group_by" :key="group.id" >
              {{group.name}}
            </div>
            </div>
            <div style="cursor: pointer" class="tag">
              ....
            </div>
          </el-tooltip>


        </div>
      </div>
      <div class='card-body-section'>
        <div class="title-section">
          Maruza soni
        </div>
        <div class="info-section">
          <div class="tag">
            {{item.topic_count}}
          </div>
          <div class="info">
            <img width="13" height="13" src="/svg/amountLecture.svg" alt=""/>
          </div>
        </div>
      </div>
      <div class='card-body-section'>
        <div class="title-section">
          Video darsliklar
        </div>
        <div class="info-section">
          <div class="tag">
            {{item.video_count}}
          </div>
          <div class="info">
            <img width="13" height="13" src="/svg/vidio.svg" alt=""/>
          </div>
        </div>
      </div>
      <div class='card-body-section'>
        <div class="title-section">
          Topshiriqlar soni
        </div>
        <div class="info-section">
          <div class="tag">
            {{ item.task_count}}
          </div>
          <div class="info">
            <img width="13" height="13" src="/svg/user.svg" alt=""/>
          </div>
        </div>
      </div>
      
      <div class="footer-card">
  <router-link class="button-card" :to="{ name: 'list-view', params: { id: item.content_id.id, nextId: item.id } }" >
        <button class="button-card">
          Tahrirlash
        </button>
        </router-link>
        <router-link class="button-card" :to="{ name: 'lessons', params: { id: item.content_id.id, nextId: item.id } }" >
  <button class="button-card">
            Dars o'tish
          </button>
      </router-link>
      </div>
      
    </div>
  </div>
</div>
</template>
<script >




import axios from "axios";

export default {
  name:'List-subject',
  data(){
    return{
      subjects:[]
    }
  },
  methods:{
    getSubjects(){
      axios.post('https://api.fastlms.uz/api/teacher_contents/',{teacher_id:625}).then((res)=>{
        this.subjects=res.data.result
        console.log(res)
      }).catch(()=>{

      })
    },
  },
  mounted() {
    this.getSubjects()
  }
}
</script>
<style scoped lang="scss">
.list-subjects{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;

}
.subject-list-card{
  background: #008BF8;
  max-width: 281px;
  width: 100%;
  border-radius: 20px;

  .header-card{
    padding: 24px;
    box-sizing: border-box;
    .title-card{
      color: #F2F3F8;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.32px;
    }
    .subtitle{
      margin-top: 3px;
      color:  #F2F3F8;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.24px;
    }

  }
  .body-card{
    border-top-left-radius: 0 !important;
    border-radius: 20px;
    padding: 24px;
    box-sizing: border-box;
    background: #fff;
    .card-body-section{
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-section{
        color: #919CAA;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.28px;
      }
      .info-section{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        .tag{
          display: inline-flex;
          padding: 0 8px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 2px;
          border-radius: 100px;
          background:  #008BF8;
          color: #FFF;
          font-size: 10px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.2px;
        }
      }
    }
    .footer-card{
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
    
    }
      .button-card{
        height: 24px;
        width: 100% !important;
        border-radius: 12px;
        background:  linear-gradient(133deg, #008BF8 0.82%, #0043A7 99.18%);
        color:  #F2F3F8;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.24px;
      }
  }
}
</style>