import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import { useForm } from 'react-hook-form';
import { useRole } from '../Context/Role.context.jsx';

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

export default function UpdateRole({ onClose, roleToEdit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: roleToEdit });
  const { updateRole, role } = useRole();

  useEffect(() => {
    register('Name_Role', {
      required: 'El campo es obligatorio',
      validate: (value) => {
        const duplicateName_Role = role.find(
          (rol) =>
            rol.Name_Role === value &&
            rol.ID_Role !== roleToEdit.ID_Role
        );

        if (duplicateName_Role) {
          return 'Este correo ya existe.';
        }
        return true;
      },
    });
  }, [register, role, roleToEdit.ID_Role]);

  const onSubmit = handleSubmit(async (values) => {
    updateRole(roleToEdit.ID_Role, values);
    onClose();
  });

  const onCancel = () => {
    onClose();
  };

  return (
    <Box sx={{ ...style, width: 600 }}>
      <div>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5>Editar un empleado</h5>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>

                <div className="control">
                  <div className="form-group col-md-6">
                    <label htmlFor="Name_Role" className="form-label">
                      Nombres: <strong>*</strong>
                    </label>
                    <input
                      {...register("Name_Role", {
                        required: "El nombre es obligatorio",
                        pattern: {
                          value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                          message:
                            "El nombre del mesero debe tener la primera letra en mayúscula y solo letras."
                        }
                      })}
                      type="text"
                      placeholder='Nombre'
                      className="form-control"
                      title='Se cambia el nombre del rol que se desea editar.'
                    />
                    {errors.Name_Role && (
                      <p className="text-red-500">
                        {errors.Name_Role.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="buttonconfirm">
                  <div className="mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={onCancel}
                      type="button"
                      title='Se cancela el cambio del rol a editar en el sistema'
                    >
                      Cancelar
                    </button>

                    <button
                      className="btn btn-primary mr-5"
                      type="submit"
                      title='Se guarda el cambio realizado en el rol del sistema.'
                    >
                      Guardar
                    </button>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}
