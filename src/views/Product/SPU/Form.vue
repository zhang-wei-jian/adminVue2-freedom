<template>
  <div>
    <el-card>
      <el-form label-width="70px">
        <el-form-item label="Spu名称">
          <el-input v-model="spuName"> </el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="tradeMarkValue">
            <el-option
              v-for="item of trademarkList"
              :key="item.id"
              :label="item.tmName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Spu描述">
          <el-input v-model="description" type="textarea" rows="3"> </el-input>
        </el-form-item>
        <el-form-item label="照片墙">
          <el-upload
            :action="upLoadUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="successHandle"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <AttrForm :select3id="select3id"></AttrForm>
        <!-- <el-form-item label="销售属性"> 

        </el-form-item> -->
      </el-form>
      <el-button @click="goSubmit">保存提交</el-button>
      <el-button @click="$emit('pageState', 'list')">取消</el-button>
    </el-card>
  </div>
</template>

<script>
import { reqTrademarkList } from "@/api/APItardemark";
import { reqAddSpu } from "@/api/APISPU";
import { mapState } from "vuex";

import AttrForm from "./AttrForm.vue";
import PubSub from "@/utils/PubSub";
export default {
  name: "",
  data() {
    return {
      spuName: "",
      description: "",
      trademarkList: [], //销售下拉列表
      tradeMarkValue: "",
      upLoadUrl: process.env.VUE_APP_BASE_API + "/admin/product/upload",
      imgValueList: [],
      tableValue: [],
    };
  },
  methods: {
    // async getAttrKey() {

    //   this.attrKeyList = await reqAttrKey(this.id);
    //   console.log(this.attrKeyList);
    // },
    async getTreadeMarkList() {
      this.trademarkList = await reqTrademarkList();
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {},
    successHandle(file, fileList) {
      const imgage = {
        imgName: fileList.name,
        imgUrl: file.data,
      };
      console.log(fileList);
      this.imgValueList.push(imgage);
    },
    async goSubmit() {
      // 提交触发子的回调函数
      this.PubSub.publish("submitParent");
      const data = {
        // 收集提交的表单
        category3Id: this.select3id,
        spuName: this.spuName,
        tmId: this.tradeMarkValue,
        description: this.description,
        spuImageList: this.imgValueList,
        spuSaleAttrList: this.tableValue,
      };
      // await reqAddSpu(data);
      try {
        await reqAddSpu(data);
        this.$message.success(this.spuName + "提交成功");
        this.$router.push("/manage/spu");
      } catch (error) {
        this.$message.error("提交错误" + error);
        console.log(error);
      }
    },
  },
  mounted() {
    // 获取品牌
    this.getTreadeMarkList();
    this.PubSub.subscribe("parentEditData", (parentData) => {
      // 订阅一条消息回调函数是修改我的数据
      // 子触发父,并且携带数据,给父的data一份，实现了父触发事件通知子传递给父数据
      this.tableValue = parentData;
    });
  },
  computed: {
    ...mapState({
      select3id: (state) => state.typeSelect.select3ID,
    }),
  },
  components: {
    AttrForm,
  },
};
</script>

<style lang="less" scoped></style>
