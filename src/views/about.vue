<template>
  <div class="about">
    <!-- 面包屑 -->
    <div class="bread">
      关于我们
    </div>
    <div class="upload">
      <div class="left">平台图片</div>
      <div class="right">
        <el-upload class="avatar-uploader" action="" :http-request="uploadHttp" :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

    </div>
    <div style="padding:10px 0 40px 70px;color:red">只能上传jpg/png文件，大小2M内</div>

    <div class="text">
      <div class="left">平台介绍</div>
      <textarea v-model="text" placeholder="请输入内容" cols="42" rows="6"></textarea>
    </div>
    <div class="bottom">
      <div @click="save">保存</div>
      <div @click="cancel">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      imageUrl: '',
      fileName: "",
      fileLast: "",
      image: '',
      introduce: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    //   初始化
    init() {
      this.$axios({
        url: '/api/admin/about-us',
      }).then(res => {
        console.log(res);
        this.image = res.data.data.image
        this.introduce = res.data.data.introduce
        this.text = this.introduce
        this.imageUrl = this.image
      })
    },
    //保存
    save() {
      if (this.imageUrl == '') {
        this.$message({
          message: '请上传图片',
          type: 'warning'
        });
      } else if (this.text == '') {
        this.$message({
          message: '请填写平台介绍',
          type: 'warning'
        });
      } else {
        this.$axios({
          url: '/api/admin/about-us',
          method: 'post',
          data: {
            image: this.imageUrl,
            introduce: this.text
          }
        }).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.init()
          }
        })
      }
    },
    //   取消
    cancel() {
      this.text = this.introduce
      this.imageUrl = this.image
    },
    //上传图片
    uploadHttp(e) {
      console.log(e);
      this.$axios({
        url: "api/common/oss-upload-init"
      }).then(res => {
        console.log(res);
        let temp = Object.assign(e.file);
        this.fileLast = temp.name.slice(temp.name.lastIndexOf("."));
        this.fileName = this.getRandom() + this.fileLast;
        var xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("OSSAccessKeyId", res.data.data.accessid);
        formData.append("policy", res.data.data.policy);
        formData.append("Signature", res.data.data.signature);
        formData.append("success_action_status", 200);
        formData.append("key", res.data.data.dir + this.fileName);
        formData.append("file", e.file);
        // console.log(res.data.data.host);

        console.log(formData);
        xhr.open("POST", res.data.data.host, true);
        xhr.send(formData);
        // this.imgList.push(e.content);
        console.log(res.data.data.host);
        console.log(res.data.data.dir);
        console.log(this.fileName);
        setTimeout(() => {
          this.imageUrl = res.data.data.host + "/" + res.data.data.dir + this.fileName
        }, 1000);

        console.log(this.imageUrl);

      })
    },
    getRandom() {
      //获取随机ID
      var randomNum = "";
      for (var i = 0; i < 6; i++) {
        randomNum += Math.floor(Math.random() * 10);
      }
      return randomNum + (new Date().getTime() + 1).toString();
    }
  }
}
</script>

<style lang="less" scoped>
.about {
  .bread {
    font-size: 18px;
    font-weight: 700;
  }
  .upload {
    display: flex;
    padding: 40px 0 0 0;
    font-size: 16px;

    .left {
      padding-right: 20px;
    }
    .right {
      width: 178px;
      height: 180px;
      border: 1px dashed #000;
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
  .text {
    display: flex;
    font-size: 16px;
    .left {
      padding-right: 20px;
    }
    textarea {
      resize: none;
    }
  }
  .bottom {
    padding: 60px;
    display: flex;
    div {
      margin-right: 100px;
      padding: 8px 16px;
      border: 1px solid #58b99e;
      border-radius: 6px;
      color: #58b99e;
      cursor: pointer;
      &:first-child {
        color: #fff;
        background-color: #58b99e;
      }
    }
  }
}
</style>