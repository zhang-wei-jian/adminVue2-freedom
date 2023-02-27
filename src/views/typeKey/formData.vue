<template>
  <div>
    属性名<el-input
      label="属性名"
      v-model="keyName"
      placeholder="请输入属性"
      value="ssss"
      :readonly="keyValue.length >= 1"
    ></el-input>
    <el-button
      type="primary"
      @click="formAdd"
      :disabled="keyName.trim() === ''"
    >
      确定添加属性
    </el-button>

    <!-- 下面是表格 -->

    <el-table :data="keyValue">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column label="属性值名称">
        <template v-slot="{ row }">
          <!-- <div>{{ row.valueName }}</div> -->
          <el-input
            v-if="row.editState"
            v-model="row.valueName"
            ref="inputRef"
            @blur="inputBlur(row)"
          ></el-input>
          <el-tag v-if="!row.editState" @click="goEditStateFocus(row)">{{
            row.valueName
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="danger" @click="deleteKey(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button
      type="primary"
      :disabled="keyName.trim() === ''"
      @click="submitKeyValue"
    >
      保存
    </el-button>
    <el-button @click="$emit('editState', 'list')"> 取消 </el-button>
  </div>
</template>

<script>
import { reqSubmitKeyValue } from "@/api/APItypeSelect";
export default {
  name: "",
  data() {
    return {
      keyName: "",
      keyValue: [],
    };
  },
  methods: {
    formAdd() {
      const value = {
        valueName: "",
        editState: true,
      };
      this.keyValue.push(value);
      this.$nextTick(() => {
        this.$refs.inputRef.focus();
      });
    },
    goEditStateFocus(row) {
      row.editState = true;
      this.$nextTick(() => {
        this.$refs.inputRef.focus();
      });
    },
    deleteKey(row) {
      this.keyValue = this.keyValue.filter((item) => {
        return row !== item;
      });
    },
    inputBlur(row) {
      row.editState = false;
      if (row.valueName.trim() === "") {
        this.keyValue = this.keyValue.filter((item) => {
          return row !== item;
        });
      }
    },
    async submitKeyValue() {
      // console.log({
      //   select3ID: this.select3ID,
      //   categoryLevel: 3,
      //   valueName: this.keyName,
      //   attrValueList: this.keyValue,
      // });

      const data = {
        categoryId: this.select3ID,
        categoryLevel: 3,
        attrName: this.keyName,
        attrValueList: this.keyValue,
      };
      await reqSubmitKeyValue(data);
      return;
      try {
        // await reqSubmitKeyValue({
        //   select3ID: this.select3ID,
        //   categoryLevel: 3,
        //   valueName: this.keyName,
        //   attrValueList: this.keyValue,
        // });
      } catch (error) {
        this.$message.error("提交失败");
        console.log(error);

        return;
      }
      // this.$message.success("提交成功!");
      this.$emit("editState", "list");
    },
  },
  props: ["select3ID"],
};
</script>

<style lang="less" scoped></style>
