export interface UserServerList {
  current_server_plan: number;
  server_name: string;
  storage: number;
  used_storage: number;
  own_domain: boolean;
  domain: string;
  email_protection: boolean;
}
