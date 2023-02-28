<template>
  <div>
    <el-form-item label="销售属性">
      <el-select v-model="attrValue">
        <el-option
          v-for="item of attrKeyList"
          :key="item.id"
          :value="item.id"
          :label="item.saleAttrName"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="addAttrItem">添加销售属性</el-button>
    </el-form-item>

    <!-- 表格 -->
    <el-form-item>
      <el-table :data="tabelValue">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="saleAttrName" label="属性名"> </el-table-column>
        <el-table-column label="属性值列表">
          <template v-slot="{ row }">
            <el-tag
              v-for="tab of row.spuSaleAttrValueList"
              :label="11"
              closable
              >{{ tab.saleAttrValueName }}</el-tag
            >
            <el-input
              style="width: 88px"
              v-show="row.editState"
              @blur="inputBlur(row)"
              v-model="tagValue"
              ref="inputRef"
            ></el-input>
            <el-button @click="addTag(row)">添加</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="warning" size="mini">修改</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </div>
</template>

<script>
import { reqAttrKey } from "@/api/APISPU";
import PubSub from "@/utils/PubSub";
export default {
  name: "",
  data() {
    return {
      attrSelectList: [], //我不会动的销售下拉列表
      attrKeyList: [], //销售下拉列表
      attrValue: "",
      attrName: "",
      tabelValue: [],
      tagValue: "",
    };
  },
  methods: {
    async getAttrKey() {
      this.attrSelectList = this.attrKeyList = await reqAttrKey(this.select3id);
    },
    addAttrItem() {
      // 属性选了吧不是空的
      if (!this.attrValue) return;
      // 根据id找到你选中的对应的那一项我要找到当前项目，然后保存一份
      const attrItem = this.attrKeyList.find((item) => {
        return item.id === this.attrValue;
      });
      this.attrName = attrItem.saleAttrName;
      // 过滤掉选中这个之外的，剩余的给你接着选
      this.attrKeyList = this.attrKeyList.filter((item) => {
        return Number(item.id) !== Number(this.attrValue);
      });

      const rowItem = {
        baseSaleAttrId: this.attrValue,
        saleAttrName: attrItem.saleAttrName,
        spuSaleAttrValueList: [],
        editState: false,
      };
      this.tabelValue.push(rowItem);
    },
    addTag(row) {
      // 添加按钮改变input状态
      row.editState = true;
      this.$nextTick(() => {
        this.$refs.inputRef.focus();
      });
    },
    inputBlur(row) {
      // 失去光标添加进去刚刚input收集的数据
      const tagItem = {
        baseSaleAttrId: Number(this.attrValue),
        saleAttrName: this.attrName,
        saleAttrValueName: this.tagValue,
      };
      this.tagValue = "";
      row.spuSaleAttrValueList.push(tagItem);
      row.editState = false;
    },
  },
  computed: {},
  mounted() {
    // 获取销售的下拉选项
    this.getAttrKey();
    this.PubSub.subscribe("submitParent", () => {
      // 把自己收集的数据发送给父
      this.PubSub.publish("parentEditData", this.tabelValue);
    });
  },
  props: ["select3id"],
};
</script>

<style lang="less" scoped></style>
