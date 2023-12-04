

<template>
<div>
  <form>
    <base-input label="Topshiriq uchun izoh" placeholder="Topshiriq uchun izoh"/>
    <base-select label="Select topshiriq metodi" placeholder="Select topshiriq metodi"/>
    <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleFileChange"
        :limit="1"
        :auto-upload="false">

      <el-button size="large" type="primary">Select File</el-button>
    </el-upload>
    <template>
      <div class="block">
        <el-date-picker
            v-model="value1"
            type="datetimerange"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            :default-time="['12:00:00']">
        </el-date-picker>
      </div>
    </template>
  </form>
</div>
</template>

<script>
import BaseInput from "@/components/shared-components/BaseInput.vue";
import BaseSelect from "@/components/shared-components/BaseSelect.vue";


export default {
  components: {BaseSelect, BaseInput},
  data() {
    return {
      value1: '',
      value2: ''
    };
  },
  // Your methods, computed properties, etc.
}
</script>

<style scoped lang="scss">
.el-input__inner{
  border-radius:0px !important;
  border-right-color: rgba(0, 0, 0, 0.18) !important;
}
</style>