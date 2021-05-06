import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  BeforeInsert
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@supreme-tech/common';

@Entity()
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text', select: false })
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toResponseObject(): User {
    const { id, email } = this;
    return {
      id: id.toString(),
      email
    };
  }
}
