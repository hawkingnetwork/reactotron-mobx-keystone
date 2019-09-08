import { mks } from '../src/reactotron-mobx-keystone';

describe('plugin-interface', () => {
  it('factory interface', () => {
    expect(typeof mks()).toEqual('function');
  });

  it('plugin interface', () => {
    const plugin = mks()({} as any);

    expect(typeof plugin).toEqual('object');
    expect(typeof plugin.onCommand).toEqual('function');
    expect(typeof plugin.features).toEqual('object');
    expect(typeof plugin.features.trackMksNode).toEqual('function');
  });
});
