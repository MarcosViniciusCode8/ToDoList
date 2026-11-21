export default function errorMessageInConsole(erro) {
    const date = new Date().toLocaleString();
    console.log(`Error => ${erro} ${date} `)
}