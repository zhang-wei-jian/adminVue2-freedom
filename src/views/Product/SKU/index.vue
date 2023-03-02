<template>
  <div>
    <el-button @click="totals++">点击送地狱火</el-button>
    <TablePageComposition :tableColumn="tableColumn" :data="skuList" :total="totals" :pageNo="pageNo" :pageSize="pageSize"
      @updata="getSkuList">
    </TablePageComposition>
  </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import { reqSkuList } from '@/api/APIsku'
import TablePageComposition from '@/components/TablePageComposition'
export default {
  name: 'Sku',
  setup(props) {
    // 每一行的数据
    const tableColumn = ref([
      {
        label: '序号',
        prop: 'spuId'
      },
      {
        label: '名称',
        prop: 'skuName'
      },
      {
        label: '描述',
        prop: 'skuDesc'
      },
      {
        label: '默认图片',
        src: 'skuDefaultImg',
        width: 200
      },
    ])
    // 分页的数据
    const pageNo = ref(1)
    const pageSize = ref(5)
    const totals = ref(1)
    const skuList = ref([])
    // console.log(pageNo.value, 'value');


    const getSkuList = async (page = pageNo.value, limit = pageSize.value) => {

      // 获取列表的函数
      const { records, current, pages, size, total } = await reqSkuList(page, limit)
      skuList.value = records
      pageNo.value = current
      pageSize.value = size
      totals.value = total

    }
    getSkuList()

    // onMounted(() => {


    //   getSkuList()
    // })





    return {
      getSkuList,
      tableColumn,
      skuList,
      pageNo,
      pageSize,
      totals

    }
  },
  components: {
    TablePageComposition
  },
}
</script>

<style lang="less" scoped>
</style>
