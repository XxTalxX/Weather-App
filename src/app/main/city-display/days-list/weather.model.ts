export interface Weather {
    region: string;
    currentConditions: CurrentConditions;
    next_days?: (NextDaysEntity)[] | null;
    contact_author: ContactAuthor;
    data_source: string;
  }
  export interface CurrentConditions {
    dayhour: string;
    temp: TempOrMaxTempOrMinTemp;
    precip: string;
    humidity: string;
    wind: Wind;
    iconURL: string;
    comment: string;
  }
  export interface TempOrMaxTempOrMinTemp {
    c: number;
    f: number;
  }
  export interface Wind {
    km: number;
    mile: number;
  }
  export interface NextDaysEntity {
    day: string;
    comment: string;
    max_temp: TempOrMaxTempOrMinTemp;
    min_temp: TempOrMaxTempOrMinTemp;
    iconURL: string;
  }
  export interface ContactAuthor {
    email: string;
    auth_note: string;
  }
  