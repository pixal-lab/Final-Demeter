import React from 'react'

function CreateProduct() {
    return (
        <form className='text-center col-md-10'>

            <div className="form-group p-3">
                <label htmlFor="text" className="form-label">
                    Nombre del producto: <strong>*</strong>
                </label>
                <input
                    {...register("Name_Products", {
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
                    type="Name_Products"
                    placeholder='Contraseña'
                    className="form-control"
                />
                {errors.Name_Products && (
                    <p className="text-red-500">
                        {errors.Name_Products.message}
                    </p>
                )}
            </div>

            <div className="buttonconfirm">
                <div className="buttonconfirm">
                    <button
                        className="btn btn-primary mr-3"
                        type="submit"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </form>
    )
}

export default CreateProduct;
