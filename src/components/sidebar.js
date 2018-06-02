/**
 * WordPress dependencies
 */
import { PluginSidebar } from "@wordpress/editPost";

/**
 * Internal dependencies
 */
import pluginIcon from "../data/icon";
import Generator from "./generator";

const Sidebar = () => {
  return (
    <PluginSidebar
      name="dummynator-sidebar"
      isPinnable={true}
      icon={pluginIcon}
      title="Dummy Content"
    >
      <Generator />
    </PluginSidebar>
  );
};

export default Sidebar;
