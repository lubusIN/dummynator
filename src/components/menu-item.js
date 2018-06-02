/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PluginSidebarMoreMenuItem } from "@wordpress/editPost";

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
