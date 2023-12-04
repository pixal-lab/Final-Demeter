import axios from "./Axios.js";

export const getRolesRequest = () => axios.get(`/role`)
export const getRoleRequest = (ID_Role) => axios.get(`/role/${ID_Role}`)
export const createRoleRequest = (rol) => axios.post(`/add_role`, rol)
export const toggleRoleRequest = (ID_Role) => axios.put(`/role/toggle/${ID_Role}`)
export const updateRoleRequest = (ID_Role, rol) => axios.put(`/role/${ID_Role}`, rol)
export const deleteRoleRequest = (ID_Role) => axios.delete(`/role/${ID_Role}`)