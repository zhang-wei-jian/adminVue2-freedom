<template>
  <div>
    <div>
      <h1> {{ total }}</h1>
      <el-card>
        <el-table :data="data">
          <el-table-column v-for="item of tableColumn" :label="item.label" :prop="item.prop">
            <template v-slot="{ row }">
              <div v-if="item.prop"> {{ row[item.prop] }}</div>

              <div v-else-if="item.src">
                <img :src="row[item.src]" alt="" :width="item.width + 'px'" :height="item.height + 'px'">
                {{ item.src }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">

        </el-pagination>
      </el-card>
      {{ data }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  props: ['data', 'tableColumn', 'pageNo', 'pageSize', 'total'],
  // props: {
  //   data: {
  //     type: Array,
  //     default: () => {
  //       return []
  //     }
  //   },
  //   tableColumn: {
  //     require: true
  //   },
  //   pageNo: Number,
  //   pageSize: Number,
  //   total: Number,
  // },
  mounted() {
    // console.log(this.data, '我是队长阿伟啊');

  },
  methods: {
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo
      this.$emit('updata', this.pageNo, this.pageSize)
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.$emit('updata', this.pageNo, this.pageSize)
    }
  },
  // watch: {
  //   data: {
  //     handler() {
  //     },
  //   },
  //   immediate: true
  // }

}
</script>

<style lang="less" scoped>
</style>
