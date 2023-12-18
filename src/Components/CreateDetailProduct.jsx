import React, { useLayoutEffect, useState } from 'react';
import Select from 'react-select';
import { useSupplies } from "../Context/Supplies.context.jsx";
import { useForm, Controller } from 'react-hook-form';

const CreateDetailProduct = () => {
  const { supplies } = useSupplies();
  const [selectedMeasure, setSelectedMeasure] = useState('');
  const [selectedSupply, setSelectedSupply] = useState(null);
  const { control, register, handleSubmit, setError, formState: { errors }, reset, } = useForm();



  return 1;
};

export default CreateDetailProduct;
