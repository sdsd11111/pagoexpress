const XLSX = require('xlsx');
const path = require('path');

const filePath = path.resolve('d:/Abel paginas/PagoExpress/Pagina web/info-skills/SERVICIOS Y REQUISITOS.xlsx');
const wb = XLSX.readFile(filePath);

for (const sheetName of wb.SheetNames) {
    console.log(`\n=== SHEET: ${sheetName} ===`);
    const ws = wb.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
    for (const row of data) {
        console.log(JSON.stringify(row));
    }
}
