<template>
  <div>
    <el-form  label-position="top" :model="task" :rules="rules" ref="task" label-width="120px" class="demo-ruleForm">
      <div class="all-forms">
      <div class="form-item">
        <el-form-item  label="Topshiriq nomi" prop="name">
          <el-input v-model="task.name"></el-input>
        </el-form-item>
      </div>
      <div class="form-item">
        <el-form-item label="Topshiriq uchun izoh" prop="comment">
          <el-input v-model="task.comment"></el-input>
        </el-form-item>
      </div>
      <div class="form-item">
        <el-form-item label="Topshiriq shakli" prop="task_id_type">
        <el-select style="width: 100%" v-model="task.task_id_type" clearable placeholder="Select">
          <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
      </div>
      <div class="form-item">
        <el-form-item label="Guruh tanlash" >
          <el-select style="width: 100%" @change="getStudent" v-model="tempGroup" clearable placeholder="Select">
            <el-option
                v-for="item in optionTable"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </div>
      <div class="form-item">
        <el-form-item label="Ajratilgan ball" prop="score">
          <el-input v-model="task.score"></el-input>
        </el-form-item>
      </div>
      <div class="form-item">
       <el-form-item label="Muddatni kiriting">
        <el-date-picker
            style="width: 100%"
            v-model="task.dateTimer"
            type="datetimerange"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            :default-time="['12:00:00', '12:00:00']">
        </el-date-picker>
       </el-form-item>
      </div>

      </div>
      <div class="form-item-small">
        <el-form-item label="Topshiriq fayllari">
        <el-upload
            ref="video"
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleFileChange"
            :auto-upload="false"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </el-upload>
        </el-form-item>
      </div>
      <div v-show="tableData.length>0">
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
          >
            <template slot-scope="scope">{{ scope.row.full_name }}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="list-added-students" v-show="tempStudents.length>0">
        <div class="selected-students">
          Tanlangan talabalar
        </div>
        <div class="list-student-item" v-for="(item,index) in this.tempStudents" :key="index">
          <div class="name-student">
            {{ index + 1 }}.
            {{ item.full_name }}
          </div>
          <div class="delete" @click="pop(item.id)">
            <img src="/svg/delete.svg"/>
          </div>
        </div>
      </div>

      <button class="common-use-button"  @click="submitForm">Saqlash</button>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";


export default {
  props: ['topic_id'],
  data() {
    return {
      tempGroup: '',
      task: {
        name: '',
        comment: '',
        topic_id_task: this.topic_id,
        dateTimer: [],
        task_id_type: '',
        score: '',
        teacher_id: 625,
        task_check: false,
        task_group: {},
        task_files: []
      },
      tempStudents: [],
      tableData: [],
      multipleSelection: [],
      options: [],
      optionTable: []
    };
  },
  methods: {
    getGroups() {
      axios.get(`https://api.fastlms.uz/api/tasks/groups/?topic_id=${this.topic_id}&teacher_id=625`).then((res) => {
        this.optionTable = res.data.result;
        console.log(res)
      })
    },
    getOptions() {
      axios.get(`https://api.fastlms.uz/api/tasktype/`).then((res) => {
        this.options = res.data.results;

      })
    },
    getStudent() {
      console.log('aaa')
      axios.get(`https://api.fastlms.uz/api/tasks/group/students/?group_id=${this.tempGroup}&teacher_id=625`).then((res) => {
        this.tableData = res.data.result
      })
    },
    handleFileChange(file) {
      this.task.task_files = file.raw
    },
    formatDateString(dateString) {
      let date = new Date(dateString);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      let time = date.toTimeString().split(' ')[0];
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
      val.map(temp => {
        if (!this.tempStudents.find(item => item.id === temp.id)) {
          this.tempStudents.push(temp);
        }
      });
      this.$refs.multipleTable.clearSelection();
      this.tempStudents.forEach(student => {
        const rowToSelect = this.tableData.find(row => row.id === student.id);
        if (rowToSelect) {
          this.$refs.multipleTable.toggleRowSelection(rowToSelect, true);
        }
      });
    },
    pop(id) {
      this.tempStudents = this.tempStudents.filter(item => item.id !== id);
      this.$refs.multipleTable.clearSelection();
      this.tempStudents.forEach(student => {
        const rowToSelect = this.tableData.find(row => row.id === student.id);
        if (rowToSelect) {
          this.$refs.multipleTable.toggleRowSelection(rowToSelect, true);
        }
      });
    },
    submitForm() {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.createTask()
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });},
this.createTask()
    },
    createTask() {
      const formData = new FormData();
      formData.append('name', this.task.name)
      formData.append('comment', this.task.comment)
      formData.append('score', this.task.score)
      formData.append('task_id_type', this.task.task_id_type)
      formData.append('topic_id_task', this.task.topic_id_task)
      formData.append('task_check', this.task.task_check)
      formData.append('name', this.task.name)
      formData.append('task_group', this.task.task_group)
      formData.append('task_files', this.task.task_files)
      formData.append('teacher_id', this.task.teacher_id)
      formData.append('start_date', this.formatDateString(this.task.dateTimer[0]))
      formData.append('end_date', this.formatDateString(this.task.dateTimer[1]))
      formData.append('task_student', JSON.stringify({}))
      axios.post('https://api.fastlms.uz/api/tasks/create/', formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then((res) => {
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
.el-input__inner {
  border-radius: 0px !important;
  border-right-color: rgba(0, 0, 0, 0.18) !important;
}

.form-item {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.all-forms{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}
.form-item-small{
  width: 350px;
}
.list-student-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 5px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
}
.delete{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.selected-students{
  padding: 15px 10px;
  font-size: 20px;
  font-weight: 700;
}
</style>