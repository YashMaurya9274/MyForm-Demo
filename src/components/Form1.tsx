import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Formik} from 'formik';
import {FormSchema} from '../schemas/FormSchema';
import {Checkbox, HelperText, RadioButton, TextInput} from 'react-native-paper';

const Form1 = () => {
  console.log('FORM RE-RENDERED');

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        age: '',
        radioObj: {
          radioText: 'second',
          showDesc: false,
        },
        checkObj: {
          checked: false,
          showAge: false,
        },
        description: '',
      }}
      validationSchema={FormSchema}
      onSubmit={values => console.log(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
      }) => (
        <View
          style={{
            marginTop: 30,
          }}>
          <View
            style={{
              marginBottom: 15,
            }}>
            <TextInput
              onChangeText={handleChange('firstName')}
              label="First name"
              onBlur={handleBlur('firstName')}
              placeholderTextColor="gray"
              value={values.firstName}
              style={styles.input}
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
            {/* <HelperText type="error" visible={errors.firstName ? true : false}>
              {errors.firstName}
            </HelperText> */}
          </View>

          {values.firstName && (
            <View
              style={{
                marginBottom: 15,
              }}>
              <TextInput
                onChangeText={handleChange('lastName')}
                label="Last name"
                onBlur={handleBlur('lastName')}
                placeholderTextColor="gray"
                value={values.lastName}
                style={styles.input}
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
            </View>
          )}

          <View
            style={[
              styles.radioContainer,
              {
                marginBottom: 15,
              },
            ]}>
            <Checkbox
              status={values.checkObj?.checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setFieldValue('checkObj', {
                  checked: !values.checkObj.checked,
                  showAge: !values.checkObj.showAge,
                });
              }}
            />
            <Text>{values.checkObj.showAge ? 'Hide Age' : 'Show Age'}</Text>
          </View>

          {values.checkObj.showAge && (
            <View
              style={{
                marginBottom: 15,
              }}>
              <TextInput
                onChangeText={handleChange('age')}
                label="Age"
                keyboardType="numeric"
                onBlur={handleBlur('age')}
                placeholderTextColor="gray"
                value={values.age}
                style={styles.input}
              />
              {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
            </View>
          )}

          <View
            style={{
              marginBottom: 15,
              marginRight: 'auto',
            }}>
            <View style={styles.radioContainer}>
              <RadioButton
                color="green"
                uncheckedColor="green"
                value="first"
                status={
                  values.radioObj.radioText === 'first'
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  // setChecked('first');
                  setFieldValue('radioObj', {
                    radioText: 'first',
                    showDesc: true,
                  });
                }}
              />
              <Text>Show Description Box</Text>
            </View>

            <View style={styles.radioContainer}>
              <RadioButton
                color="red"
                uncheckedColor="red"
                value="second"
                status={
                  values.radioObj.radioText === 'second'
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  // setChecked('second');
                  setFieldValue('radioObj', {
                    radioText: 'second',
                    showDesc: false,
                  });
                }}
              />
              <Text>Hide Description Box</Text>
            </View>
          </View>

          {values.radioObj?.showDesc && (
            <View
              style={{
                marginBottom: 15,
              }}>
              <TextInput
                multiline
                label="Description"
                onBlur={handleBlur('description')}
                placeholderTextColor="gray"
                onChangeText={handleChange('description')}
                value={values.description}
                style={[
                  styles.input,
                  {
                    maxHeight: 100,
                  },
                ]}
              />
              {errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>
          )}
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default Form1;

const styles = StyleSheet.create({
  input: {
    color: 'purple',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontWeight: '500',
    marginBottom: 15,
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
