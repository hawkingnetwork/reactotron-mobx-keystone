import { types, Model, tProp, modelAction, model } from 'mobx-keystone';

@model('TestUserModel')
export class TestUserModel extends Model({
  name: tProp(types.string, ''),
  age: tProp(types.number, 100),
}) {
  @modelAction
  setAge(value: number) {
    this.age = value;
  }
}

export const TestUserModelType = types.model<TestUserModel>(TestUserModel);
