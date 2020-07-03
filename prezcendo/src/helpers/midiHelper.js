import { Midi } from "@tonejs/midi";

export async function responseToArrayBuffer(resp) {
  return await (await resp.blob()).arrayBuffer();
}

export const getObjectFromArray = (arrayBuffer) => new Midi(arrayBuffer);
