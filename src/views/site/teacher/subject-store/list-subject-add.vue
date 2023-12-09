

<template>
  <div class="add-form">
    <div class="page-title">
      Maruza:Soliq
    </div>

    <div class="drop-downer">
      <div class="first-section">
        <div class="downer-title">
          Fayllar ro‘yxatini kiriting
        </div>

        <button @click="showModal" class="common-use-button">
          Qo'shish <img src="/svg/plusWhite.svg" alt=""/>
        </button>
      </div>

      <div>
        <img src="/svg/down.svg" alt=""/>
      </div>
    </div>
    <div class="list-files">
      <div v-for="temp in files" :key="temp" class="list-item">
        <div class="item-name">
          <div style="cursor: pointer" @click="download(temp.file_file)">
            <img src="/svg/file.svg" alt=""/>
          </div>
          <div class="item-name-in">
            Mavzu : {{temp.name}}
          </div>
        </div>
        <div class="action-buttons">
          <button @click="deleteFile(temp.id)" class="common-use-button-red">
            Delete <img src="/svg/delete.svg" alt=""/>
          </button>
        </div>
      </div>
    </div>
    <div class="drop-downer">
      <div class="first-section">
        <div class="downer-title">
          Video maruzalarni kiriting
        </div>

        <button @click="showModalVid" class="common-use-button">
          Qo'shish <img src="/svg/plusWhite.svg" alt=""/>
        </button>
      </div>

      <div>
        <img src="/svg/down.svg" alt=""/>
      </div>
    </div>
    <div class="list-files">
      <div v-for="temp in videos" :key="temp"  class="list-item">
        <div  class="item-name">
          <div style="cursor: pointer" @click="openVid(temp.vide_file)">
            <img src="/svg/video.svg" alt=""/>
          </div>
          <div class="item-name-in">
            Mavzu : {{temp.name}}
          </div>
        </div>
        <div class="action-buttons">
          <button class="common-use-button-red">
            Delete <img src="/svg/delete.svg" alt=""/>
          </button>
        </div>
      </div>
    </div>



    <div class="modal-custom" v-show="isOpenModal">
      <div class="modal-custom-inner">
        <div @click="closeModal" class="close">
          <img src="/svg/exit.svg" alt=""/>
        </div>
        <div class="header-modal">
          Resurs yaratish
        </div>
        <form @submit.prevent="createTitle">
          <div class="body-modal container">

            <base-input v-model="resurce.name" label="Resurs nomi" placeholder="Resurs nomi" rules="required"/>
            <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleFileChange"
                :limit="1"
                :auto-upload="false">

              <el-button size="large" type="primary">Select File</el-button>
            </el-upload>


          </div>
          <div class="footer-modal container">
            <button type="submit" class="common-use-button big-one">
              Yaratish
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-custom" v-show="isOpenModalVid">
      <div class="modal-custom-inner">
        <div @click="closeModalVid" class="close">
          <img src="/svg/exit.svg" alt=""/>
        </div>
        <div class="header-modal">
          Vidio dars yuklash
        </div>
        <form @submit.prevent="createVideo">
          <div class="body-modal container">

            <base-input v-model="vidio.name" label="Vidio nomi" placeholder="Vidio  nomi" rules="required"/>
            <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleFileChangeVidio"
                :limit="1"
                accept="video/*"
              :auto-upload="false">
              <el-button size="large" type="primary">Select File</el-button>
            </el-upload>


          </div>
          <div class="footer-modal container">
            <button type="submit" class="common-use-button big-one">
              Yaratish
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-custom" v-show="onOpenVid">
      <div class="modal-custom-inner">
        <div @click="onCloseVid" class="close">
          <img src="/svg/exit.svg" alt=""/>
        </div>
        <div class="header-modal">
          Yuklangan video
        </div>
        <template>
          <video
              ref="videoPlayer"
              width="100%"
              height="300"
              :src="`https://api.fastlms.uz${this.videoRef}`"
              controls
              preload="auto"
              poster="path-to-your-poster.jpg">
          </video>
        </template>
      </div>
    </div>

  </div>

</template>

<script>
import BaseInput from "@/components/shared-components/BaseInput.vue";
import axios from "axios";

export default {
  components: {BaseInput},
  props: ['id'],
  data() {
    return {
      videoRef:'',
      isOpenModal: false,
      isOpenModalVid: false,
      onOpenVid:false,
      videos:[],
      files:[],
      resurce: {
        name: '',
        file: null
      },
      vidio: {
        name: '',
        vidio: null
      }
    }
  },
  methods: {
    deleteFile(fileId){
      axios.delete(`https://api.fastlms.uz/api/teacher_topic/delete/file/${fileId}/625/${this.id}`).then((res)=>{
        console.log(res)
      })
    },
    download(file){
      axios.get(`https://api.fastlms.uz${file}`).then((res)=>{
        this.handleDownloadResponse(res, file)
      })
    },
    handleDownloadResponse(response, file) {
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = file.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    },
    onCloseVid(){
      this.$refs.videoPlayer.pause();
      this.onOpenVid=false
    },
    openVid(ref){
      this.videoRef = ref
      this.onOpenVid=true
    },
    createTitle(){
      const formData= new FormData();
      formData.append('name',this.resurce.name)
      formData.append('files',this.resurce.file)
      formData.append('topic_id',this.id)
      formData.append('teacher_id',625)

      axios.post('https://api.fastlms.uz/api/teacher_topic/add/file/',formData,{
        headers:{
            'Content-type':'multipart/form-data'
        }
      }).then((res)=>{
        console.log(res)
      })
    },
    createVideo(){
      const formData= new FormData();
      formData.append('name',this.vidio.name)
      formData.append('video',this.vidio.vidio)
      formData.append('topic_id',this.id)
      formData.append('teacher_id',625)

      axios.post('https://api.fastlms.uz/api/teacher_topic/add/video/',formData,{
        headers:{
            'Content-type':'multipart/form-data'
        }
      }).then((res)=>{
        console.log(res)
      })
    },
    showModal() {
      this.isOpenModal = !this.isOpenModal
    },
    closeModal() {
      this.isOpenModal = !this.isOpenModal
    },
    showModalVid() {
      this.isOpenModalVid = !this.isOpenModalVid
    },
    closeModalVid() {
      this.isOpenModalVid = !this.isOpenModalVid
    },
    getResurces(){
      axios.get(`https://api.fastlms.uz/api/teacher_topic/view/?topic_id=${this.id}&teacher_id=625`).then((res)=>{
        this.videos=res.data.result.topic_videos
        this.files=res.data.result.topic_files
        console.log(res)
      })
    },
    handleFileChange(file, fileList) {
      console.log('aaa')
      console.log('File selected:', file);
      console.log(fileList)
      this.resurce.file = file.raw
    },
    handleFileChangeVidio(file, fileList) {
      console.log('aaa')
      console.log('File selected:', file);
      console.log(fileList)
      this.vidio.vidio = file.raw
    },
  },
  mounted() {

    this.getResurces()
  }
}
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
  margin-top: 10px;
  padding: 12px 17px;
  .first-section{
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
.black-one{
  background-color: black;
}
.big-one{
  padding: 10px 20px;
}
.footer-line{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
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
    max-height: 500px;
    width: 100%;
    background: #fff;
    border-radius: 24px;
    position: relative;
    overflow: hidden;

    .close {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
      z-index: 999 !important;
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
</style>


<!--<template>-->
<!--  <div>-->
<!--    <button @click="startMonitoring">Start Monitoring</button>-->
<!--    <canvas ref="screenshotCanvas" style="display: none;"></canvas>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  methods: {-->
<!--    async startMonitoring() {-->
<!--      document.addEventListener('visibilitychange', this.handleInterruption);-->
<!--      window.addEventListener('blur', this.handleInterruption);-->
<!--    },-->
<!--    async handleInterruption() {-->
<!--      if (document.visibilityState === 'hidden' || !document.hasFocus()) {-->
<!--        try {-->
<!--          const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });-->
<!--          this.takeScreenshot(stream);-->
<!--        } catch (error) {-->
<!--          console.error('Error accessing display media:', error);-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    takeScreenshot(stream) {-->
<!--      const video = document.createElement('video');-->
<!--      video.srcObject = stream;-->
<!--      video.play();-->

<!--      video.onloadedmetadata = () => {-->
<!--        const canvas = this.$refs.screenshotCanvas;-->
<!--        canvas.width = video.videoWidth;-->
<!--        canvas.height = video.videoHeight;-->
<!--        const context = canvas.getContext('2d');-->
<!--        context.drawImage(video, 0, 0, canvas.width, canvas.height);-->

<!--        canvas.toBlob(blob => {-->
<!--          const screenshotUrl = URL.createObjectURL(blob);-->
<!--          this.saveScreenshot(screenshotUrl);-->
<!--          stream.getTracks().forEach(track => track.stop()); // Stop the stream-->
<!--          video.remove(); // Clean up video element-->
<!--        }, 'image/png');-->
<!--      };-->
<!--    },-->
<!--    saveScreenshot(screenshotUrl) {-->
<!--      // Here, you would handle the screenshot, e.g., by downloading it or sending it to a server-->
<!--      console.log('Screenshot URL:', screenshotUrl);-->
<!--      // Example: Download the screenshot-->
<!--      const a = document.createElement('a');-->
<!--      a.href = screenshotUrl;-->
<!--      a.download = 'screenshot.png';-->
<!--      document.body.appendChild(a);-->
<!--      a.click();-->
<!--      document.body.removeChild(a);-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
