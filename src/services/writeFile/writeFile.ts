import fs from 'fs';
export const file = {
    createJson(data: any, path: string) {
        const transformInString = JSON.stringify(data, null, 2);
        fs.writeFileSync(path, transformInString, { encoding: 'utf-8' });
    },
    readJson(path: string) {
        console.log(path)
        const arquivo = fs.readFileSync(path, 'utf-8');
        return arquivo ? JSON.parse(arquivo || '') : ''
    },
}