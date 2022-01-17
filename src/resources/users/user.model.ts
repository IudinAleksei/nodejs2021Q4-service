import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from './user.types';

/**
 * @remarks this class describe User model
 */

@Entity({ name: 'User' })
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

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
