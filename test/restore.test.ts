import { getSnapshot } from 'mobx-keystone';
import { TestUserModel, createMksPlugin } from './fixtures';

const STATE = { age: 1, name: 'i', $modelType: 'TestUserModel' };
const INBOUND = {
  type: 'state.restore.request',
  payload: { state: STATE },
};

describe('restore', () => {
  it('responds with current state', () => {
    const { track, plugin } = createMksPlugin();
    const user = new TestUserModel({});
    track(user);
    plugin.onCommand(INBOUND);
    expect(getSnapshot(user)).toEqual(STATE);
  });

  it("won't die if we're not tracking nodes", () => {
    const { plugin } = createMksPlugin();
    expect(() => plugin.onCommand(INBOUND)).not.toThrow();
  });
});
