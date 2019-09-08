import * as td from 'testdouble';
import { TestUserModel, createMksPlugin } from './fixtures';

function createAction(path: string) {
  return { type: 'state.keys.request', payload: { path } };
}

describe('request-keys', () => {
  it("won't die if we're not tracking nodes", () => {
    const { reactotron, plugin } = createMksPlugin();
    plugin.onCommand(createAction(''));

    expect(td.explain(reactotron.stateKeysResponse).callCount).toEqual(0);
  });

  it('valid keys', () => {
    const { reactotron, track, plugin } = createMksPlugin();
    const user = new TestUserModel({});
    track(user);
    plugin.onCommand(createAction(''));

    const stateKeysResponse = td.explain(reactotron.stateKeysResponse);
    expect(stateKeysResponse.callCount).toEqual(1);
    const [atPath, keyList] = stateKeysResponse.calls[0].args;
    expect(atPath).toEqual(null);
    expect(keyList).toEqual(['name', 'age', '$modelType']);
  });

  it('invalid key path', () => {
    const { reactotron, track, plugin } = createMksPlugin();
    const user = new TestUserModel({});
    track(user);
    plugin.onCommand(createAction('does.not.exist'));

    const stateKeysResponse = td.explain(reactotron.stateKeysResponse);
    expect(stateKeysResponse.callCount).toEqual(1);
    const [atPath, keyList] = stateKeysResponse.calls[0].args;
    expect(atPath).toEqual('does.not.exist');
    expect(keyList).toEqual([]);
  });
});
