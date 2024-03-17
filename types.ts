type HAEvent = {
  Type: string;
  Properties: {
    [key: string]: any;
  };
};

interface ServiceRegistryInfo {
  name: string;
  type: string;
  endpoints: string[];
  version: string;
  registrationTimestamp: string;
  health: {
    status: boolean;
    lastHealthCheck: number;
    errorMessage: null | string;
  };
}

interface ServiceInfo {
  name: string;
  type: string;
  endpoints: string[];
  version: string;
}

interface ServiceRegistryInfo extends ServiceInfo {
  registrationTimestamp: string;
  health: {
    status: boolean;
    lastHealthCheck: number;
    errorMessage: null | string;
  };
}

interface ServiceRegistryMap {
  [componentType: string]: {
    [componentName: string]: ServiceRegistryInfo;
  };
}
