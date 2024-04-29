export interface UserServerList {
  service_name: string;
  own_domain: boolean;
  domain: string;
  own_server: boolean;
  server_configuration: ServerConfiguration;
  email_protection: boolean;
}

export interface ServerConfiguration {
  current_server_plan: number;
  storage: number;
  used_storage: number;
}
