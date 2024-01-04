

<template>
  <div class="card files">
    <div class="list-name">Topshiriqlar ro‘yxati</div>
    <div class="body-list">
      <div v-for="(item,index) in this.tasks" :key="index" class="body-list-item">
        <div class="left">
          {{index+1}}.{{item.name}}
        </div>
        <div class="right">
          <div class="start-date">
            <span>Boshlanish vaqti</span>
            {{getYear(item.start_date)}}
          </div>
          <div class="end-date">
            <span>Tugash vaqti</span>
           {{getYear(item.end_date)}}
          </div>
          <div class="end-date">
            <span>Ajratilgan ball</span>
                 {{item.score}}
          </div>
          <router-link :to="{name:'task-view-for-result-student',params:{task_id:item.id}}">
          <button class="common-use-button">
            Baholash
          </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props:['id'],
  data(){
    return{
      tasks:[],
    }
  },
  methods:{
    getTasks(){
    axios.get(`https://api.fastlms.uz/api/tasks/view/?topic_id=${this.id}&teacher_id=${JSON.parse(localStorage.getItem('employeeInfo')).employee_id_number}`).then((res)=>{
      console.log(res)
      this.tasks=res.data.result
    })
    },
    getYear(time) {
  const date = new Date(time);
  const pad = (num) => num.toString().padStart(2, '0');
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Adding 1 because getMonth() returns 0-11
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
  },
  mounted() {
    this.getTasks()
  }
}
</script>
<style scoped lang="scss">
.files{
  padding: 5px;
}
.head-add-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background: #F8FAFF;
  height: 53px;
  padding: 24px 16px;

  .right {
    display: flex;
    gap: 5px;
  }
}
.list-name{
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.28px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.body-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background: #F8FAFF;
  height: 53px;
  padding: 24px 16px;

  .right {
    display: flex;
    align-items: center;
    gap: 10px;

    .start-date {
      display: flex;
      flex-direction: column;
      color:  #031B3C;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.28px;
      justify-content: center;
      align-items: center;
      span {
        color:  #2ED59F;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.24px;
      }
    }

    .end-date {
      display: flex;
      flex-direction: column;
      color:  #031B3C;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.28px;
      justify-content: center;
      align-items: center;
      span {
        color: #2ED59F;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.24px;
      }
    }
  }
  .left{
    color: #031B3C;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;
  }
}
</style>