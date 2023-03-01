<template>
  <div>
    <!-- <el-card>
      <el-table :data="skuList">
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
    </el-card> -->
    <TablePageComposition dsb="12321"></TablePageComposition>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api'
import { reqSkuList } from '@/api/APIsku'
import TablePageComposition from '@/components/TablePageComposition'
export default {
  name: 'Sku',
  components: {
    TablePageComposition
  },
  setup(props) {


    const skuList = ref([])
    const getSkuList = async () => {
      // 获取列表啊
      skuList.value = await reqSkuList()
      console.log('sku的返回', skuList.value,);

    }

    onMounted(() => {
      console.log('改在');

      getSkuList()
    })





    return {
      skuList,

    }
  }
}
</script>

<style lang="less" scoped>
</style>
