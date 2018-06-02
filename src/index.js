/**
 * WordPress dependencies
 */
import { Fragment } from "@wordpress/element";
import { registerPlugin } from "@wordpress/plugins";

/**
 * Internal dependencies
 */
import Sidebar from "./components/sidebar";
import MenuItem from "./components/menu-item";
import "./style.scss";

const DummynatorPlugin = () => (
  <Fragment>
    <Sidebar />
    <MenuItem />
  </Fragment>
);

registerPlugin("dummynator", {
  render: DummynatorPlugin
});
