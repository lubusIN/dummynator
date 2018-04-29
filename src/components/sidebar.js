/**
 * WordPress dependencies
 */
const { PluginSidebar } = wp.editPost;

const Sidebar = () => (
  <PluginSidebar name="dummynator-sidebar" title="Dummy Content">
    <p>Sidebar for dummynator</p>
  </PluginSidebar>
);

export default Sidebar;
