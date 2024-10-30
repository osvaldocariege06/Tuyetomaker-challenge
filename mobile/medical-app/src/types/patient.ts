
export type IPatient = {
  name: string;
  id: string;
  email: string;
  password: string;
  phone: string | undefined;
  birthDate: Date | undefined;
}