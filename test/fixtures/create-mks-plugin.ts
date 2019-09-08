import { mks, MksPluginOptions } from '../../src/reactotron-mobx-keystone';
import { createMockReactotron } from '../mocks/create-mock-reactotron';

/**
 * Creates an reactotron-mst plugin with a mocked reactotron.
 */
export function createMksPlugin(pluginOptions: MksPluginOptions = {}) {
  const reactotron = createMockReactotron();
  const plugin = mks(pluginOptions)(reactotron);
  const track = plugin.features.trackMksNode;

  return { reactotron, plugin, track };
}
