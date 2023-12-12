import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../Context/User.context';

const EditUser = () => {

    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const { getCurrentUser, updateUser } = useUser();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const currentUserData = await getCurrentUser();
                Object.keys(currentUserData).forEach((key) => {
                    setValue(key, currentUserData[key]);
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchCurrentUser();
    }, [getCurrentUser, setValue]);

    const onSubmit = async (data) => {
        try {
            const userId = data.id;
            await updateUser(userId, data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            className='text-center col-md-10'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="form-group p-3">
                <label htmlFor="Name_User" className="form-label">
                    Nombres: <strong>*</strong>
                </label>
                <input
                    {...register("Name_User", {
                        required: "El nombre es obligatorio",
                        pattern: {
                            value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                            message:
                                "El nombre debe tener la primera letra en mayúscula y solo letras."
                        }
                    })}
                    type="text"
                    placeholder='Nombre'
                    className="form-control"
                    title='Cambiar el nombre del usuario logueado si esta incorrectamente guardado.'
                />
                {errors.Name_User && (
                    <p className="text-red-500">
                        {errors.Name_User.message}
                    </p>
                )}
            </div>

            <div className="form-group px-3">
                <label htmlFor="LastName_User" className="form-label">
                    Apellidos: <strong>*</strong>
                </label>
                <input
                    {...register("LastName_User", {
                        required: 'El apellido es obligatorio',
                        pattern: {
                            value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                            message:
                                "El apellido debe tener la primera letra en mayúscula y solo letras."
                        }
                    })}
                    type="text"
                    placeholder='Apellido'
                    className="form-control"
                    title='Cambiar el apellido del usuario logueado si esta incorrectamente guardado.'
                />
                {errors.LastName_User && (
                    <p className="text-red-500">
                        {errors.LastName_User.message}
                    </p>
                )}
            </div>

            <div className="form-group p-3">
                <label htmlFor="Email" className="form-label">
                    Correo electrónico: <strong>*</strong>
                </label>
                <input
                    {...register("Email", {
                        required: 'El correo es obligatorio',
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                            message: 'El correo electrónico no es válido'
                        }
                    })}
                    type="email"
                    placeholder='Correo electrónico'
                    className="form-control"
                    title='Cambiar el correo electrónico del usuario logueado si esta incorrectamente guardado.'
                />
                {errors.Email && (
                    <p className="text-red-500">
                        {errors.Email.message}
                    </p>
                )}
            </div>

            <div className="buttonconfirm">
                <button
                    className="btn btn-primary mr-3"
                    type="submit"
                    title='Guardar los cambios realizados en el nombre, apellido ó correo electronico.'
                >
                    Guardar
                </button>
            </div>
        </form>
    )
}
export default EditUser