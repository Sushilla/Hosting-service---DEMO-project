export interface UserServerList {
  current_server_plan: number;
  service_name: string;
  own_domain: boolean;
  domain: string;
  own_server: boolean;
  storage: number;
  used_storage: number;
  email_protection: boolean;
}
