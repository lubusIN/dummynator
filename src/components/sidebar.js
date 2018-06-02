/**
 * WordPress dependencies
 */
import { PluginSidebar } from "@wordpress/editPost";

/**
 * Internal dependencies
 */
import Generator from "./generator";

const Sidebar = () => {
  return (
    <PluginSidebar name="dummynator-sidebar" title="Dummy Content">
      <Generator />
    </PluginSidebar>
  );
};

export default Sidebar;
