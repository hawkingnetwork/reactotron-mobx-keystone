import * as td from 'testdouble';
import { TestUserModel, createMksPlugin, createTestCompany } from './fixtures';

function createAction(paths: any) {
  return {
    type: 'state.values.subscribe',
    payload: { paths },
  };
}
describe('subscribe', () => {
  it("won't die if we're not tracking nodes", () => {
    const { plugin } = createMksPlugin();
    const action = createAction(['hey']);

    expect(() => plugin.onCommand(action)).not.toThrow();
  });

  it('accepts 1 path', () => {
    const { track, reactotron, plugin } = createMksPlugin();
    const user = new TestUserModel({});
    const action = createAction(['age']);
    track(user);
    plugin.onCommand(action);

    const stateValuesChange = td.explain(reactotron.stateValuesChange);
    expect(stateValuesChange.callCount).toEqual(1);
    expect(stateValuesChange.calls[0].args[0]).toEqual([
      { path: 'age', value: 100 },
    ]);
  });

  it('accepts 2 paths', () => {
    const { track, reactotron, plugin } = createMksPlugin();
    const user = new TestUserModel({});
    const action = createAction(['age', 'name']);
    track(user);
    plugin.onCommand(action);

    const stateValuesChange = td.explain(reactotron.stateValuesChange);
    expect(stateValuesChange.callCount).toEqual(1);
    expect(stateValuesChange.calls[0].args[0]).toEqual([
      { path: 'age', value: 100 },
      { path: 'name', value: '' },
    ]);
  });

  it('ignores dupes', () => {
    const { track, reactotron, plugin } = createMksPlugin();
    const user = new TestUserModel({});
    const action = createAction(['age', 'age']);
    track(user);

    plugin.onCommand(action);

    const stateValuesChange = td.explain(reactotron.stateValuesChange);
    expect(stateValuesChange.callCount).toEqual(1);
    expect(stateValuesChange.calls[0].args[0]).toEqual([
      { path: 'age', value: 100 },
    ]);
  });

  it('handles missing keys', () => {
    const { track, reactotron, plugin } = createMksPlugin();
    const user = new TestUserModel({});
    const action = createAction(['lol']);
    track(user);
    plugin.onCommand(action);

    const stateValuesChange = td.explain(reactotron.stateValuesChange);
    expect(stateValuesChange.callCount).toEqual(1);
    expect(stateValuesChange.calls[0].args[0]).toEqual([
      { path: 'lol', value: undefined },
    ]);
  });

  it('nested objects', () => {
    const { track, reactotron, plugin } = createMksPlugin();
    const action = createAction(['owner.age']);
    track(createTestCompany());
    plugin.onCommand(action);

    const stateValuesChange = td.explain(reactotron.stateValuesChange);
    expect(stateValuesChange.callCount).toEqual(1);
    expect(stateValuesChange.calls[0].args[0]).toEqual([
      { path: 'owner.age', value: 100 },
    ]);
  });

  it('nested arrays', () => {
    const { track, reactotron, plugin } = createMksPlugin();
    const action = createAction(['employees.1.age']);
    track(createTestCompany());
    plugin.onCommand(action);

    const stateValuesChange = td.explain(reactotron.stateValuesChange);
    expect(stateValuesChange.callCount).toEqual(1);
    expect(stateValuesChange.calls[0].args[0]).toEqual([
      { path: 'employees.1.age', value: 2 },
    ]);
  });
});
