import { types, Model, tProp, modelAction, model } from 'mobx-keystone';
import { TestUserModel, TestUserModelType } from './test-user-model';

@model('TestCompanyModel')
export class TestCompanyModel extends Model({
  name: tProp(types.string, ''),
  employees: tProp(types.array(TestUserModelType)),
  owner: tProp(types.maybe(TestUserModelType)),
}) {
  @modelAction
  setName(value: string) {
    this.name = value;
  }
}

export const createTestCompany = () =>
  new TestCompanyModel({
    name: 'Steve',
    owner: new TestUserModel({ name: 'me', age: 100 }),
    employees: [
      new TestUserModel({ name: 'a', age: 1 }),
      new TestUserModel({ name: 'b', age: 2 }),
    ],
  });
