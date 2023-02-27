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

export function pageTardemarkList(page,limit){
    // 获取分页
    return  myAxios({
        method:'get',
        url:`${Apis.pageTardemarkList}/${page}/${limit}`
    })

}
export function reqDeleteTrademark(id){
    // 删除
    return  myAxios({
        method:'DELETE',
        url:Apis.delete+id
    })
}