

<template>
  <div>
    <div class="head-add-buttons">
      <div class="left">
        Topshiriq yaratish
      </div>
      <div class="right">
        <router-link :to="{name:'task-add-student',params:{topic_id:this.id}}">
        <button class="common-use-button">
          Talabalar uchun
          <img src="/svg/plusWhite.svg" alt=""/>
        </button>
        </router-link>
        <router-link :to="{name:'task-add-group',params:{topic_id:this.id}}">
        <button class="common-use-button">
          Guruhlar kesimida
          <img src="/svg/plusWhite.svg" alt=""/>
        </button>
        </router-link>
      </div>
    </div>
    <div class="list-name">Topshiriqlar ro‘yxati</div>
    <div class="body-list">
      <div class="body-list-item">
        <div class="left">
          1.Soliq haqida nimani bilasiz
        </div>
        <div class="right">
          <div class="start-date">
            <span>boshlanish vaqti</span>
            5 noyabr 12:00
          </div>
          <div class="end-date">
            <span>tugash vaqti</span>
            5 noyabr 12:00
          </div>
          <div class="eye">
            <img src="/svg/eye.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['id'],
  data(){
    return{

    }
  }
}
</script>
<style scoped lang="scss">
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