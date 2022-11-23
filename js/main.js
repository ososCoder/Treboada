'use strict';

/*********************************
 ******URLs DE LA API****************************************************************************************************
 *********************************/

//municipios
const listaMunicipios = `https://www.el-tiempo.net/api/json/v2/municipios`;

//petición de info geográfica y meteorológica de un municipio : https://www.el-tiempo.net/api/json/v2/provincias/[CODPROV]/municipios/[ID]

/*********************************
 ******SELECCIÓN DE INPUT**********************************************************************************************
 *********************************/

//selección del form y del valor del input para buscar con el el municipio, códigos de provincias e ID
const form = document.forms.form;
const inputValue = form.elements.input.value.toLowerCase();

/*********************************
 ******PETICIÓN A MUNICIPIOS**********************************************************************************************
 *********************************/

//array de CODIGOINE: 5 primeros dígitos indican el ID del municipio.
const arrayCODIGOINE = [];

//array de CODPROV: necesario para la consulta por municipio.
const arrayCODPROV = [];

//array de NOMBRE: con el nombre del municipio.
const arrayNOMBRE = [];

const getMunicipios = async () => {
  try {
    const response = await fetch(listaMunicipios);
    const data = await response.json();

    //construcción del arrayCODIGOINE con los ID de los municipios. Los ID son los 5 primeros dígitos de cada CODIGOINE
    for (const municipioID of data) {
      arrayCODIGOINE.push(municipioID.CODIGOINE.slice(0, 5));
    }

    //construcción del arrayCODPROV
    for (const provinciaCode of data) {
      arrayCODPROV.push(provinciaCode.CODPROV);
    }

    //construcción del arrayNOMBRE con el nombre del los municipios en minúsculas
    for (const municipioName of data) {
      arrayNOMBRE.push(municipioName.NOMBRE.toLowerCase());
    }

    //busqueda índice del input en arrayNOMBRE
    const indexMunicipio = arrayNOMBRE.indexOf('a laracha'); //deberia llevar el inputValue
    console.log(`index del municipio: ${indexMunicipio}`);

    //dato del CODPROV del municipio buscado
    const CODPROVmunicipio = arrayCODPROV[indexMunicipio];
    console.log(`codigo de provincia del municipio: ${CODPROVmunicipio}`);

    //dato del ID del municipio buscado
    const IDmunicipio = arrayCODIGOINE[indexMunicipio];
    console.log(`id del municipio: ${IDmunicipio}`);

    //petición a la API con los términos de búsqueda CODPROV e ID del municipio
    const responseInput = await fetch(
      `https://www.el-tiempo.net/api/json/v2/provincias/${CODPROVmunicipio}/municipios/${IDmunicipio}`
    );
    const dataInput = await responseInput.json();
    console.log(dataInput);
  } catch (err) {
    console.error(err);
  }
};

getMunicipios();
