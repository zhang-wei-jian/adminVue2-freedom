<template>
  <div>
    <TypeSelect></TypeSelect>
    <el-card>
      <div v-if="state === 'list'">
        <el-button @click="state = 'add'" type="primary">添加属性</el-button>
        <el-table :data="typeKeyList">
          <el-table-column label="序号" prop="categoryId"> </el-table-column>
          <el-table-column label="属性名称" prop="attrName"></el-table-column>
          <el-table-column label="标签" prop="">
            <template v-slot="{ row }">
              <el-tag v-for="(item, index) of row.attrValueList" :key="index">{{
                item.valueName
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="">
            <template>
              <el-button icon="Edit" type="warning"></el-button>
              <el-button icon=" Edit" type="danger"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <formData @editState="editState" :select3ID="select3ID"></formData>
      </div>
    </el-card>
  </div>
</template>

<script>
import TypeSelect from "@/components/TypeSelect";
import { reqTypeKeyList } from "@/api/APItypeSelect";
import { mapState } from "vuex";
import formData from "./formData";
export default {
  name: "typeKey",
  data() {
    return {
      typeKeyList: [],
      state: "list",
    };
  },
  methods: {
    async getTypeKeyList() {
      this.typeKeyList = await reqTypeKeyList(
        this.select1ID,
        this.select2ID,
        this.select3ID
      );
    },
    editState(state) {
      console.log("xiugaizhuangtai ");

      this.state = state;
    },
  },
  mounted() {
    // this.getTypeKeyList();
  },
  computed: {
    ...mapState({
      select1ID: (state) => state.typeSelect.select1ID,
      select2ID: (state) => state.typeSelect.select2ID,
      select3ID: (state) => state.typeSelect.select3ID,
    }),
  },
  watch: {
    select3ID() {
      this.getTypeKeyList();
    },
  },
  components: {
    TypeSelect,
    formData,
  },
};
</script>

<style lang="less" scoped></style>
