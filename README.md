# Sup
Pull down our code from GitHub

## To run the project you will need:
1. Install Node.js?
2. Install Java JDK
3. Install Android Studio

### Install Node.js:

### Install Java JDK:

### Install Android Studio:
1. Go to [developer.android.com/studio](developer.android.com/studio) and download latest version

*To run the project you have to use Android Studio. You can choose to either download a virtuel device when downloading Android Studio, or to connect you android phone directly on your computer. If you choose to use your phone, you can ignore step 2-6.*

2. When installing, remember to check the box 'install andriod virtuel device'. The checkbox will be shown in the installation menu under 'components' 
3. Once installed, open Anroid Studio to set up the emulator
4. Click on 'more actions' and 'virtual device manager' 
5. Choose 'create device' and choose the phone you want (or do we recommend one? Udemy had 'Pixel 2 phone'). 
6. Click 'accept' and download. 

7. Configure Android Home variable on you machine. Go to filesystem and find AppData>Local>Android>Sdk>platformtools. Copy the path. 
8. Search for 'edit environmental variables' on your machine and open it up. 
9. Click 'path' and 'edit' as shown in the picture below.
10. Click 'new' and paste the path you copied. Click 'ok'
11. Click 'new' and add variable name and variable value. 
    Variable name: ANDROID_HOME
    Variable value: *Path to AppData>Local>Android>Sdk*
12. Finished!

## Run the code with android studio:

1. Go to the project folder and write command:  
```
npx react-native run-android
```
3. 
