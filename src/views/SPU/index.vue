<template>
  <div>
    <TypeSelect></TypeSelect>

    <el-card>
      <div v-if="pageState === 'list'">
        <el-button
          type="primary"
          icon="Plus"
          @click="pageState = 'form'"
          :disabled="!category3Id"
          >添加SPU{{ category3Id }}</el-button
        >

        <el-table :data="spuList">
          <el-table-column label="SPUID" prop="id"> </el-table-column>
          <el-table-column label="SPU名称" prop="spuName"> </el-table-column>
          <el-table-column label="SPU描述" prop="description">
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button icon="Plus" type="success"></el-button>
              <el-button icon="Edit" type="warning"></el-button>
              <el-button icon="Add" type="info"></el-button>
              <el-button icon="Deldet" type="danger"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :total="total"
          :current="pageNo"
          :page-size="pageSize"
          :page-sizes="[5, 10, 20, 400]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <div v-if="pageState === 'form'">
        <Form @pageState="pageStateChange"></Form>
      </div>
    </el-card>
  </div>
</template>

<script>
import TypeSelect from "@/components/TypeSelect";
import { reqGetSpu } from "@/api/APISPU";
import { mapState } from "vuex";
import Form from "./Form.vue";

export default {
  name: "Page404",
  data() {
    return {
      pageNo: 1,
      pageSize: 5,
      total: 0,
      spuList: [],
      pageState: "form",
    };
  },
  methods: {
    async getSpuList() {
      const res = await reqGetSpu(this.pageNo, this.pageSize, this.category3Id);
      this.spuList = res.records;
      this.pageNo = res.current;
      this.pageSize = res.size;
      this.total = res.total;
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.getSpuList();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getSpuList();
    },
    pageStateChange(state) {
      this.pageState = state;
    },
  },

  mounted() {
    this.getSpuList();
  },

  computed: {
    ...mapState({
      category3Id: (state) => state.typeSelect.select3ID,
    }),
  },
  watch: {
    category3Id() {
      this.getSpuList();
    },
  },
  components: {
    TypeSelect,
    Form,
  },
};
</script>

<style lang="scss" scoped></style>
