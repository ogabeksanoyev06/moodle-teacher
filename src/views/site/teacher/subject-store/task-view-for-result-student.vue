

<template >
  <div class="card files">
    <div class="list-name">Talabalar ro‘yxati</div>
    <div class="body-list">
      <div v-for="(item,index) in this.tasks" :key="index" class="body-list-item">
        <div class="left">
          {{index+1}}.{{item.task_student_id.full_name}}
        </div>
        <div class="right">
          <div class="start-date">
            {{item.task_group_id.name}}
          </div>
          <div class="end-date">
            <button v-show="item.file_status" @click="download(item.student_file)" class="common-use-button">
              Filelar
            </button>
          </div>
          <button v-show="!item.mark_status" @click="openMark(item)" class="common-use-button">
            Baholash
          </button>
          <div v-show="item.mark_status">
            Baholangan
          </div>
        </div>
      </div>
    </div>
    <div class="modal-custom" v-show="isOpenFile">
      <div class="modal-custom-inner">
        <div @click="()=>this.isOpenFile = false" class="close">
          <img src="/svg/exit.svg" alt=""/>
        </div>
        <div class="header-modal">
          Yuklangan filelar
        </div>

      </div>
    </div>
    <div class="modal-custom" v-show="isOpenMark">
      <div class="modal-custom-inner">
        <div @click="()=>this.isOpenMark = false" class="close">
          <img src="/svg/exit.svg" alt=""/>
        </div>
        <div class="header-modal special-one">
          {{this.tempStudent.full_name}}ni <br>
          baholash
        </div>
<div class="main-form">
        <el-form label-position="top" :model="mark" :rules="rules" ref="mark" label-width="120px" class="demo-ruleForm">
          <el-form-item label="Baho" prop="mark">
            <el-input type="number" v-model="mark.mark"></el-input>
          </el-form-item>
          <el-form-item label="Izoh" prop="comment">
            <el-input type="textarea" v-model="mark.comment"></el-input>
          </el-form-item>

        </el-form>
        <button class="common-use-button big-one" @click="marking('mark',$event)">
          Saqlash
        </button>
  </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {

  props:['task_id'],
  data(){
    return{
      tasks:[],
      isOpenFile:false,
      isOpenMark:false,
      tempStudent:{},
      mark:{
        mark:'',
        comment:'',
        teacher_id:JSON.parse(localStorage.getItem('employeeInfo')).employee_id_number,
        task_id:'',
        student_id:'',
        task_student_id:''
      },
      rules: {
        mark: [
          {required: true, message: "Iltimos to'ldiring", trigger: 'blur'},
        ],
        comment: [
          {required: true, message: "Iltimos to'ldiring", trigger: 'blue'}
        ],
      }
    }
  },
  methods:{
    marking(formName,e) {
      e.preventDefault()

      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('https://api.fastlms.uz/api/teacher_task/student/mark/', this.mark).then((res) => {
            console.log(res)
            this.$refs[formName].resetFields();
            this.notificationMessage("Baho muofaqiyatli qo'shildi!", "success");
            this.isOpenMark=false
            this.getTasks()
          }).catch((err)=>{
            console.log(err)
            this.notificationMessage(err.response.data.message, "error");
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    openFile(){
      this.isOpenFile = true
    },openMark(student){
      this.mark.task_id = student.tasks_id.id
      this.mark.student_id = student.task_student_id.id
      this.mark.task_student_id = student.id
      this.tempStudent = student.task_student_id
      this.isOpenMark = true
    },
    download(file){
      axios.get(`https://api.fastlms.uz${file}`, { responseType: 'blob' }) // Set responseType to 'blob'
          .then((res) => {
            this.handleDownloadResponse(res, file)
          })
          .catch((err) => {
            console.error(err);
          });
    },
    handleDownloadResponse(response, file) {
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      const filename = file.split('/').pop();
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    },
    getTasks(){
    axios.get(`https://api.fastlms.uz/api/teacher_task_list/students/?task_id=${this.task_id}&teacher_id=${JSON.parse(localStorage.getItem('employeeInfo')).employee_id_number}`).then((res)=>{
      console.log(res)
      this.tasks=res.data.results
    })
    },
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
.body-list{
  display: flex;
  flex-direction: column;
  gap: 5px;

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
    }
  }
  .left{
    color: #031B3C;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.32px;
  }

}
.modal-custom {
  .special-one{
    font-size: 16px !important;
    text-align: center;
  }
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
.main-form{
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>