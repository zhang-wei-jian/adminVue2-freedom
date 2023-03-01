import myAxios from '@/utils/myAxios'
const APIs = {
  get: '/admin/acl/permission'
}


export const reqPermission = () => {
  return myAxios.get(APIs.get)
}
