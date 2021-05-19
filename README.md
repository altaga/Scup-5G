# SCUP-WWAC
 
- [SCUP-WWAC](#scup-wwac)
- [SCUP:](#scup)
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

# SCUP:

Descripcion de que es scup y porque es util

La plataforma SCUP se diseño mediante la libreria de componentes profesionales de KendoReact utilizando gran variedad de los mismos para darle todas las funciones deseadas a nuestra aplicacion.

https://www.telerik.com/kendo-react-ui/

Recuerda que estos componentes estan bajo licencia, para probarlos requieres registrarte para el free trial.

https://www.telerik.com/download-login-v2-kendo-react-ui

Para setear la licencia en react sigue la siguiente documentacion oficial.

https://www.telerik.com/kendo-react-ui/getting-started/

# App UI:

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

<img src="./Images/mobile/monitor-mob.png" width="32%">

Mobile:

<img src="./Images/mobile/monitor-mob.png" width="32%">
<img src="./Images/mobile/monitor2-mob.png" width="32%">
<img src="./Images/mobile/monitor3-mob.png" width="32%">

#### Functionality:

La plataforma se comunica con los devices IoT mediante MQTT, lo cual nos permite recibir los datos y graficarlos con la menor latencia posible.

EKG: 

Los datos recibidos del monitor holter son procesados en tiempo real en la pagina mediante un filtro para poder ver correctamente la grafica del EKG correctamente.

<img src="./Images/ecg.png">

Sat:

Los datos recibidos por el sensor de saturacion de oxigeno son:

- BPM.
- SatO2 en sangre.
- Plethysmography Curve

<img src="./Images/sat.png">

Temp:

Este sensor toma la temperatura de la mano del paciente.

<img src="https://i.stack.imgur.com/HK7op.gif" width="1000" />

To calculate the real temperature of the body, a multivariable linear regression model was performed to obtain an equation that would relate the temperature of the back of the hand and the ambient temperature, to obtain the real internal temperature of the body.

<img src="https://i.ibb.co/Rgm108g/image.png" width="1000">

El dato recibido por la plataforma es la temperatura central del cuerpo calculada.

<img src="./Images/temp.png">

Tab Explorer:

Esta seccion nos sirve para poder navegar entre las 5 tabs de las que consta el monitor.

<img src="./Images/explorer.png">

Patient Data:

En esta seccion podremos ver los datos del paciente, ademas de tener un conveniente boton para poder cambiar entre sistema ingles y sistema internacional para la temperatura.

<img src="./Images/data.png">

### **Summary**:

Kendo Components: 

    import { TextArea } from "@progress/kendo-react-inputs";
    import { Button } from "@progress/kendo-react-buttons";
    import { Card } from "@progress/kendo-react-layout";

Desktop:

<img src="./Images/desktop/summary-desk.png">

Mobile:

<img src="./Images/mobile/summary-mob.png" width="32%">

#### Functionality:

En el summary podremos ver un resumen de los datos generales del paciente y manipularlos segun el medico lo crea conveniente, todos estos datos se modificaran permanentemente una vez se de clic en el boton de submit.  

### **Report**:

Kendo Components: 

    import { Button } from "@progress/kendo-react-buttons";
    import { TextArea, Input } from "@progress/kendo-react-inputs";
    import { Form, FormElement } from "@progress/kendo-react-form";

Desktop:

<img src="./Images/desktop/report-desk.png">

Mobile:

<img src="./Images/mobile/report-mob.png" width="32%">

#### Functionality:

En esta seccion el medico podra llenar los datos obtenidos durante la consulta, los datos signos vitales se llenan de forma automatica mientras los datos son recibidos.

### **Additional notes**:

Kendo Components: 

    import { Editor, EditorTools } from "@progress/kendo-react-editor";

Desktop:

<img src="./Images/desktop/notes-desk.png">

Mobile:

<img src="./Images/mobile/editor-mob.png" width="32%">

#### Functionality:

Todos los datos que no puedan ser agregados mediante el reporte pueden se llenadas en esta seccion, para poder agregar tablas, imagenes o cualquier tipo de dato adicional que se requiera.

### **Past Reports**:

Kendo Components: 

    import { FormElement } from "@progress/kendo-react-form";
    import { ComboBox } from '@progress/kendo-react-dropdowns';

Desktop:

<img src="./Images/desktop/pastreport-desk.png">

Mobile:

<img src="./Images/mobile/pastreport-mob.png" width="32%">

#### Functionality:

Para poder revisar los reportes anteriores de algun paciente, una vez selecciones el paciente, aparecerean automaticamente las fechas de los reportes anteriores para que puedas desplegarlos.

### **ECG Details**:

Kendo Components: 

    import { Card, CardTitle } from "@progress/kendo-react-layout";

Desktop:

<img src="./Images/desktop/ecg-desk.png">

Mobile:

<img src="./Images/mobile/ecg-mob.png" width="32%">

#### Functionality:

En el caso de los detalles del ECG, tendremos que estar recibiendo datos del ECG (puedes activar los datos del simulador), una vez recibamos almenos 10 - 15 segundos de datos, el simbolo del ECG se tornara de gris a rojo, esto significa que una vez los presiones, mandaremos los datos una API de analisis de ECG para obtener datos relevantes para un medico o medico/cardiologo.

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

#### Functionality:

Esta tab tiene como funcion desplegar los datos almacenados de los pacientes en sus consultas, los cuales se descargar de una base de datos que se actualiza segun el paciente va teniendo consultas.

Para desplegar lo datos tenemos que seleccionar el paciente y posteriormente movernos en el calendario para poder revisar los datos del dia que necesitemos desplegar.

## **Simulator Tab**:

Kendo Components: 

    import { Avatar, Card } from "@progress/kendo-react-layout";
    import { Form, FormElement } from "@progress/kendo-react-form";
    import { ComboBox } from "@progress/kendo-react-dropdowns";

Desktop:

<img src="./Images/desktop/simul-desk.png">

Mobile:

<img src="./Images/mobile/simulator-mob.png" width="32%">

#### Functionality:

Esta tab tiene como funcion simular los datos en tiempo real de un paciente durante una consulta, para poder utilizarlo, seleccionaremos un paciente de la lista desplegable y activaremos los sensores que querramos simular, una vez esten en color los sensores que querramos simular, volveremos a la tab de monitor para poder ver los datos en tiempo real del paciente.