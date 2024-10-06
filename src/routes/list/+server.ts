import { json } from '@sveltejs/kit';
import wolConfig from '$config';


export async function GET() {   
    try {
        const names = Object.keys( wolConfig )
        return json(names);
    } catch(e:any) {
        console.log(e);
        return json(e);
    }
}
