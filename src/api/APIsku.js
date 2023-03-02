import myAxios from '@/utils/myAxios'
const APIs = {
  pageSku: '/admin/product/list',
  postSku: '/admin/product/saveSkuInfo'
}


export const reqSkuList = (page, limit) => {
  return myAxios.get(`${APIs.pageSku}/${page}/${limit}`)
}
