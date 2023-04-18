# Sup

### Below follows two guides to how to run our application. In both ways you will have to clone this reository on your computer. 

There are two ways to run it;
1. Connect your phone to your computer and install the application on your phone. This requires an android phone. 
2. Download Android Studio and run it on a emulator. 

#### How to install it on your phone: 
1. Go to settings on your phone and turn on developer mode. 
2. When in developer mode turn on 'debugging with USB'
3. Connect your phone to your computer with USB. 
4. In your terminal write: 
```
adb devices 
```
5. If there are other connected deices than your phone, disconnect them with: 
```
adb disconnect <ip address> 
```
6. Locate the project folder and run  
```
npx react-native start
```
7. Open a new terminal window, go to the project folder and run
``` 
npx react-native run-android
```
8. Once your phone is installed on your phone, locate it on your phone and start using it! 


#### How to run it with android studio

1. Install Node.js
2. Install Java JDK (Java 11)
3. Install Android Studio

##### Install Node.js:
Install Node here: https://nodejs.org/en/download

##### Install Java JDK:
1. Go to https://www.oracle.com/java/technologies/downloads/#java11-windows and choose Java 11 for Windows x64 installer. 
2. You will be prompted for username and password in oracle. Click 'create account'.
3. When you have created an account you can sign in and Java 11 will download. 

##### Install Android Studio:
1. Go to developer.android.com/studio and download latest version

*To run the project you have to use Android Studio.

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

### Run the code with android studio:

1. Go to the project folder and write command:  
```
npx react-native run-android

```
2. You will be prompted to install react-native, say yes. 
3. If you are having trouble with the 'react-native' command, try the following:

```
npm install react-native
```
4. If you are still having issues restart your computer. 

5. If you have your virtual device installed, it should open on your virtuel device. if not, follow these steps: 
    1. Connect your phone to you computer with usb
    2. Turn developer mode on on your phone
    3. When prompted, allow usb debugging. 
    

### Good luck!
  
 
