import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { IUser } from './user.types';

/**
 * @remarks this class describe User model
 */

@Entity({ name: 'User' })
export class User implements IUser {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  /**
   * Create User instance with passed id, name, login and password
   *
   * @param id - user id
   * @defaultValue generated with v4 method of uuid
   *
   * @param name - name of the user
   * @defaultValue string 'user'
   *
   * @param login - user login
   * @defaultValue string 'login'
   *
   * @param password - user password
   * @defaultValue string 'P@55w0rd'
   */

  constructor(
    { id = uuidv4(), name = 'user', login = 'login', password = 'P@55w0rd' } = {
      id: uuidv4(),
      name: 'user',
      login: 'login',
      password: 'P@55w0rd',
    }
  ) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Static func for create response body with some user properties, without password
   *
   * @param user - User instance to response
   * @returns Return object for response body with id, name and login
   */
  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
