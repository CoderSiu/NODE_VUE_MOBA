<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
        <el-form-item>
            <el-button type="text" @click="model.items.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
      <el-row type="flex">
        <el-col :md="24" v-for="(item,i) in model.items" :key="i">
            <el-form-item  label="url">
            <el-input type="text"  v-model="item.url"></el-input>
          </el-form-item>
                <el-form-item label="图片">
        <el-upload
        class="avatar-uploader"
        :action="$http.defaults.baseURL + '/upload'"
        :show-file-list="false"
        :headers="getAuthHeaders()"
        :on-success="res => $set(item, 'image', res.url)"
        >
        <img v-if="item.image" :src="item.image" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
            
      <el-form-item>
        <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
      </el-form-item>
        </el-col>
          
        

      </el-row>
            </el-form-item>
      <el-form-item>
        <el-button type="text" native-type="submit">保存</el-button>
        
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    id: {}
  },
  data(){
    return{
      model: {
          items:[]
      },
      
    }
  },
  methods: {
    async afterUpload(res) {
        console.log(res)
        this.$set(this.model,'icon', res.url)
    },
    async save() {
      console.log('save')
      let res
      if (!this.id){
        res = await this.$http.post('rest/ads', this.model)
      } else {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model)
      }
      
      this.$router.push('/ads/list')
      this.$message({
        type:'success',
        message: '保存成功'
      })
      console.log(res)
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = Object.assign({},this.model,res.data)
    },
  },
  created() {
    this.id && this.fetch()
  }
}
</script>
<style scope>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    min-width: 178px;
    height: 178px;
    display: block;
  }
</style>