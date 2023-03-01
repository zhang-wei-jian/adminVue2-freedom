import myAxios from "@/utils/myAxios";

const Apis = {
  getSpu: "/admin/product",
  // addSpu: "/admin/product/saveSpuInfo",
  editSpu: "/admin/product/updateSpuInfo",
  SpuAttrKey: "/admin/product/spuSaleAttrList",
  addSpu: "/admin/product/saveSpuInfo",
};

// export function reqGetSpu(page, limit, category3Id) {
//   //获取全部SPU
//   return myAxios({
//     method: "get",
//     url: `${Apis.getSpu}/${page}/${limit}`,
//     params: {
//       category3Id: category3Id,
//     },
//   });
// }
export function reqGetSpu(page, limit, category3Id) {
  //获取全部SPU
  return myAxios.get(`${Apis.getSpu}/${page}/${limit}`, {
    params: {
      category3Id: category3Id,
    },
  });
}
export function reqAttrKey(id) {
  //获取表单收集 的基础销售属性
  return myAxios.get(`${Apis.SpuAttrKey}/${id}`);
}

export function reqAddSpu(data) {
  console.log(data);
  // 请求添加post一条Spu;

  return myAxios({
    method: "post",
    url: Apis.addSpu,
    data: data,
  });
}

// export function reqDeleteTrademark(id) {
//   // 删除
//   return myAxios({
//     method: "POST",
//     url: Apis.delete + id,
//   });
// }
