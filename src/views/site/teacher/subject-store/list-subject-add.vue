

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
          <button class="common-use-button-red">
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
      <div class="list-item">
        <div class="item-name">
          <div>
            <img src="/svg/video.svg" alt=""/>
          </div>
          <div class="item-name-in">
            Mavzu : Soliq ishi.pdf
          </div>
        </div>
        <div class="action-buttons">
          <button class="common-use-button-red">
            Delete <img src="/svg/delete.svg" alt=""/>
          </button>
        </div>
      </div>
    </div>
    <div class="footer-line">
      <router-link to="/list/subject/view">
      <button class="common-use-button black-one">
        <img src="/svg/back.svg" alt=""/>
        Orqaga
      </button>
      </router-link>
      <button class="common-use-button big-one">
        Saqlash
      </button>
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
        <form @submit.prevent="createTitle">
          <div class="body-modal container">

            <base-input v-model="vidio.name" label="Vidio nomi" placeholder="Vidio  nomi" rules="required"/>
            <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleFileChange"
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

  </div>

</template>

<script>
import BaseInput from "@/components/shared-components/BaseInput.vue";

export default {
  components: {BaseInput},
  data() {
    return {
      isOpenModal: false,
      isOpenModalVid: false,
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
    handleFileChange(file, fileList) {
      console.log('aaa')
      console.log('File selected:', file);
      console.log(fileList)
      this.resurce.file = file
    },
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
