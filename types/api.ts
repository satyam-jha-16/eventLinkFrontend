export type APIResponse<Data> = {
  success: boolean;
  message: string;
  data: Data;
}