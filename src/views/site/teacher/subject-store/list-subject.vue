<script setup>

</script>

<template>
<div class="container">
  <div class="subject-list-card">
    <div class="header-card">
      <div class="title-card">Soliqlar va Soliqqa tortish </div>
      <div class="subtitle">
        <span>Majburiy</span>|<span>150 soat</span>|<span>5.0 kredit</span>
      </div>
    </div>
    <div class="body-card">
      <div class='card-body-section'>
        <div class="title-section">
          Maruza soni
        </div>
        <div class="info-section">
          <div class="tag">
            31
          </div>
          <div class="info">
            <img width="13" height="13" src="/svg/amountLecture.svg" alt=""/>
          </div>
        </div>
      </div>
      <div class='card-body-section'>
        <div class="title-section">
          Maruza soni
        </div>
        <div class="info-section">
          <div class="tag">
            31
          </div>
          <div class="info">
            <img width="13" height="13" src="/svg/amountLecture.svg" alt=""/>
          </div>
        </div>
      </div>
      <div class='card-body-section'>
        <div class="title-section">
          Maruza soni
        </div>
        <div class="info-section">
          <div class="tag">
            31
          </div>
          <div class="info">
            <img width="13" height="13" src="/svg/amountLecture.svg" alt=""/>
          </div>
        </div>
      </div>
      <router-link to="subject/view">
      <div class="footer-card">

        <button class="button-card">
          Tahrirlash
        </button>

      </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
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
      .button-card{
        height: 24px;
        width: 100%;
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
}
</style>