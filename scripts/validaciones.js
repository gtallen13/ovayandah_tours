export function validacionModal(fechaInicio, fechaFinal, primer_nombre, primer_apellido, correo, verificacion_correo,
                                cantidad_personas, telefono)
{
    regex_fecha = /^[0-3]?[0-9]\/[01]?[0-9]\/[12][90][0-9][0-9]$/;
    regex_numeros = /^[-+]?[0-9]+$/;
    //validando fecha
    if (fechaInicio === "" && !fechaInicio.match(regex_fecha))
    {
        console.log("Fecha de inicio no valido");
        return false;
    }
    else if (fechaFinal === "" && !fechaFinal.match(regex_fecha))
    {
        console.log("Fecha de finalizacion no valida");
        return false;
    }
    else if (primer_nombre === "" && !primer_nombre.match(regex_numeros))
    {
        console.log('Primer nombre no valido')
    }
    
    else if (primer_apellido === "" && !primer_apellido.match(regex_numeros))
    {
        console.log('Primer apellido no valido')
    }
    else if (correo === "")


    return true;
}