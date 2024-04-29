export interface ServerProperties {
  id: number;
  cpu_properties: CPUProperties;
  ram: number;
  storage: number;
  used_storage: number;
}

export interface CPUProperties {
  cpu: string;
  cores: number;
  clock: number;
  threads: number;
}
