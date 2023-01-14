/// <reference types="react-scripts" />
declare module "*.mp4" {
  const src: string;
  export default src;
}
declare module "*.gif" {
  const src: string;
  export default src;
}
type Secret =
  | string
  | Buffer
  | KeyObject
  | {
      key: string | Buffer;
      passphrase: string;
    };
declare const JWT: Secret;
