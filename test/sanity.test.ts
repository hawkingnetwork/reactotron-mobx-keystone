import { AnyModel } from 'mobx-keystone';
import * as td from 'testdouble';
import { TestUserModel, createMksPlugin } from './fixtures';

describe('sanity', () => {
  it('a node is required', () => {
    const { track } = createMksPlugin();
    expect(track(null as any)).toEqual({ kind: 'required' });
    expect(track(undefined as any)).toEqual({ kind: 'required' });
  });

  it('only tracks mst nodes', () => {
    const { track } = createMksPlugin();
    expect(track({} as AnyModel)).toEqual({ kind: 'invalid-node' });
  });

  it('checks for dupes', () => {
    const { track } = createMksPlugin();
    expect(track(new TestUserModel({}))).toEqual({ kind: 'ok' });
    expect(track(new TestUserModel({}))).toEqual({ kind: 'already-tracking' });
  });

  it('no reactotron calls when tracking', () => {
    const { reactotron, track } = createMksPlugin();
    const user = new TestUserModel({});
    track(user);
    expect(td.explain(reactotron.send).callCount).toEqual(0);
    expect(td.explain(reactotron.stateValuesChange).callCount).toEqual(0);
    expect(td.explain(reactotron.startTimer).callCount).toEqual(0);
  });
});
