import fs from 'fs';
import path from 'path';

export const file = {
    createJson(data: any, filename: string) {
        const transformInString = JSON.stringify(data, null, 2);
        fs.writeFileSync(path.resolve(`./tmp/${filename}.json`), transformInString, { encoding: 'utf-8' });
    },
    readJson(filename: string) {
        const arquivo = fs.readFileSync(path.resolve(`./tmp/${filename}.json`), 'utf-8');
        return arquivo ? JSON.parse(arquivo || '') : ''
    },
}