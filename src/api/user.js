import request from "@/utils/request";
// import request from "@/utils/myAxios";
// import request from "axios";
export function login(data) {
  return request({
    // url: "/vue-admin-template/user/login",
    url: "/admin/acl/index/login",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    // url: "/vue-admin-template/user/info",
    url: "/admin/acl/index/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    url: "/admin/acl/index/logout",
    method: "post",
  });
}
