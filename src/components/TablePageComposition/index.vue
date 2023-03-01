<template>
  <div>
    <div>
      <el-card>
        <el-table :data="data">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column label="权限值"></el-table-column>
          <el-table-column label="跳转权限值"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button>加</el-button>
              <el-button>编</el-button>
              <el-button>删</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      data: ['labelKey']
    }
  },
  props: [],

}
</script>

<style lang="less" scoped>
</style>
