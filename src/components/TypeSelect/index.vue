<template>
  <div>
    <el-card>
      <!-- 一级分类列表 -->
      <el-select v-model="select1ID" @change="select1Change">
        <el-option
          v-for="item of selectList1"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <!-- 二级分类列表 -->
      {{ select2ID }}
      <el-select v-model="select2ID" @change="select2Change">
        <el-option
          v-for="item of selectList2"
          :key="item.id"
          :label="item.name"
          :value="item.category1Id"
        >
        </el-option>
      </el-select>
      <!-- 三级分类列表 -->
      <el-select v-model="select3ID" @change="select3Change">
        <el-option
          v-for="item of selectList3"
          :key="item.id"
          :label="item.name"
          :value="item.category1Id"
        >
        </el-option>
      </el-select>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  reqGetCategory1List,
  reqGetCategory2List,
  reqGetCategory3List,
} from "@/api/APItypeSelect";
export default {
  name: "TypeSelect",
  data() {
    return {
      // selectList1: [],
      // selectList2: [],
      // selectList3: [],
      select1ID: "",
      select2ID: "",
      select3ID: "",
    };
  },
  methods: {
    select1Change(id1) {
      // 拿着id1去获取列表2
      this.select2ID = this.select3ID = "";
      this.$store.dispatch("typeSelect/getSelect2", id1);
    },
    select2Change(id2) {
      // 拿着id1去获取列表2
      this.select3ID = "";
      this.$store.dispatch("typeSelect/getSelect3", id2);
    },
    select3Change(id3) {
      // 拿着id1去获取列表2
      this.$store.dispatch("typeSelect/edit3Id", id3);
    },
  },
  computed: {
    // ...mapState()
    selectList1() {
      return this.$store.state.typeSelect.selectSelectList1;
    },
    ...mapState({
      selectList2: (state) => state.typeSelect.selectSelectList2,
      selectList3: (state) => state.typeSelect.selectSelectList3,
      // select1ID: (state) => state.typeSelect.select1ID,
      // select2ID: (state) => state.typeSelect.select2ID,
      // select3ID: (state) => state.typeSelect.select3ID,
    }),
  },
  mounted() {
    //  获取列表1
    this.$store.dispatch("typeSelect/getSelect1");
  },
};
</script>

<style lang="less" scoped></style>
