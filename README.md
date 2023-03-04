# vue-admin-template

English | [简体中文](./README-zh.md)

### 项目的流程

#### 1.先配置路由啊

```js
 {
    path: "/",
    // component: Layout,
    redirect: "/manage",
  },
  {
    path: "/manage",
    name: "manage",
    redirect: "/manage/trademark",
    meta: {
      title: "权限管理",
      icon: "el-icon-s-help",
    },
    component: Layout,
    children: [
      {
        path: "/manage/trademark",
        name: "trademark",
        meta: {
          title: "品牌管理",
        },
        component: () => import("@/views/tradeMark/index.vue"),
        // component: () => import("@/views/table/index"),
      },
      {
        path: "/manage/trademarsk",
        name: "trad2emark",
        meta: {
          title: "平台属性管理",
        },
        component: () => import("@/views/tradeMark/index.vue"),
        // component: () => import("@/views/table/index"),
      },
      {
        path: "/manage/tradeamasrk",
        name: "trad5emark",
        meta: {
          title: "SPU管理",
        },
        component: () => import("@/views/tradeMark/index.vue"),
        // component: () => import("@/views/table/index"),
      },
      {
        path: "/manage/trademadasrk",
        name: "tradedsmark",
        meta: {
          title: "SKU管理",
        },
        component: () => import("@/views/tradeMark/index.vue"),
        // component: () => import("@/views/table/index"),
      },
    ],
  },
```

#### 2.webpack配置代理服务器

首先配置了webpack的代理：对匹配的路径做转发，并且路径重写

```js
 proxy:{
      '/app-dev':{
        target:'http://39.98.123.211:8510',
        pathRewrite:{"^/app-dev" : ""}, 
        secure: false, 
      }
    }
```

#### 3.封装axios，添加路径前缀，并且直接拿data数据

```js
import axios from 'axios';

const myAxios = axios.create({
  // baseURL: import.meta.env && '/app-dev',
  baseURL: '/app-dev',

});

myAxios.interceptors.request.use((config) => {
  // 请求
  return config;
});

myAxios.interceptors.response.use((response) => {
  // 第一个data是拦截器返回的数据
  // return response.data.data;
  return getData(response);
});


function getData(Data){
         // 递归拿data
  if(typeof Data.data==='object'){
    return  getData(Data.data)
  }else{
    return Data
  }
 
  }
  export default myAxios;
```



#### 3.可以愉快的写页面了

1.新建api文件夹，存放要发送的api

```js
import myAxios from "@/utils/myAxios";

const Apis= {
    tardemarkList : '/admin/product/baseTrademark/getTrademarkList',
    pageTardemarkList : '/admin/product/baseTrademark',
    delete: '/admin/product/baseTrademark/remove/',
}

export function reqTrademarkList(){
    //获取全部
    return  myAxios({
        method:'get',
        url:Apis.tardemarkList
    })

}
```

2.在组件中定义好数据

```js
  data() {
    return {
      pageNo:1,
      pageSize:5,
      total:0,
      tardemarkList:[]
    }
  },
```

3.写个请求分页数据列表的函数，然后挂载阶段请求

```js
   methods: {
    async getPageTrademarkList  (){
      //  请求匹配分页列表
     const res =await pageTardemarkList(this.pageNo,this.pageSize)
    this.total=res.total;
    this.pageNo = res.current;
    this.pageSize = res.pages;
    this.tardemarkList= res.records
  	  },
    },
mounted() {
    // 请求分页品牌列表
    this.getPageTrademarkList()
  },
```

### 写vuex集中状态管理

因为有两个页面需要共享用到数据

```js

```



页面上两个地方都用到同一个数据，切换页面还是存在的，要放store

新建了一个store的model模块，并且开启了命名空间,考虑到要在多个组件页面公用一份数据，就把这些数据集中管理起来

```js
import {
  reqGetCategory1List,
  reqGetCategory2List,
  reqGetCategory3List,
} from "@/api/APItypeSelect";

const state = {
  select1ID: "",
  select2ID: "",
  select3ID: "",
  selectSelectList1: [],
  selectSelectList2: [],
  selectSelectList3: [],
};
const mutations = {
  // 获取1List
  GET_SELECT_LIST1(state, data) {
    state.selectSelectList1 = data;
  },
  GET_SELECT_LIST2(state, { data, id1 }) {
    // 获取2List
    state.selectSelectList2 = data;
    state.select1ID = id1;
  },
  GET_SELECT_LIST3(state, { data, id2 }) {
    // 获取3List
    state.selectSelectList3 = data;
    state.select2ID = id2;
  },
  EDIT_ID3(state, id3) {
    // 修改3的ID
    state.select3ID = id3;
  },
};
const actions = {
  async getSelect1({ commit }) {
    // 一上来获取分类列表1
    const res = await reqGetCategory1List();
    commit("GET_SELECT_LIST1", res);
  },
  async getSelect2({ commit }, id1) {
    // 获取分类列表2
    const data = await reqGetCategory2List(id1);
    commit("GET_SELECT_LIST2", { data, id1 });
  },
  async getSelect3({ commit }, id2) {
    // 获取分类列表1
    const data = await reqGetCategory3List(id2);
    commit("GET_SELECT_LIST3", { data, id2 });
  },
  async edit3Id({ commit }, id3) {
    // 修改3的ID
    commit("EDIT_ID3", id3);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

```

有个细节就是，选1选项的时候2和3都要清空，选2的时候3清空



然后来到平台属性管理页面，首先映射vueX中的数据，然后我来监视select3Id的变化来请求这个页面的列表，这也就表示用户去选项了3列表，这时候3的id变化也被监视到，然后请求列表数据，

**下面开始做添加**，考虑到数据还挺多，vue2的选项式写法会非常繁琐，拆分出来一个组件，然后

首先添加是个不同的界面，可以考虑v-if和v-show，考虑到表单收集界面并不是频繁切换的可以使用v-if，这样加载这个页面会快一点(然后我又换成v-show了,因为这样有bug，可能是因为else的数组数据vue没有劫持)，v-show的话会把不需要的节点也创建出来。所以定义个状态state来决定页面的显示，然后在另外一个组件想要把页面切换回来使用了自定义事件来触发回调并且带着要修改的状态

细节，输入框没有值的时候禁用添加框

```js
 <el-button type="primary" :disabled="keyName.trim() === ''">
          确定添加属性
        </el-button>
```

添加流程，1.给table绑定一个空数组，每次添加的时候就去push一行新添加的属性值，2.这时候为了让用户不在修改input而且是可读的没有用disable而是用了 :readonly="keyValue.length >=1"，禁用并且可读取输入框的内容3.为了用户体验，添加的新行会有个输入框，会直接获取焦点，由于模板加载是异步的，这时候因为我们push的那一项数据导致页面模板响应式的异步更新,我们的同步触发焦点可能在节点创建之前执行所以 this.$nextTick() 4.输入框输入完成后失去焦点把当前状态修改false，让输入框换掉，这里给每一行数据都添加了一个状态，只有点击和失去焦点改变状态让输入框和文本来回切换

```js
 <el-table-column label="属性值名称">
        <template v-slot="{ row }">
          <!-- <div>{{ row.attrName }}</div> -->
          <el-input
            v-show="row.editState" v-model="row.attrName" ref="inputRef" @blur="row.editState=false"></el-input>
          <el-tag v-show="!row.editState"  @click="goEditStateFocus(row)">{{ row.attrName }}</el-tag>
        </template>
      </el-table-column>
```

接下来删除属性，点击删除触发事件，用fliter过滤数组中的当前行不一样的，

接下来修复bug，如果输入框是空的是不能添加进去的，判断如果是空也是用fliter过滤数组中的当前行不一样的

提交数据，最后收集表单进行post发送请求就行了

#### SPU

接下来做SPU，这个页面已经第二次使用分页器了，分页器就那么几个total，pageNo，pagesize，本身是可以复用的，会想到混入mixin但是vue2的混入只能做到**抽离逻辑和复用**，并不能改变其中的状态，非常遗憾

首先引入三级分类组件，然后仓库拿分类id3的值，带着当前页和pagesize发送请求拿Spu列表

#### **SPU列表**

然后随着用户选着分类3，要更新页面，watch监视这个3id就行了，有变动发请求获取数据

#### **SPU表单收集**

![image-20230228163140341](C:\Users\10482\AppData\Roaming\Typora\typora-user-images\image-20230228163140341.png)

进来要发送两个请求获取两个下拉列表提供给选，然后上传图片发送请求拿每次图片成功后后端返回的图片路径，给自己定好的图片数组push就行了

![image-20230228163031882](C:\Users\10482\AppData\Roaming\Typora\typora-user-images\image-20230228163031882.png)

**现在项目已经很臃肿了**，这主要是页面逻辑多，我们当前表单拆出一个组件出来，销售属性单独的一个组件，他依赖到的数据通过props传递进去另一个组件

接下来其中是比较繁琐的table的![image-20230228163012488](C:\Users\10482\AppData\Roaming\Typora\typora-user-images\image-20230228163012488.png)

做销售选项，我要实现用户选过的属性然后点击添加后他不在出现在下拉框中，要对这个下拉列表数组进行处理。用户选过的销售属性id会通过v-model绑定一份，我利用这个id来处理:添加按钮点击触发一个事件

```js
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
```

然后是![image-20230228163720641](C:\Users\10482\AppData\Roaming\Typora\typora-user-images\image-20230228163720641.png)

![image-20230228163803076](C:\Users\10482\AppData\Roaming\Typora\typora-user-images\image-20230228163803076.png)

所以我给每一行都定义一个编辑的状态，根据状态来显示是按钮button还是输入框input，1.按钮点击的时候改变当前状态,显示出来input框，拿到input的ref对象，需要nextTick的回调函数来获取元素，在光标，触发光标人性化操作，3.随后在失去光标的时候,对当前行的数组进行push，name就是input框表单收集到的值

```js
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
        saleAttrName: this.saleAttrName,
        saleAttrValueName: this.tagValue,
      };
      row.spuSaleAttrValueList.push(tagItem);

      row.editState = false;
    },
```

现在我们表单数据收集完成了 ，可以去发送请求，这里我想在父组件点击按钮的时候发送请求，但是我需要拿到子组件的数据，让他传给父，自定义和传个函数让子去触发都是不行的，因为子并不知道在什么时机去触发。**全局事件总线就可以做到**，但是为了练习，这里就自己封装了简易版的PubSub对象，加在了vue的原型上

```js
const PubSub = {
  subscribeCallback: {},
  subscribe(name, callback) {
    if (!Array.isArray(this.subscribeCallback[name])) {
      this.subscribeCallback[name] = [];
    }
    this.subscribeCallback[name].push(callback);
  },
  publish(name, value) {
    this.subscribeCallback[name].forEach((item) => {
      item(value);
    });
  },
};
export default PubSub;
```

把PubSub加在原型上

```js
new Vue({
  el: "#app",
  beforeCreate() {
    Vue.prototype.PubSub = PubSub;
  },
  router,
  store,
  render: (h) => h(App),
});
```



1.首先给子挂载的时候就订阅一条触发的回调，随后在父点击提交按钮的时候调用,为了就是父要发送了子做些什么

```js
    this.PubSub.subscribe("submitParent", () => {
      // 把自己收集的数据发送给父
      this.PubSub.publish("parentEditData", this.tabelValue);
    });
```

子应该做的是把数据给到父，所以父订阅个回调函数就是触发的时候用传递过来的数据改掉自己的

```js
  this.PubSub.subscribe("parentEditData", (parentData) => {
      // 订阅一条消息回调函数是修改我的数据
      // 子触发父,并且携带数据,给父的data一份，实现了父触发事件通知子传递给父数据
      this.tableValue = parentData;
    });
```

发过来数据接收的回调;

接下来表单数据全部收集完成提交就行了



随后做权限管理，我们获取登录用户信息的储存用户信息的地方是在vuex中的一个user模块，所以我们去把用户信息，包括后端返回的用户权限数组拿出来，后端返回的是一个权限字符串数组，里面的字符串就是我们路由对应的name，

我们过滤，拿所有写好的页面去过滤用户权限的字符串，提取出来用户可以使用的父权限，还有里面的子权限分别都是啥，然后把静态页面数组和过滤出来用户权限的数组合并一下，保存到store的仓库中，因为仓库就是靠这个仓库的值来映射然后渲染出来的侧边栏，然后我们再把这些全部路由addRoutes方法注册，就完成了

### SKU



接下来做个sku，我发现很多的组件都用到了这个table表格和分页器，所以我萌生了一个想法就是封装，即使是vue2，

我的规划是这样的，这个组件只需要接收我们发送请求拿到的数组数据，传给组件就行了，还有就是每一个表格的列都是不一样的，怎么复用

```js
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
        // prop: 'skuDefaultImg',
        src: 'skuDefaultImg',
        width:200
      },
    ])
 
封装的组件用到的结构
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
```

**label**:原来咋写就咋写.

**prop**好说，但是怎么决定每一个呢，比如用到作用域插槽的。这里我统一使用了作用域插槽来写，通过在作用域插槽的v-if来判断我是要设置按钮还是图片，是文字直接prop，

```js
 {
        label: '序号',
        prop: 'spuId'
      },
```



**图片**：图片用到的地方，直接在列对象中写src，v-if看到你写的不是prop而是src，直接把图片搞上去，是不是很方便，大小也可以调整

```js
{
        label: '默认图片',
        src: 'skuDefaultImg',
        width: 200
      },
```



另一件事：**分页器**

接下来我们分页器搞里头，分页器很重要的几个属性是，**总页数，当前页，页大小**

我们初始化几个然后props传给组件里面给他看就行，跟着我的思路go

```js
    <TablePageComposition :tableColumn="tableColumn" :data="skuList" :total="totals" :pageNo="pageNo" :pageSize="pageSize">
    </TablePageComposition>
```

**Props**然后为了防止报错，我们要给组件内部的props接收写成对象形式来定义默认值，如果是**引用类型**的需要写工程模式的，也就是函数返回一个：引用数据[]

```js
 foo: {
      from: 'bar',
      default: () => []
    }
  }
```



我要封装的是，你只需要传入要渲染的数组，

和写个自定义事件的回调 :注意看只是**自定义事件**

```js
 <TablePageComposition :tableColumn="tableColumn" :data="skuList" :total="totals" :pageNo="pageNo" :pageSize="pageSize"
      @updata="getSkuList">
    </TablePageComposition>
///////////////////////////////////////////////////////////////////
  const getSkuList = async (pageNo = pageNo.value, pageSize = pageSize.value) => {
      // 获取列表的函数

    const getSkuList = async (page = pageNo.value, limit = pageSize.value) => {

      // 获取列表的函数
      const { records, current, pages, size, total } = await reqSkuList(page, limit)
      skuList.value = records
      pageNo.value = current
      pageSize.value = size
      totals.value = total

    }
```



然后组件中的分页器会有三个事件，这些事件触发的时候$emit('updata',当前页，页大小)

```js
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
```

封装进就完成了

#### 这个组件的使用方法是

```vue
 <TablePageComposition 
                       :tableColumn="配置列的数组对象"
                       :data="要渲染表格的数组"
                       :total="总条数"
                       :pageNo="当前页"
                       :pageSize="页大小"
      					@updata="请求列表函数(当前页，页大小)">
    </TablePageComposition>
```

定义列

```js
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
```

自定义事件回调函数是尤为重要的，只要我们写好这个函数，封装的组件就可以帮我自动完成，实现翻页和重新加载页面，组件会自动帮我们触发这个函数

```js
const getSkuList = async (page = pageNo.value, limit = pageSize.value) => {

      // 获取列表的函数
      const { records, current, pages, size, total } = await reqSkuList(page, limit)
      skuList.value = records
      pageNo.value = current
      pageSize.value = size
      totals.value = total

    }
```

