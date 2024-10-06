import { json } from "@sveltejs/kit";
import child_process from "node:child_process";
import util from "node:util";
import wolConfig from "$config";

const exec = util.promisify(child_process.exec);

export async function POST({ request }: any) {
  const { name } = await request.json();
  const mac = wolConfig[name];

  try {
    
    const { stdout, strerr } = await exec(`sudo etherwake -i eth0 ${mac}`);
    console.log(`[${new Date().toLocaleString()}] ${name} - ${mac}`);
    return json({ stdout, strerr });
  } catch (e: any) {
    console.log(e);
    return json({ error: e.stderr });
  }
}
