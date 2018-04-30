/**
 * WordPress dependencies
 */
const { PluginSidebarMoreMenuItem } = wp.editPost;
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import pluginIcon from "../data/icon";

const MenuItem = () => (
  <PluginSidebarMoreMenuItem icon={pluginIcon} target="dummynator-sidebar">
    {__("Dummynator")}
  </PluginSidebarMoreMenuItem>
);

export default MenuItem;
