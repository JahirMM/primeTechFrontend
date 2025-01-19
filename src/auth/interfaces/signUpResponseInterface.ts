export interface UserSignUpInterface {
  email: string;
  firstName: string;
  middleName?: string;
  paternalSurname: string;
  maternalSurname: string;
  createdAt: string;
}

export interface SignUpResponseInterface {
  message: string;
  user: UserSignUpInterface;
}
