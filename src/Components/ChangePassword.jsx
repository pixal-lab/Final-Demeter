import React from 'react'
import { useForm } from 'react-hook-form';
import { useUser } from '../Context/User.context.jsx'

const ChangePassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const { changePassword, userId } = useUser;

    const onSubmit = async (data) => {
        try {
            await changePassword(userId, data);
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
                <label htmlFor="Password" className="form-label">
                    Contraseña actual: <strong>*</strong>
                </label>
                <input
                    {...register("Password", {
                        required: 'La contraseña es obligatorio',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?=.*\w).*$/,
                            message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.'
                        },
                        minLength: {
                            value: 5,
                            message: 'La contraseña debe tener al menos 5 caracteres'
                        },
                        maxLength: {
                            value: 35,
                            message: 'La contraseña no puede tener más de 35 caracteres'
                        }
                    })}
                    type="password"
                    placeholder='Contraseña'
                    className="form-control"
                    title='Ingresar la antigua contraseña.'
                />
                {errors.Password && (
                    <p className="text-red-500">
                        {errors.Password.message}
                    </p>
                )}
            </div>
            <div className="form-group px-3">
                <label htmlFor="NewPassword" className="form-label">
                    Contraseña nueva: <strong>*</strong>
                </label>
                <input
                    {...register("NewPassword", {
                        required: 'La contraseña es obligatorio',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?=.*\w).*$/,
                            message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.'
                        },
                        minLength: {
                            value: 5,
                            message: 'La contraseña debe tener al menos 5 caracteres'
                        },
                        maxLength: {
                            value: 35,
                            message: 'La contraseña no puede tener más de 35 caracteres'
                        }
                    })}
                    type="password"
                    placeholder='Contraseña'
                    className="form-control"
                    title='Ingresar la nueva contraseña.'
                />
                {errors.NewPassword && (
                    <p className="text-red-500">
                        {errors.NewPassword.message}
                    </p>
                )}
            </div>

            <div className="buttonconfirm">
                <div className="buttonconfirm">
                    <button
                        className="btn btn-primary mr-3"
                        type="submit"
                        title='Guardar los cambios realizados en la contraseña.'
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </form>
    )
}
export default ChangePassword