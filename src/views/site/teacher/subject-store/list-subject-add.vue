

<template>
  <div class="add-form">
    <div class="page-title">
      Maruza
    </div>
    <div>
      <base-input
      placeholder="Maruza nomini kiriting"
      />
    </div>
    <div class="drop-downer">
      <div class="first-section">
        <div class="downer-title">
          Fayllar ro‘yxatini kiriting
        </div>

        <button class="common-use-button">
          Qo'shish <img src="/svg/plusWhite.svg" alt=""/>
        </button>
      </div>

      <div>
        <img src="/svg/down.svg" alt=""/>
      </div>
    </div>
    <div class="list-files">
      <div class="list-item">
        <div class="item-name">
          <div>
            <img src="/svg/file.svg" alt=""/>
          </div>
          <div class="item-name-in">
            Mavzu : Soliq ishi.pdf
          </div>
        </div>
        <div class="action-buttons">
          <button class="common-use-button">
            Update <img src="/svg/update.svg" alt=""/>
          </button>
          <button class="common-use-button-red">
            Update <img src="/svg/delete.svg" alt=""/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/shared-components/BaseInput.vue";
</script>
<style scoped lang="scss">
.list-files{
  .list-item{
    padding: 12px 16px;
    border-radius: 12px;
    background:  #F8FAFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item-name{
      display: flex;
      gap: 5px;
    }
    .action-buttons{
      display: flex;
      gap: 5px;
    }
  }
}
.drop-downer{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background:  #F8FAFF;
  margin-bottom: 10px;
  padding: 12px 17px;
  .first-section{
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
</style>