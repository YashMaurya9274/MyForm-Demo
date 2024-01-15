import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    // .min(2, 'Too Short!')
    // .max(50, 'Too Long!')
    .required('Field Required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  age: Yup.number().lessThan(100, 'Age cannot be greater than 100'),
  description: Yup.string().max(100, 'Too Long Description'),
});
