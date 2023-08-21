import fs from 'fs';

export const file = {
    createJson(data: any, filename: string) {
        const transformInString = JSON.stringify(data, null, 2);
        fs.writeFileSync(`./public/${filename}.json`, transformInString, { encoding: 'utf-8' });
    },
    readJson(filename: string) {
        const arquivo = fs.readFileSync(`./public/${filename}.json`, 'utf-8');
        return arquivo ? JSON.parse(arquivo || '') : ''
    },
}