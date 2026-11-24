export function httpError(status, message) {
    const erro = new Error(message);
    erro.status = status;
    const date = new Date().toLocaleString();
    console.log(`Error => Code ${status}, Message ${message}, Date ${date} `)
    return erro;
}
  