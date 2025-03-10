export default interface ServerErrorInterface {
  ok: boolean;
  error?: string;
  message?: string;
  data?: any;
  messageCode: string;
}
