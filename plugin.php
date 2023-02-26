<?php
/**
 * Plugin Name:       Post Grid Block
 * Description:       A Simple Post Display Block for Gutenberg Editor.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Muhibul Haque
 * Author URI:        https://makegutenblock.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       post-grid-block
 *
 * @package           @wordpress/create-block 
 */

 /**
  * @package Zero Configuration with @wordpress/create-block
  *  [pgb] && [PGB] ===> Prefix
  */

// Stop Direct Access 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Blocks Final Class
 */

final class PGB_BLOCKS_CLASS {
	public function __construct() {

		// define constants
		$this->pgb_define_constants();

		// block initialization
		add_action( 'init', [ $this, 'pgb_blocks_init' ] );

		// blocks category
		if( version_compare( $GLOBALS['wp_version'], '5.7', '<' ) ) {
			add_filter( 'block_categories', [ $this, 'pgb_register_block_category' ], 10, 2 );
		} else {
			add_filter( 'block_categories_all', [ $this, 'pgb_register_block_category' ], 10, 2 );
		}

		// enqueue block assets
		add_action( 'enqueue_block_assets', [ $this, 'pgb_external_libraries' ] );
	}

	/**
	 * Initialize the plugin
	 */

	public static function init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Define the plugin constants
	 */
	private function pgb_define_constants() {
		define( 'PGB_VERSION', '1.0.0' );
		define( 'PGB_URL', plugin_dir_url( __FILE__ ) );
		define( 'PGB_INC_URL', PGB_URL . 'includes/' );		
	}

	/**
	 * Blocks Registration 
	 */

	public function pgb_register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/blocks/' . $name, $options );
	 }

	/**
	 * Blocks Initialization
	*/
	public function pgb_blocks_init() {
		// register single block
		// $this->pgb_register_block( 'pgblock',[
		// 	'render_callback' => [$this, 'pgblock_render_callback']
		// ] );

		// Post Grid Main
		$this->pgb_register_block( 'post-grid-main',[
			'render_callback' => [$this, 'post_grid_mainrender_callback']
		] );
	}

	/**
	 * PG Block Render Callback
	 */

	//  public function pgblock_render_callback($attributes, $content){
	// 	return "Render Callback Hello World";
	//  }

	 /**
	 * Post Grid Main Render Callback
	 */
	 public function post_grid_mainrender_callback($attributes, $content){
		return "Post Grid Main";
	 }

	/**
	 * Register Block Category
	 */

	public function pgb_register_block_category( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'pgb',
					'title' => __( 'Post Grid Block', 'pgb' ),
				),
			),
			$categories,
		);
	}

	/**
	 * Enqueue Block Assets
	 */
	public function pgb_external_libraries() {
		// enqueue JS
		//wp_enqueue_script( 'pgb-lib', PGB_INC_URL . 'js/plugin.js', array(), PGB_VERSION, true );
		wp_enqueue_script( 'pgb-lib', 'https://fonts.cdnfonts.com/css/nunito', array(), PGB_VERSION, true );
	}

}

/**
 * Kickoff
*/

PGB_BLOCKS_CLASS::init();
