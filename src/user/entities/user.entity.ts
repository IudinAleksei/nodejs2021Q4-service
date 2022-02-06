export class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
