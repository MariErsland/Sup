# Sup


## To run the project you will need:
Install git
1. Install Node.js?
2. Install Java JDK (Java 11)
3. Install Android Studio - må ha rett image???

### Install Node.js:
Install Node here: https://nodejs.org/en/download

### Install Java JDK:
1. Go to https://www.oracle.com/java/technologies/downloads/#java11-windows and choose Java 11 for Windows x64 installer. 
2. You will be prompted for username and password in oracle. Click 'create account'.
3. When you have created an account you can sign in and Java 11 will download. 

### Install Android Studio:
1. Go to developer.android.com/studio and download latest version

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
    
    
 ## Nye notater
 1. Må ha git installert
 2. Må ha Node installert for å bruke npx kommando og npm kommando
 3. Må installere react native når det dukker opp under kjøring av kommando npx react native
    Må kanskje bruke kommando:  npm install -g react-native
 Fekk det ikkje til. Prøv å last ned android studio igjen. Ta med alle SDK som trengs
 
 
 
 # Nye notater 30.03
 1. Last ned docker: https://www.docker.com/products/docker-desktop/

# Nye notater 31.03
1. Last ned java 11 først:
    1. ```
         Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
      ``` 
    2. 
