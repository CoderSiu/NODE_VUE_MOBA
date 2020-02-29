<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="second" type="border-card">
    <el-tab-pane label="基础信息" name="first">
          
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
        class="avatar-uploader"
        :action="$http.defaults.baseURL + '/upload'"
        :show-file-list="false"
        :on-success="afterUpload"
        >
        <img v-if="model.avatar" :src="model.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
          <el-select v-model="model.categories" multiple>
            <el-option
              v-for="item in categories"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="评分">
        <span class="demonstration">难度</span>
        <el-rate :max=9  show-score v-model="model.score.difficult"></el-rate>
        <span class="demonstration">技能</span>
        <el-rate :max=9 show-score v-model="model.score.skills"></el-rate>
        <span class="demonstration">攻击</span>
        <el-rate :max=9 show-score v-model="model.score.attack"></el-rate>
        <span class="demonstration">生存</span>
        <el-rate :max=9 show-score v-model="model.score.survive"></el-rate>
      </el-form-item>
      <el-form-item label="顺风出装">
        <el-select v-model="model.items1" multiple>
          <el-option
            v-for="item in items"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="逆风出装">
        <el-select v-model="model.items2" multiple>
          <el-option
            v-for="item in items"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用技巧">
        <el-input type="textarea" v-model="model.usageTips"></el-input>
      </el-form-item>
      <el-form-item label="对抗技巧">
        <el-input type="textarea" v-model="model.teamTips"></el-input>
      </el-form-item>
      <el-form-item label="团战思路">
        <el-input type="textarea" v-model="model.battleTips"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" native-type="submit">保存</el-button>
        
      </el-form-item>
    
    </el-tab-pane>
    <el-tab-pane label="技能" name="second">
      <el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
      <el-row type="flex">
        <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
            <el-form-item  label="名称">
            <el-input type="text"  v-model="item.name"></el-input>
          </el-form-item>
                <el-form-item label="图标">
        <el-upload
        class="avatar-uploader"
        :action="$http.defaults.baseURL + '/upload'"
        :show-file-list="false"
        :on-success="res => $set(item, 'icon', res.url)"
        >
        <img v-if="item.icon" :src="item.icon" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
            <el-form-item label="描述">
        <el-input type="textarea" v-model="item.description"></el-input>
      </el-form-item>
      <el-form-item label="小提示">
        <el-input type="textarea" v-model="item.tips"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
      </el-form-item>
        </el-col>
          
        

      </el-row>
    </el-tab-pane>
     </el-tabs>
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
      categories: [],
      items: [],
      model: {
          name: "",
          avatar: "",
          title: "",
          score: {},
          skills: [],
          
      },
      
    }
  },
  methods: {
    async afterUpload(res) {
        this.model.avatar = res.url
    },
    async save() {
      console.log('save')
      let res
      if (!this.id){
        res = await this.$http.post('rest/heros', this.model)
      } else {
        res = await this.$http.put(`rest/heros/${this.id}`, this.model)
      }
      
      this.$router.push('/heros/list')
      this.$message({
        type:'success',
        message: '保存成功'
      })
      console.log(res)
    },
    async fetch() {
      const res = await this.$http.get(`rest/heros/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`)
      this.items = res.data
    },
  },
  created() {
    this.fetchItems() 
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>
<style>
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
</style>