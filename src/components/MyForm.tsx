import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectFormData,
  setFormData,
  updateFormData,
} from '../slices/formDataSlice';

type ValidationRule = {
  required?: boolean;
  min?: number;
  max?: number;
  lessThan?: number;
  greaterThan?: number;
};

export type ValidationSchema = Record<string, ValidationRule>;

export type MyFormProps = {
  value: any;
  handleBlur: (field: string) => void;
  handleSubmit: () => void;
  handleUpdate: (field: string, value: any) => void;
  errors: any;
};

type Props = {
  defaultValues: any;
  renderForm: (myFormProps: any) => React.ReactNode;
  validationSchema?: ValidationSchema;
  onSubmit: (values: any) => void;
};

const MyForm = ({
  defaultValues,
  renderForm,
  validationSchema,
  onSubmit,
}: Props) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const [errors, setErrors] = useState<any>({});
  // const errors: any = {};

  const min = (val: string, minLength: number) => {
    return val.length < minLength;
  };

  const max = (val: string, maxLength: number) => {
    return val.length > maxLength;
  };

  const required = (val: string) => {
    return val.length === 0;
  };

  const lessThan = (val: string, num: number) => {
    return parseInt(val) > num;
  };

  const greaterThan = (val: string, num: number) => {
    return parseInt(val) < num;
  };

  const handleUpdate = (field: string, value: any) => {
    dispatch(
      updateFormData({
        field,
        value,
      }),
    );
  };

  const checkValidation = (field: string) => {
    let error = '';
    if (validationSchema && validationSchema[field]) {
      const validationObj = validationSchema[field];
      for (let validationKey in validationObj) {
        if (validationKey === 'required' && required(formData[field])) {
          error = 'This is required';
          break;
        } else if (
          validationKey === 'min' &&
          min(formData[field], validationObj[validationKey]!)
        ) {
          error = 'Too Short!';
          break;
        } else if (
          validationKey === 'max' &&
          max(formData[field], validationObj[validationKey]!)
        ) {
          error = 'Too Big!';
          break;
        } else if (
          validationKey === 'lessThan' &&
          lessThan(formData[field], validationObj[validationKey]!)
        ) {
          error = `Value should be less than ${validationObj[validationKey]}`;
          break;
        } else if (
          validationKey === 'greaterThan' &&
          greaterThan(formData[field], validationObj[validationKey]!)
        ) {
          error = `Value should be greater than ${validationObj[validationKey]}`;
          break;
        }
      }
    }

    if (error) {
      setErrors({...errors, [field]: error});
      return false;
    }
    return true;
  };

  const myFormProps: MyFormProps = {
    value: formData,
    handleBlur: (field: string) => {
      checkValidation(field);
    },
    handleUpdate,
    handleSubmit: () => {
      let flag = 1;
      for (let formFieldKey in formData) {
        if (!checkValidation(formFieldKey)) {
          flag = 0;
          break;
        } else flag = 1;
      }

      if (flag === 1) onSubmit(myFormProps.value);
    },
    errors,
  };

  const check = () => {
    myFormProps.value = formData;
    for (let key in formData) {
      if (formData[key] && errors.hasOwnProperty(key)) {
        const tempErrs = {...errors};
        delete tempErrs[key];
        setErrors(tempErrs);
      }
    }
  };

  useEffect(() => {
    check();
  }, [formData]);

  useEffect(() => {
    dispatch(setFormData(defaultValues));
  }, []);

  return <>{renderForm(myFormProps)}</>;
};

export default MyForm;
