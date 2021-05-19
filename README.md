# SCUP-WWAC
 
- [SCUP-WWAC](#scup-wwac)
- [SCUP:](#scup)
- [UI:](#ui)
  - [**App**:](#app)
  - [**Login Screen**:](#login-screen)
  - [**Monitor Tab**:](#monitor-tab)
    - [**Summary**:](#summary)
    - [**Report**:](#report)
    - [**Additional notes**:](#additional-notes)
    - [**Past Reports**:](#past-reports)
    - [**ECG Details**:](#ecg-details)
  - [**Historical Tab**:](#historical-tab)
  - [**Simulator Tab**:](#simulator-tab)

# SCUP:

Descripcion de que es scup y porque es util

# UI:

La plataforma SCUP se diseño mediante la libreria de componentes profesionales de KendoReact utilizando gran variedad de los mismos para darle todas las funciones deseadas a nuestra aplicacion.

https://www.telerik.com/kendo-react-ui/

Recuerda que estos componentes estan bajo licencia, para probarlos requieres registrarte para el free trial.

https://www.telerik.com/download-login-v2-kendo-react-ui

Para setear la licencia en react sigue la siguiente documentacion oficial.

https://www.telerik.com/kendo-react-ui/getting-started/

## **App**:

En este caso la aplicacion es compatible con desktop y mobil.

**https://scup-wwac.s3.amazonaws.com/index.html**

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

<img src="./Images/mobile/monitor-mob.png" width="32%">
<img src="./Images/mobile/monitor2-mob.png" width="32%">
<img src="./Images/mobile/monitor3-mob.png" width="32%">

### **Summary**:

Kendo Components: 

    import { TextArea } from "@progress/kendo-react-inputs";
    import { Button } from "@progress/kendo-react-buttons";
    import { Card } from "@progress/kendo-react-layout";

Desktop:

<img src="./Images/desktop/summary-desk.png">

Mobile:

<img src="./Images/mobile/summary-mob.png" width="32%">

### **Report**:

Kendo Components: 

    import { Button } from "@progress/kendo-react-buttons";
    import { TextArea, Input } from "@progress/kendo-react-inputs";
    import { Form, FormElement } from "@progress/kendo-react-form";

Desktop:

<img src="./Images/desktop/report-desk.png">

Mobile:

<img src="./Images/mobile/report-mob.png" width="32%">

### **Additional notes**:

Kendo Components: 

    import { Editor, EditorTools } from "@progress/kendo-react-editor";



### **Past Reports**:

Kendo Components: 

    import { FormElement } from "@progress/kendo-react-form";
    import { ComboBox } from '@progress/kendo-react-dropdowns';

Desktop:

<img src="./Images/desktop/pastreport-desk.png">

Mobile:

<img src="./Images/mobile/pastreport-mob.png" width="32%">

### **ECG Details**:

Kendo Components: 

    import { Card, CardTitle } from "@progress/kendo-react-layout";

Desktop:

<img src="./Images/desktop/ecg-desk.png">

Mobile:

<img src="./Images/mobile/ecg-mob.png" width="32%">

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

<img src="./Images/mobile/historical1-mob.png" width="32%">
<img src="./Images/mobile/historical-mob.png" width="32%">

## **Simulator Tab**:

Kendo Components: 

    import { Avatar, Card } from "@progress/kendo-react-layout";
    import { Form, FormElement } from "@progress/kendo-react-form";
    import { ComboBox } from "@progress/kendo-react-dropdowns";

Desktop:

<img src="./Images/desktop/simul-desk.png">

Mobile:

<img src="./Images/mobile/simulator-mob.png" width="32%">