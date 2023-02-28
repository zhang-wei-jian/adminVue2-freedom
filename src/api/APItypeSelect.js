import myAxios from "@/utils/myAxios";

const Apis = {
  getCategory1: "/admin/product/getCategory1",
  getCategory2: "/admin/product/getCategory2",
  getCategory3: "/admin/product/getCategory3",
  typeKeyList: "/admin/product/attrInfoList",
  submitKeyValue: "/admin/product/saveAttrInfo",
};

export function reqGetCategory1List() {
  //获取1下拉列表
  return myAxios({
    method: "get",
    url: Apis.getCategory1,
  });
}
export function reqGetCategory2List(id1) {
  //获取2下拉列表
  return myAxios({
    method: "get",
    url: `${Apis.getCategory2}/${id1}`,
  });
}
export function reqGetCategory3List(id2) {
  //获取3下拉列表
  return myAxios({
    method: "get",
    url: `${Apis.getCategory3}/${id2}`,
  });
}
export function reqTypeKeyList(category1Id, category2Id, category3Id) {
  //获取平台属性列表
  return myAxios({
    method: "get",
    url: `${Apis.typeKeyList}/${category1Id}/${category2Id}/${category3Id}`,
  });
}
export function reqSubmitKeyValue(data) {
  // 获取平台属性列表;
  return myAxios.post(Apis.submitKeyValue, data);
}
// export function reqSubmitKeyValue(data) {
//   console.log(data);

//   // 获取平台属性列表;
//   return myAxios({
//     method: "POST",
//     url: `${Apis.submitKeyValue}`,
//     data: data,
//   });
// }
