/**
 * WordPress dependencies
 */
const { PluginSidebarMoreMenuItem } = wp.editPost;
const { __ } = wp.i18n;

const MenuItem = () => (
  <PluginSidebarMoreMenuItem icon="editor-justify" target="dummynator-sidebar">
    {__("Dummynator")}
  </PluginSidebarMoreMenuItem>
);

export default MenuItem;
