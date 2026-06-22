declare module "@breezystack/lamejs" {
  export class Mp3Encoder {
    constructor(channels: number, sampleRate: number, kbps: number);
    encodeBuffer(left: Int16Array, right?: Int16Array): Int8Array;
    flush(): Int8Array;
  }
  export class WavHeader {
    static readHeader(dataView: DataView): WavHeader;
  }
  const _default: { Mp3Encoder: typeof Mp3Encoder; WavHeader: typeof WavHeader };
  export default _default;
}
