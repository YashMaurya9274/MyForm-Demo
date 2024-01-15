import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Checkbox, RadioButton, TextInput} from 'react-native-paper';
import MyForm, {MyFormProps, ValidationSchema} from './MyForm';

const Form = () => {
  console.log('FORM RE-RENDERED');

  const validationSchema: ValidationSchema = {
    firstName: {
      required: true,
      min: 10,
      max: 20,
    },
    lastName: {
      max: 20,
    },
    age: {
      greaterThan: 20,
      lessThan: 100,
    },
  };

  return (
    <MyForm
      defaultValues={{
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
      onSubmit={(values: any) => console.log(values)}
      validationSchema={validationSchema}
      renderForm={({
        value,
        handleBlur,
        handleUpdate,
        handleSubmit,
        errors,
      }: MyFormProps) => (
        <View
          style={{
            marginTop: 30,
          }}>
          <View
            style={{
              marginBottom: 15,
            }}>
            <TextInput
              // value={formData.firstName}
              onChangeText={text => handleUpdate('firstName', text)}
              onBlur={() => handleBlur('firstName')}
              label="First name"
              placeholderTextColor="gray"
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
          </View>

          {value.firstName && (
            <View
              style={{
                marginBottom: 15,
              }}>
              <TextInput
                onChangeText={text => handleUpdate('lastName', text)}
                onBlur={() => handleBlur('lastName')}
                label="Last name"
                // onBlur={handleBlur('lastName')}
                placeholderTextColor="gray"
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
              status={value.checkObj?.checked ? 'checked' : 'unchecked'}
              onPress={() => {
                handleUpdate('checkObj', {
                  checked: value.checkObj?.checked ? false : true,
                  showAge: value.checkObj?.showAge ? false : true,
                });
              }}
            />
            <Text>{value.checkObj?.showAge ? 'Hide Age' : 'Show Age'}</Text>
          </View>

          {value.checkObj?.showAge && (
            <View
              style={{
                marginBottom: 15,
              }}>
              <TextInput
                onChangeText={text => handleUpdate('age', text)}
                onBlur={() => handleBlur('age')}
                label="Age"
                defaultValue={value.age}
                keyboardType="numeric"
                placeholderTextColor="gray"
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
                  value.radioObj?.radioText === 'first'
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  // setChecked('first');
                  handleUpdate('radioObj', {
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
                  value.radioObj?.radioText === 'second'
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  // setChecked('second');
                  handleUpdate('radioObj', {
                    radioText: 'second',
                    showDesc: false,
                  });
                }}
              />
              <Text>Hide Description Box</Text>
            </View>
          </View>

          {value.radioObj?.showDesc && (
            <View
              style={{
                marginBottom: 15,
              }}>
              <TextInput
                multiline
                label="Description"
                placeholderTextColor="gray"
                onChangeText={text => handleUpdate('description', text)}
                style={{
                  maxHeight: 100,
                }}
              />
            </View>
          )}

          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    />
  );
};

export default Form;

const styles = StyleSheet.create({
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontWeight: '500',
    marginBottom: 15,
  },
});
