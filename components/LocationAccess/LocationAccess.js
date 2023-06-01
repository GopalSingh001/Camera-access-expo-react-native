import React, { useEffect, useState } from 'react';
import { Text, Button,View ,Image, ImageBackground} from 'react-native';
import * as Location from 'expo-location';


const LocationAccess = () => {
    const [permissionStatus, setPermissionStatus] = useState(null);
     
    useEffect(() => {
      checkLocationPermission();
    }, []);
  
    const checkLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
    };
  
    const requestPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
    };
  
    return (
      <>
        {permissionStatus === 'granted' ? (
            <View>
           {alert('congratulations your location permission is granted')}
           <ImageBackground style={{height:'100%',width:'100%'}} source={require('./gif.webp')} >
            <Text style={{color:'white',textAlign:"center",marginTop:250,fontSize:20,fontStyle:'italic',fontWeight:'bold'}}>Your Location Permission is Granted</Text>
            </ImageBackground>
            </View>
        

        ) : (
          <Button title="Request Location Permission" onPress={requestPermission} />
        )}
      </>
    );
  };
  

  export default LocationAccess