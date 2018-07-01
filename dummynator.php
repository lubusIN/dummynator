<?php
/**
 * Contributors: lubus, ajitbohra
 * Plugin Name: Dummynator
 * Plugin URI: https://www.lubus.in
 * Description: Quickly insert dummy content
 * Author: LUBUS
 * Author URI: https://lubus.in
 * Version: 1.1.0
 * Text Domain: dummynator
 * Domain Path: /languages
 * GitHub Plugin URI: https://github.com/lubusIN/dummynator
 * Tags: gutenberg, dummy, lipsum,
 * Requires at least: 3.0.1
 * Tested up to:  4.9.4
 * Stable tag: 1.1.0
 * License: GPLv3 or later
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package LubusIN_Dummynator
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! class_exists( 'LubusIN_Dummynator' ) ) :
	/**
	 * LubusIN_Dummynator Class.
	 *
	 * Main Class.
	 *
	 * @since 1.0.0
	 */
	class LubusIN_Dummynator {
		/**
		 * Instance.
		 *
		 * @since
		 * @access private
		 * @var LubusIN_Dummynator
		 */
		static private $instance;

		/**
		 * Singleton pattern.
		 *
		 * @since
		 * @access private
		 */
		private function __construct() {
			$this->setup_constants();
			$this->init_hooks();
		}


		/**
		 * Get instance.
		 *
		 * @since
		 * @access public
		 * @return LubusIN_Dummynator
		 */
		public static function get_instance() {
			if ( null === static::$instance ) {
				self::$instance = new static();
			}

			return self::$instance;
		}

		/**
		 * Hook into actions and filters.
		 *
		 * @since  1.0.0
		 */
		private function init_hooks() {
			// Set up localization on init Hook.
			add_action( 'init', array( $this, 'load_textdomain' ), 0 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_sidebar' ) );
		}

		/**
		 * Throw error on object clone
		 *
		 * The whole idea of the singleton design pattern is that there is a single
		 * object, therefore we don't want the object to be cloned.
		 *
		 * @since  1.0
		 * @access protected
		 *
		 * @return void
		 */
		public function __clone() {
			// Cloning instances of the class is forbidden.
			dummynator_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'dummynator' ), '1.0' );
		}

		/**
		 * Disable unserializing of the class
		 *
		 * @since  1.0
		 * @access protected
		 *
		 * @return void
		 */
		public function __wakeup() {
			// Unserializing instances of the class is forbidden.
			dummynator_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'dummynator' ), '1.0' );
		}

		/**
		 * Setup plugin constants
		 *
		 * @since  1.0
		 * @access private
		 *
		 * @return void
		 */
		private function setup_constants() {
			// Plugin version
			if ( ! defined( 'DUMMYNATOR_VERSION' ) ) {
				define( 'DUMMYNATOR_VERSION', '1.0.0' );
			}
			// Plugin Root File
			if ( ! defined( 'DUMMYNATOR_PLUGIN_FILE' ) ) {
				define( 'DUMMYNATOR_PLUGIN_FILE', __FILE__ );
			}
			// Plugin Folder Path
			if ( ! defined( 'DUMMYNATOR_PLUGIN_DIR' ) ) {
				define( 'DUMMYNATOR_PLUGIN_DIR', plugin_dir_path( DUMMYNATOR_PLUGIN_FILE ) );
			}
			// Plugin Folder URL
			if ( ! defined( 'DUMMYNATOR_PLUGIN_URL' ) ) {
				define( 'DUMMYNATOR_PLUGIN_URL', plugin_dir_url( DUMMYNATOR_PLUGIN_FILE ) );
			}
			// Plugin Basename aka: "dummynator/dummynator.php"
			if ( ! defined( 'DUMMYNATOR_PLUGIN_BASENAME' ) ) {
				define( 'DUMMYNATOR_PLUGIN_BASENAME', plugin_basename( DUMMYNATOR_PLUGIN_FILE ) );
			}
		}

		/**
		 * Loads the plugin language files.
		 *
		 * @since  1.0.0
		 * @access public
		 *
		 * @return void
		 */
		public function load_textdomain() {
			$locale = apply_filters( 'plugin_locale', get_locale(), 'dummynator' );
			// wp-content/languages/plugin-name/plugin-name-en_EN.mo.
			load_textdomain( 'dummynator', trailingslashit( WP_LANG_DIR ) . 'dummynator' . '/' . 'dummynator' . '-' . $locale . '.mo' );
			// wp-content/plugins/plugin-name/languages/plugin-name-en_EN.mo.
			load_plugin_textdomain( 'dummynator', false, basename( DUMMYNATOR_PLUGIN_DIR ) . '/languages/' );
		}

		/**
		 * Registers scripts
		 *
		 * @since 1.0.0
		 * @access public
		 *
		 * @return void
		 */
		public function register_sidebar() {
			$plugin_js  = 'build/script.js';
			$plugin_css = 'build/style.css';

			// Script
			wp_register_script(
				'dummynator-js',
				DUMMYNATOR_PLUGIN_URL . $plugin_js,
				array(
					'wp-plugins',
					'wp-element',
					'wp-edit-post',
					'wp-i18n',
					'wp-data',
					'wp-components',
					'wp-blocks',
					'wp-editor',
				),
				filemtime( DUMMYNATOR_PLUGIN_DIR . $plugin_js ),
				true
			);

			// Style
			wp_register_style(
				'dummynator',
				DUMMYNATOR_PLUGIN_URL . $plugin_css,
				array(),
				filemtime( DUMMYNATOR_PLUGIN_DIR . $plugin_css )
			);

			wp_enqueue_style( 'dummynator' );
			wp_enqueue_script( 'dummynator-js' );
		}
	}

endif;

LubusIN_Dummynator::get_instance();

