
<template>
  <div class="about">
    <h1>分类列表</h1>
      <el-table :data="ads">
        <el-table-column prop="_id" label="ID" width="180"></el-table-column>
        <el-table-column prop="title" label="名字"></el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ads: []
    }
  },
  methods:{
    async fetch() {
      const res = await this.$http.get('rest/ads')
      this.ads = res.data
    },
    async remove(row) {
      this.$confirm(`此操作将永久删除该文件, 是否继续删除${row.name} ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then( async () => {
        await this.$http.delete(`rest/ads/${row._id}`)
        this.fetch()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });          
      })
      
      }
  },
  created() {
    this.fetch()
  }
}
</script>