import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import Button from './Button'; 

const CameraAccess = () => {
    const [cameraPermission, setCameraPermission] = useState(null)
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null)

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
            try {

                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);

            } catch (e) {
                console.log(e);
            }

        }
    }

    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                alert('Congratulations Your Picture Saved :')
                setImage(null)
            } catch (e) {
                console.log(e);
            }
        }
    }

    if (cameraPermission === false) {
        return <Text>No access to Camera</Text>
    }
    return (
        <View style={styles.container}>
            {!image ?
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 30,
                        marginTop: 20
                    }}>
                        <Button icon={'retweet'} onPress={() => {
                            setType(type === CameraType.back ? CameraType.front : CameraType.back)
                        }} />
                        <Button icon={'flash'}
                            color={flash === Camera.Constants.FlashMode.off ? "gray" : "white"}
                            onPress={() => {
                                setFlash(flash === Camera.Constants.FlashMode.off
                                    ? Camera.Constants.FlashMode.on
                                    : Camera.Constants.FlashMode.off
                                )
                            }} />


                    </View>
                </Camera>
                :
                <Image source={{ uri: image }} style={styles.camera} />
            }


            <View style={{ backgroundColor: 'black' }}>
                {image ?
                    <View style={{

                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingHorizontal: 50

                    }}>
                        <Button title='Re-take' icon='retweet' onPress={() => setImage(null)} />
                        <Button title='save' icon='check' onPress={saveImage} />

                    </View>
                    :
                    <Button
                        title={'take a picture'}
                        icon='camera'
                        onPress={takePicture}

                    />
                }
            </View>
        </View>
    );
}

 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',


    },
    camera: {
        flex: 1,
        borderRadius: 20,

    }
})

export default CameraAccess;
