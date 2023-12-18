

<template>
<div>
  <form @submit.prevent="createTask">
    <base-input type="text" v-model="task.name" label="Topshiriq nomi " placeholder="Topshiriq nomi "/>
    <base-input v-model="task.comment" label="Topshiriq uchun izoh" placeholder="Topshiriq uchun izoh"/>
    <template>
      <label>Topshiriq metodi</label>
      <el-select v-model="task.task_id_type" clearable placeholder="Select">
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
    </template>
    <base-input v-model="task.score" type="number"  label="Ajratilgan ball" placeholder="Ajratilgan ball"/>
    <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-change="handleFileChange"
        :auto-upload="false"
        multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </el-upload>
    <template>
      <div class="block">
        <el-date-picker
            v-model="task.dateTimer"
            type="datetimerange"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            :default-time="['12:00:00', '12:00:00']">
        </el-date-picker>
      </div>
    </template>
    <template>
      <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            label="Nomi"
            width="120">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
            property="name"
            label="O'quv reja">
          <template slot-scope="scope">{{ scope.row.group_curriculum.name }}</template>
        </el-table-column>
        <el-table-column
            property="address"
            label="Sohasi"
            show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.specialty.name }}</template>

        </el-table-column>
      </el-table>
    </template>
    <button type="submit">Saqlash</button>
  </form>
</div>
</template>

<script>
import BaseInput from "@/components/shared-components/BaseInput.vue";
import axios from "axios";


export default {
  props:['topic_id'],
  components: { BaseInput},
  data() {
    return {
      task: {
        name: '',
        comment: '',
        topic_id_task: this.topic_id,
        dateTimer:[],
        task_id_type: '',
        score: '',
        teacher_id: 625,
        task_check: false,
        task_group: {},
        task_files: []
      },
      tableData: [],
      multipleSelection: [],
      options:[]
    };
  },
  methods: {
    getGroups(){
      axios.get(`https://api.fastlms.uz/api/tasks/groups/?topic_id=${this.topic_id}&teacher_id=625`).then((res)=>{
        this.tableData=res.data.result;
      })
    },
    getOptions(){
      axios.get(`https://api.fastlms.uz/api/tasktype/`).then((res)=>{
        this.options=res.data.results;

      })
    },
    handleFileChange(file) {
      console.log(this.task.dateTimer[0])
       this.task.task_files = file.raw
    },
    formatDateString(dateString) {
      let date = new Date(dateString);
      let year = date.getFullYear();
      let month = date.getMonth() + 1; // getMonth() is zero-based
      let day = date.getDate();

      // Ensuring two-digit month and day format
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      // Extract the time in HH:MM:SS format
      let time = date.toTimeString().split(' ')[0];

      // Format the date string
      return `${year}-${month}-${day} ${time}`;
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(val.map(row => row.id))
      const temp = val.map(row => row.id);
      this.task.task_group = JSON.stringify(temp) ;
    },
    createTask(){
      const formData = new FormData();
      formData.append('name',this.task.name)
      formData.append('comment',this.task.comment)
      formData.append('score',this.task.score)
      formData.append('task_id_type',this.task.task_id_type)
      formData.append('topic_id_task',this.task.topic_id_task)
      formData.append('task_check',this.task.task_check)
      formData.append('name',this.task.name)
      formData.append('task_group',this.task.task_group)
      formData.append('task_files',this.task.task_files)
      formData.append('teacher_id',this.task.teacher_id)
      formData.append('start_date',this.formatDateString(this.task.dateTimer[0]))
      formData.append('end_date',this.formatDateString(this.task.dateTimer[1]))
      formData.append('task_student',JSON.stringify({}))
      axios.post('https://api.fastlms.uz/api/tasks/create/',formData,{
        headers:{
          'Content-type':'multipart/form-data'
        }
      }).then((res)=>{
        console.log(res)
      })
    }
  },
  mounted() {
    this.getOptions()
  this.getGroups()
  }
}
</script>

<style scoped lang="scss">
.el-input__inner{
  border-radius:0px !important;
  border-right-color: rgba(0, 0, 0, 0.18) !important;
}
</style>