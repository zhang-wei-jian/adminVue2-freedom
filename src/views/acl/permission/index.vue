<template>
  <div>
    <el-card>
      <!-- {{ dataList }} -->
      <el-table :data="dataList">
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
</template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api'
import { reqPermission } from '@/api/APIacl'
export default {
  name: '',
  setup(props) {

    const dataList = ref([])
    const getPermission = async () => {
      // 获取列表啊
      const { children } = await reqPermission()
      dataList.value = children
      console.log(dataList.value, '我的数据啊');

    }


    onMounted(() => {
      getPermission()
    })



    return {
      dataList,

    }
  }
}
</script>

<style lang="less" scoped>
</style>
