import React from 'react'
import EditUser from '../Components/EditProfile';
import ChangePassword from '../Components/ChangePassword';

function EditProfile() {

    return (
        <section className="pc-container">
            <div className="pcoded-content">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className=" w-100 col-sm-12">

                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className='text-center'>Editar perfil</h5>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className='text-center'>Cambiar contraseña</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <EditUser />
                                        </div>
                                        <div className="col-md-6">
                                            <ChangePassword />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
export default EditProfile;
