import * as td from 'testdouble';
import { TestUserModel, createMksPlugin } from './fixtures';

describe('actions', () => {
  it('sends action complete event', () => {
    const { reactotron, track } = createMksPlugin();
    const user = new TestUserModel({});
    track(user);
    user.setAge(123);

    // details about the reactotron functions used
    const send = td.explain(reactotron.send);

    // called only once
    expect(send.callCount).toEqual(1);

    const payload = {
      name: 'setAge()',
      ms: 1,
      action: { name: 'setAge', path: '', args: [123] },
      mks: {
        type: 'sync',
        modelType: 'TestUserModel',
        alive: true,
        root: true,
      },
    };

    // send() params
    expect(send.calls[0].args).toMatchObject([
      'state.action.complete',
      payload,
    ]);
  });

  it('sends values changed event', () => {
    const { reactotron, track } = createMksPlugin();
    const user = new TestUserModel({});
    track(user);
    user.setAge(123);

    // details about the reactotron functions used
    const stateValuesChange = td.explain(reactotron.stateValuesChange);

    // called only once
    expect(stateValuesChange.callCount).toEqual(1);
    expect(stateValuesChange.calls[0].args).toEqual([[]]);
  });
});
