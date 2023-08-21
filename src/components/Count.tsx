import { file } from "@/services/writeFile/writeFile";

export function Count() {
    const count = file.readJson('db').count

    return <div className="flex justify-center">
        <span className='block text-sm'>
            {count} pessoas já descobriram!
        </span>
    </div>
}