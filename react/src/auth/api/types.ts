export type LoginProps = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
};

export type SignupProps = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};
