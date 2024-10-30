export enum RoleState {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR'
}


export type IDoctor = {
  name: string;
  id: string;
  email: string;
  password: string;
  role: RoleState;
  permissions: string[]
}

export type IAvailableTimesItems = {
  day: string
  start?: string
  end?: string
}