import {
  reqGetCategory1List,
  reqGetCategory2List,
  reqGetCategory3List,
} from "@/api/APItypeSelect";

const state = {
  select1ID: "",
  select2ID: "",
  select3ID: "1",
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
    // 获取分类列表3
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
