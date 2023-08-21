import { file } from "@/services/writeFile/writeFile";
import path from "path";

export function Count() {
    const count = file.readJson(path.resolve(__dirname, '../../public/db.json')).count

    return <div className="flex justify-center">
        <span className='block text-sm'>
            {count} pessoas já descobriram!
        </span>
    </div>
}