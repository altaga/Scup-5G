# SCUP-WWAC

<p align="center">
  <img src="./Images/logo.png" width="50%" >
</p>

# Table of contents:
 
- [SCUP-WWAC](#scup-wwac)
- [Table of contents:](#table-of-contents)
- [Introduction:](#introduction)
- [App UI:](#app-ui)
  - [**Login Screen**:](#login-screen)
  - [**Monitor Tab**:](#monitor-tab)
    - [Functionality:](#functionality)
  - [**Summary**:](#summary)
    - [Functionality:](#functionality-1)
  - [**Report**:](#report)
    - [Functionality:](#functionality-2)
  - [**Additional notes**:](#additional-notes)
    - [Functionality:](#functionality-3)
  - [**Past Reports**:](#past-reports)
    - [Functionality:](#functionality-4)
  - [**ECG Details**:](#ecg-details)
    - [Functionality:](#functionality-5)
  - [**Historical Tab**:](#historical-tab)
    - [Functionality:](#functionality-6)
  - [**Simulator Tab**:](#simulator-tab)
      - [Functionality:](#functionality-7)
        - [Kendo Components:](#kendo-components)

# Introduction:

Smart telemedicine platform, based on IoT devices that provide Vital signs and historical values. This to transform the way telemedicine is provided and solve the biggest problem in relation to distance check-ups, which is taking biometrics. Our current version consists of an Oxygen Saturation Thimble, an ECG sensor and a contactless Thermometer that can send real time information to a Teams application. This allowing distance consultations and follow ups to become more seamless and to grab a real biometrics and vital signs while doing them.

# App UI:

The SCUP platform was designed using KendoReact's professional components library, using a wide variety of components to give our application all the desired functions.

https://www.telerik.com/kendo-react-ui/

Remember that these components are under license, to test them you need to register for the free trial.

https://www.telerik.com/download-login-v2-kendo-react-ui

To set the react license, follow the following official documentation.

https://www.telerik.com/kendo-react-ui/getting-started/

In this case the application is compatible with desktop and mobile.

https://scup-wwac.s3.amazonaws.com/index.html

Login Credentials:

    Email:drgregoryhouse@gmail.com
    Password:toor

## **Login Screen**:

Kendo Components: 

    import { Card, CardTitle } from "@progress/kendo-react-layout";
    import { Input } from "@progress/kendo-react-inputs";
    import { Button } from "@progress/kendo-react-buttons";

Desktop:

<img src="./Images/desktop/login-desk.png">

Mobile:

<img src="./Images/mobile/login-mob.png" width="32%">

## **Monitor Tab**:

Kendo Components: 

    import { Avatar, Card, CardTitle, CardBody } from "@progress/kendo-react-layout";
    import { Form, FormElement } from "@progress/kendo-react-form";
    import { ComboBox } from "@progress/kendo-react-dropdowns";
    import { Switch } from "@progress/kendo-react-inputs";
    import {Chart, ChartTitle, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem} from "@progress/kendo-react-charts";

Desktop:

<img src="./Images/desktop/monitor-desk.png">

Mobile:

<img src="./Images/mobile/monitor-mob.png" width="32%"><img src="./Images/mobile/monitor2-mob.png" width="32%"><img src="./Images/mobile/monitor3-mob.png" width="32%">

### Functionality:

The platform communicates with IoT devices through MQTT, which allows us to receive the data and graph it with the lowest possible latency.

ECG: 

The data received from the holter monitor is processed in real time on the page through a filter to be able to see the EKG graph correctly.

<img src="./Images/ecg.png">

Oxygen Saturation:

The data received by the oxygen saturation sensor are:

- BPM.
- blood's SatO2.
- Plethysmography Curve

<img src="./Images/sat.png">

Temperature:

This sensor takes the temperature of the patient's hand.

<img src="https://i.stack.imgur.com/HK7op.gif" width="1000" />

To calculate the real temperature of the body, a multivariable linear regression model was performed to obtain an equation that would relate the temperature of the back of the hand and the ambient temperature, to obtain the real internal temperature of the body.

<img src="https://i.ibb.co/Rgm108g/image.png" width="1000">

The data received by the platform is the calculated core body temperature.

<img src="./Images/temp.png">

Tab Explorer:

This section helps us to navigate between the 5 tabs that the monitor consists of.

<img src="./Images/explorer.png">

Patient Data:

In this section we can see the patient's data, in addition to having a convenient button to switch between the English system and the international system for temperature.

<img src="./Images/data.png">

## **Summary**:

Kendo Components: 

    import { TextArea } from "@progress/kendo-react-inputs";
    import { Button } from "@progress/kendo-react-buttons";
    import { Card } from "@progress/kendo-react-layout";

Desktop:

<img src="./Images/desktop/summary-desk.png">

Mobile:

<img src="./Images/mobile/summary-mob.png" width="32%">

### Functionality:

In the summary we can see a summary of the general data of the patient and manipulate them as the doctor sees fit, all these data will be permanently modified once the submit button is clicked.

## **Report**:

Kendo Components: 

    import { Button } from "@progress/kendo-react-buttons";
    import { TextArea, Input } from "@progress/kendo-react-inputs";
    import { Form, FormElement } from "@progress/kendo-react-form";

Desktop:

<img src="./Images/desktop/report-desk.png">

Mobile:

<img src="./Images/mobile/report-mob.png" width="32%">

### Functionality:

In this section the doctor will be able to fill in the data obtained during the consultation, the vital signs data are filled in automatically while the data is received.

## **Additional notes**:

Kendo Components: 

    import { Editor, EditorTools } from "@progress/kendo-react-editor";

Desktop:

<img src="./Images/desktop/notes-desk.png">

Mobile:

<img src="./Images/mobile/editor-mob.png" width="32%">

### Functionality:

All the data that cannot be added through the report can be filled in this section, to be able to add tables, images or any type of additional data that is required.

## **Past Reports**:

Kendo Components: 

    import { FormElement } from "@progress/kendo-react-form";
    import { ComboBox } from '@progress/kendo-react-dropdowns';

Desktop:

<img src="./Images/desktop/pastreport-desk.png">

Mobile:

<img src="./Images/mobile/pastreport-mob.png" width="32%">

### Functionality:

In order to review the previous reports of any patient, once you select the patient, the dates of the previous reports will automatically appear so that you can display them.

## **ECG Details**:

Kendo Components: 

    import { Card, CardTitle } from "@progress/kendo-react-layout";

Desktop:

<img src="./Images/desktop/ecg-desk.png">

Mobile:

<img src="./Images/mobile/ecg-mob.png" width="32%">

### Functionality:

In the case of the ECG details, we will have to be receiving ECG data (you can activate the simulator data), once we receive at least 10 - 15 seconds of data, the ECG symbol will turn from gray to red, this means that Once the pressures are done, we will send the data to an ECG analysis API to obtain relevant data for a doctor or physician/cardiologist.

## **Historical Tab**:

Kendo Components: 

    import { Avatar, Card, CardBody } from "@progress/kendo-react-layout";
    import { Form, FormElement } from "@progress/kendo-react-form";
    import { Switch } from "@progress/kendo-react-inputs";
    import { ComboBox } from "@progress/kendo-react-dropdowns";
    import { Calendar } from "@progress/kendo-react-dateinputs";
    import {Chart, ChartTitle, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem} from "@progress/kendo-react-charts";

Desktop:

<img src="./Images/desktop/historical-desk.png">

Mobile:

<img src="./Images/mobile/historical1-mob.png" width="32%"><img src="./Images/mobile/historical-mob.png" width="32%">

### Functionality:

This tab has the function of displaying the stored data of the patients in their consultations, which is downloaded from a database that is updated as the patient has consultations.

To display the data we have to select the patient and then move on the calendar to review the data of the day that we need to display.

## **Simulator Tab**:

As this project is based on IoT 

This tab has the function of simulating the data in real time of a patient during a consultation, in order to use it, we will select a patient from the drop-down list and activate the sensors that we want to simulate, once the sensors that we want to simulate are in color, we will return to the monitor tab to be able to see the real-time data of the patient.

To Test this application enter here first!:

https://scup-wwac.s3.amazonaws.com/index.html

With these login credentials:

    Email:drgregoryhouse@gmail.com
    Password:toor

#### Functionality:

You can follow the next video to use the application:

Video: Click on the image
[![DEMO](./Images/click-here-button.png)](https://youtu.be/hMcxbMPezFI)

Or the following Instructions:

To test the simulator, we must log in to the page first:

<img src="https://i.ibb.co/F6jrfcq/1.png">

Then, we will select one of the patients, in this case Victor Altamirano. We can see that no data appears yet.

<img src="https://i.ibb.co/ZxRvYpK/2.png">

Next, we go to the simulator tab. Select the patient we want to simulate and click on the buttons on the right, this will simulate one of the sensors.

<img src="https://i.ibb.co/kBRzXhS/3.png">

We will activate the 3 sensors to show how they arrive at the platform at the same time.

<img src="https://i.ibb.co/ZhJgdwd/4.png">

To see this go back to the monitor tab.

<img src="https://i.ibb.co/1LfnjyF/5.png">

Then deactivate 2 of them to show that now only the temperature arrives!

<img src="https://i.ibb.co/k6Qsgcm/7.png">

Only Temp arrives!

<img src="https://i.ibb.co/pzqPSjR/8.png">

You can now check and play with various combinations of this.


##### Kendo Components: 

    import { Avatar, Card } from "@progress/kendo-react-layout";
    import { Form, FormElement } from "@progress/kendo-react-form";
    import { ComboBox } from "@progress/kendo-react-dropdowns";

Desktop:

<img src="./Images/desktop/simul-desk.png">

Mobile:

<img src="./Images/mobile/simulator-mob.png" width="32%">


