import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useCategorySupplies } from '../Context/CategorySupplies.context';
import { useForm } from 'react-hook-form';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function CreateCategory_supplies({
    onDefaultSubmit = null,
    buttonProps = {
        buttonClass: 'btn btn-primary',
        buttonText: 'Registrar',
    },
}) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
    } = useForm();

    const { Category_supplies, createCategory_supplies } = useCategorySupplies();
    const [open, setOpen] = useState(false);

    function formatName(inputName) {
        const trimmedName = inputName.trim();
        const formattedName = trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase();
        return formattedName;
    }

    const onSubmit = handleSubmit(async (values) => {
        const normalizedInputName = values.Name_SuppliesCategory
            .toLowerCase()
            .replace(/\s/g, '')
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const formattedName = formatName(normalizedInputName);

        // Normalizar los nombres existentes para la comparación
        const normalizedExistingNames = Category_supplies.map(category =>
            category.Name_SuppliesCategory.toLowerCase().replace(/\s/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        );

        // Verificar si el nombre ya existe
        const isNameDuplicate = normalizedExistingNames.includes(normalizedInputName);

        if (isNameDuplicate) {
            setError('Name_SuppliesCategory', {
                type: 'manual',
                message: 'El nombre de la categoría ya existe.',
            });
            return;
        }

        createCategory_supplies({ ...values, Name_SuppliesCategory: formattedName });
        setOpen(false);
        reset();
    });

    const onCancel = () => {
        setOpen(false);
        reset();
    };

    return (
        <React.Fragment>
            <button
                type="button"
                className={buttonProps.buttonClass}
                onClick={() => setOpen(true)}
            >
                {buttonProps.buttonText}
            </button>

            <Modal
                open={open}
                onClose={onCancel}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 600 }}>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Registro de categoria de insumos</h5>
                            </div>
                            <div className="card-body">
                                <form
                                    onSubmit={(event) =>
                                        typeof onDefaultSubmit === 'function'
                                            ? onDefaultSubmit(event, setOpen)
                                            : onSubmit(event)
                                    }
                                >
                                    <div className="city">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="Name_SuppliesCategory" className="form-label">
                                                Nombre: <strong>*</strong>
                                            </label>
                                            <input
                                                {...register('Name_SuppliesCategory', {
                                                    required: 'Este campo es obligatorio',
                                                    pattern: {
                                                        value: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/u,
                                                        message: 'Solo se permiten letras y un espacio.',
                                                    },
                                                })}
                                                type="text"
                                                className="form-control"
                                            />
                                            {errors.Name_SuppliesCategory && (
                                                <p className="text-red-500">
                                                    {errors.Name_SuppliesCategory.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="buttonconfirm">
                                        <div className="mb-3">
                                            <button
                                                className="btn btn-primary mr-5"
                                                type="submit"
                                                title="Este botón sirve para guardar la información y cerrar la ventana modal."
                                            >
                                                Confirmar
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={onCancel}
                                                type="submit"
                                                title="Este botón sirve para cerrar la ventana modal sin guardar la información."
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default CreateCategory_supplies;
