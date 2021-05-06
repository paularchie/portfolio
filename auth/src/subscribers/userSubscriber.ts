import { User } from '@supreme-tech/common';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent
} from 'typeorm';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    // Hash password
    console.log('before user insert');
  }

  afterInsert(event: InsertEvent<User>) {
    console.log('after userInserted');
  }
}
