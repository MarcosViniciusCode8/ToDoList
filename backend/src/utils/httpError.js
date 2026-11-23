export function httpError(status, message) {
    const erro = new Error(message);
    erro.status = status;
    return erro;
}
