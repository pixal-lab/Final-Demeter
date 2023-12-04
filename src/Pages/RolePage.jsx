import React, { useState, useEffect, useLayoutEffect } from 'react';
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import '../css/style.css'
import '../css/landing.css'

import { useRole } from '../Context/Role.context.jsx';
import CreateRole from '../Components/CreateRole.jsx';
import UpdateRole from '../Components/UpdateRole.jsx';
import DeleteRole from '../Components/DeleteRole.jsx';
import AssignPermissions from '../Components/AssignPermissions.jsx';

function RolePage() {
    const { role, getRoles, toggleRoleStatus, deleteRole } = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenPrmissions, setIsModalOpenPrmissions] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState(null);
    const [roleToDelete, setRoleToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // useLayoutEffect(() => {
    //     getRoles();
    // }, []);
    useEffect(() => {
        getRoles();
    }, []);

    const navigateToCreateRole = () => {
        setIsModalOpen(true);
    };

    const AssignPermissions = () => {
        setIsModalOpenPrmissions(true);
    };

    const handleCreated = () => {
        getRoles();
    };

    const handleEdit = (role) => {
        setRoleToEdit(role);
        setIsEditModalOpen(true);
    };

    const handleDelete = (role) => {
        setRoleToDelete(role);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (roleToDelete) {
            deleteRole(roleToDelete.ID_Role);
            setRoleToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };

    const cancelDelete = () => {
        setRoleToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRoles = role.filter((role) => {
        const { Name_Role, State } = role;
        const searchString = `${Name_Role} ${State}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    const statusRoles = role.State ? "" : "desactivado";

    return (
        <section className="pc-container">
            <div className="pcoded-content">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className=" w-100 col-sm-12">

                            <div className="card">
                                <div className="card-header">
                                    <h5>Visualización de roles</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button
                                                type='button'
                                                className='btn btn-primary'
                                                onClick={navigateToCreateRole}
                                                title='Registrar un nuevo rol para un empleado para el sistema.'
                                            >
                                                Registrar
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="search" className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Buscador"
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                    title='Se puede buscar el rol por el nombre'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body table-border-style">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">Nombre</th>
                                                        <th className="text-center">Permisos</th>
                                                        <th className="text-center">Estado</th>
                                                        <th className="text-center">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredRoles.map((rol) => (
                                                        <tr key={rol.ID_Role}>
                                                            <td title='Nombre del rol'>{rol.Name_Role}</td>
                                                            <td>
                                                                {rol.ID_Role !== 1 ? (
                                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                                        <button
                                                                            title='Para poder remover o asignar permisos a un rol ya creado con anterioridad.'
                                                                            type='button'
                                                                            className='btn btn-icon btn-outline-dark btn-sm'
                                                                            onClick={AssignPermissions}
                                                                        >
                                                                            <EnhancedEncryptionIcon />
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    "El rol tiene todos los permisos."
                                                                )}
                                                            </td>
                                                            <td title='El estado actual del rol seleccionado en el sistema.' className={`${statusRoles}`}>
                                                                {rol.State ? "Habilitado" : "Deshabilitado"}
                                                            </td>
                                                            <td>
                                                                {rol.ID_Role !== 1 ? (
                                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                                        <button
                                                                            onClick={() => handleEdit(rol)}
                                                                            className={`ml-1 btn btn-icon btn-primary ${!rol.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                                                            disabled={!rol.State}
                                                                            title='Para editar el nombre del rol seleccionado en el sistema.'
                                                                        >
                                                                            <BiEdit />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDelete(rol)}
                                                                            className={`ml-1 btn btn-icon btn-danger ${!rol.State ? "text-gray-400 cursor-not-allowed" : ""}`}
                                                                            disabled={!rol.State}
                                                                            title='Para eliminar el rol de forma permanente del sistema.'
                                                                        >
                                                                            <AiFillDelete />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            title='Para cambiar el estado del rol seleccionado en el sistema.'
                                                                            className={`btn btn-icon btn-success ${statusRoles}`}
                                                                            onClick={() => toggleRoleStatus(rol.ID_Role)}
                                                                        >
                                                                            {rol.State ? (
                                                                                <MdToggleOn className={`estado-icon active ${statusRoles}`} />
                                                                            ) : (
                                                                                <MdToggleOff className={`estado-icon inactive ${statusRoles}`} />
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    "No hay acciones"
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            {isModalOpen && (
                                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
                                                    <div className="modal-container">
                                                        <CreateRole onClose={() => setIsModalOpen(false)} onCreated={handleCreated} />
                                                    </div>
                                                </div>
                                            )}

                                            {isModalOpenPrmissions && (
                                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                                    <div className="modal-overlay" onClick={() => setIsModalOpenPrmissions(false)}></div>
                                                    <div className="modal-container">
                                                        <AssignPermissions onClose={() => setIsModalOpenPrmissions(false)} onAssign={handleCreated} />
                                                    </div>
                                                </div>
                                            )}

                                            {isEditModalOpen && (
                                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                                    <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}></div>
                                                    <div className="modal-container">
                                                        <UpdateRole onClose={() => setIsEditModalOpen(false)} roleToEdit={roleToEdit} />
                                                    </div>
                                                </div>
                                            )}
||
                                            {isDeleteModalOpen && (
                                                <DeleteRole
                                                    onClose={cancelDelete}
                                                    onDelete={confirmDelete}
                                                />
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RolePage
