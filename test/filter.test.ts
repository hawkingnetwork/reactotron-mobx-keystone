import * as td from 'testdouble';
import { TestUserModel, createMksPlugin } from './fixtures';

describe('filter', () => {
  it('skips filtered messages', () => {
    const { reactotron, track } = createMksPlugin({ filter: () => false });
    const user = new TestUserModel({});
    track(user);
    user.setAge(123);

    const send = td.explain(reactotron.send);
    expect(send.callCount).toEqual(0);
  });
});
