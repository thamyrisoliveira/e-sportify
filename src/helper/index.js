export function validarCPF(valor) {
    if (!valor) return
    valor = valor.replace(/[^\d]+/g,'')
    if ( !valor || valor.length !== 11
        || valor === "00000000000"
        || valor === "11111111111"
        || valor === "22222222222"
        || valor === "33333333333"
        || valor === "44444444444"
        || valor === "55555555555"
        || valor === "66666666666"
        || valor === "77777777777"
        || valor === "88888888888"
        || valor === "99999999999" )
        return false
    let soma = 0
    let resto
    for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(valor.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto === 10) || (resto === 11))  resto = 0
    if (resto !== parseInt(valor.substring(9, 10)) ) return false
    soma = 0
    for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(valor.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto === 10) || (resto === 11))  resto = 0
    return resto === parseInt(valor.substring(10, 11));
}