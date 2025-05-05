import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const passwordschema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "Minimum 4 characters are required")
    .max(16, "Maximum 16 characters are allowed")
    .required("Length is required"),
})

const App = () => {

  const [password, Setpassword] = useState('')
  const [ispasswordGenerated, SetIspasswordGenerated] = useState(false)

  const [lowercase, setLowercase] = useState(true)
  const [uppercase, setUppercase] = useState(false)
  const [Number, setNumber] = useState(false)
  const [Symbol, setSymbol] = useState(false)

  const generatePasswordstring = (passwordLength: number) => {
    let characterlist = '';

    const uppercasechar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercasechar = 'abcdefghijklmnopqrstuvwxyz';
    const digitchar = '0123456789';
    const specialchar = '!@#$%^&*()_+';

    if (uppercase) characterlist += uppercasechar
    if (lowercase) characterlist += lowercasechar
    if (Number) characterlist += digitchar
    if (Symbol) characterlist += specialchar

    const passwordResult = createPassword(characterlist, passwordLength)

    Setpassword(passwordResult)
    SetIspasswordGenerated(true)
  }

  const createPassword = (character: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * character.length)
      result += character.charAt(characterIndex)
    }
    return result
  }

  const resetPassword = () => {
    Setpassword('')
    SetIspasswordGenerated(false)
    setUppercase(false)
    setLowercase(true)
    setNumber(false)
    setSymbol(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordschema}
            onSubmit={values => {
              generatePasswordstring(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputcolumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                    <TextInput
                      style={styles.inputstyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder='Example: 8'
                      keyboardType='numeric'
                    />
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lowercase</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={lowercase}
                    onPress={() => setLowercase(!lowercase)}
                    fillColor="#29AB87"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={uppercase}
                    onPress={() => setUppercase(!uppercase)}
                    fillColor="#FF6B6B"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={Symbol}
                    onPress={() => setSymbol(!Symbol)}
                    fillColor="#00CFFD"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={Number}
                    onPress={() => setNumber(!Number)}
                    fillColor="#FFD93D"
                  />
                </View>

                <View style={styles.formAction}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primarybtn}
                    onPress={() => {
                      handleSubmit();
                    }}
                    

                  >
                    <Text style={styles.primarybtntxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondarybtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}
                  >
                    <Text style={styles.secondarybtntxt}>Reset</Text>
                  </TouchableOpacity>
                </View>

              </>
            )}
          </Formik>
        </View>

        {ispasswordGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result</Text>
            <Text style={styles.description}>Long Press to Copy</Text>
            <Text selectable style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputWrapper: {
    
    marginBottom: 15,
  },
  inputcolumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  inputstyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
  },
  formAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  primarybtn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  primarybtntxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondarybtn: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  secondarybtntxt: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    marginTop: 30,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  cardElevated: {
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#4CAF50',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
    textAlign: 'center',
  },
  generatedPassword: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});

export default App;
