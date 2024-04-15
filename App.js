import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const App = () => {
  const [gasPrice, setGasPrice] = useState('');
  const [gasMileage, setGasMileage] = useState('');
  const [electricPrice, setElectricPrice] = useState('');
  const [electricMileage, setElectricMileage] = useState('');
  const [annualDistance, setAnnualDistance] = useState(0);
  const [savings, setSavings] = useState(0);

  const calculateGasDistance = () => {
    if (gasPrice && gasMileage) {
      return parseFloat(gasMileage);
    }
    return NaN;
  };

  const calculateElectricDistance = () => {
    if (electricPrice && electricMileage) {
      return parseFloat((gasPrice/electricPrice)).toFixed(2) * parseFloat(electricMileage).toFixed(2);
    }
    return NaN;
  };
  const calculateKmMore = () => {
    if (electricPrice && electricMileage) {
      return calculateElectricDistance() - calculateGasDistance();
    }
    return NaN;
  };
  const calculateSavingsPerYear = () => {
    const gasCost = parseFloat(gasPrice) * (annualDistance / parseFloat(gasMileage));
    const electricCost = parseFloat(electricPrice) * (annualDistance / parseFloat(electricMileage));
    const savingsAmount = gasCost - electricCost;
    return savingsAmount.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EV Savings Calculator</Text>

      <Text style={styles.subtitle}>Gas Vehicle Information</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setGasPrice}
          value={gasPrice}
          placeholder="Price per litre ($/L)"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setGasMileage}
          value={gasMileage}
          placeholder="Gas mileage (km/L)"
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.subtitle}>Electric Vehicle Information</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setElectricPrice}
          value={electricPrice}
          placeholder="Utilities cost ($/kWh)"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setElectricMileage}
          value={electricMileage}
          placeholder="EV mileage (km/kWh)"
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.subtitle}>How many Km do you drive each year?</Text>
      <View style={styles.animationButton}>
        <TouchableOpacity style={styles.button} onPress={() => setAnnualDistance(15000)}>
          <Text style={annualDistance === 15000 ? styles.selected : styles.buttonText}>15000</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setAnnualDistance(25000)}>
          <Text style={annualDistance === 25000 ? styles.selected : styles.buttonText}>25000</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setAnnualDistance(40000)}>
          <Text style={annualDistance === 40000 ? styles.selected : styles.buttonText}>40000</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.bigButton} onPress={() => setSavings(calculateSavingsPerYear(),calculateElectricDistance(),calculateKmMore() )}>
        <Text style={styles.bigButtonText}>Estimate savings</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>For the price of 1 liter of gas, you can travel:</Text>
      
    
      
      <View style={styles.resultContainer}>
      <View style={styles.View1}>
      <Image 
      style = {{width: 30, height: 30}} 
      source={require('./assets/gas.png')} />
      <View style={styles.resultBox}>
      <Text style={styles.textA}>{calculateGasDistance().toFixed(2)}</Text>
      <Text>km</Text>
      </View>
      </View>
      <View style={styles.View2}>
      <Image 
      style = {{width: 30, height: 30}} 
      source={require('./assets/power.png')} />
      <View style={styles.resultBox}>
      <Text style={styles.textA}>{calculateElectricDistance().toFixed(2)}</Text>
      <Text>km</Text>
      </View>
      </View>
      <View style={styles.View3}>
      <Image 
      style = {{width: 30, height: 30}} 
      source={require('./assets/next.png')} />
      <View style={styles.resultBox}>
      <Text style={styles.textA}>{calculateKmMore().toFixed(2)}</Text>
      <Text style={styles.textB}>kmmore</Text>
      </View>
      </View>
      </View>

      <Text style={styles.subtitle}>By switching to electric, you obtain:</Text>
      <View style={styles.savingsContainer}>
        <Text style={styles.savingsText}>${savings}</Text>
        <Text style={styles.savingsText}>in savings per year</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textA:{
      fontWeight: "600",
      fontSize:"24",
      marginTop:10
  },
  textB:{
    fontSize:"15"
},
  title: {
    fontSize: 30,
   fontWeight: "700",
  marginBottom:10
  },
  View1:{
    alignItems:"center",
    backgroundColor: '#F286B5',
    padding:12,
    height: "100%",
    // width: "30%",
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  View2:{
    alignItems:"center",
    backgroundColor: '#68D8D9',
    padding:12,
    height: "100%",
    width: "auto",
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  View3:{
    alignItems:"center",
    backgroundColor: '#FEB907',
    padding:12,
    height: "100%",
    width: "30%",
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    width: '48%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  animationButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EBEBEB',
    padding: 10,
    borderRadius: 5,
    margin:"auto",
    padding:"auto",
    width: '100%',
    height:"6%"
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    marginTop:10
    
  },
  selected: {
    backgroundColor: 'white',
    color: 'black',
    marginTop:10,
    marginBottom:10,
    fontSize: 18,
    width:"90%",
    height:"60%",
    textAlign:"center",
    borderRadius:10
    // padding:10,
   
  },
  bigButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    width: '100%',
  },
  bigButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    width: '100%',
  },
  resultBox: {
    width:"100%",
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    marginTop: 5,
  },
  savingsContainer: {
    backgroundColor: 'black',
    borderColor: 'black',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  savingsText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '600',
  },
});

export default App;
