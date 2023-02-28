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

		// Post Grid Main
		$this->pgb_register_block( 'post-grid-main',[
			'render_callback' => [$this, 'post_grid_mainrender_callback']
		] );
	}	

	public function pgb_register_inline_style( $id, $css ){
		wp_register_style( $id, false );
		wp_enqueue_style( $id );
		wp_add_inline_style( $id, $css );
	 } 

	 /**
	 * Post Grid Main Render Callback
	 */
	 public function post_grid_mainrender_callback($attributes, $content){

		require_once __DIR__ . '/templates/post-grid/post-grid.php';
		$id = $attributes['id']; 
		
		$this->pgb_register_inline_style(
			$id,
			post_grid( $attributes )
		);


		$number_of_posts = isset($attributes['numberOfPosts']) ? $attributes['numberOfPosts'] : -1;
		$categories = isset($attributes['categories']) ? $attributes['categories'] : [];
		$post_filter_type = isset($attributes['postFilter']) ? $attributes['postFilter'] : 'latest';
		$posts = isset($attributes['posts']) ? $attributes['posts'] : [];

		$category_ids = [];

		foreach ($categories as $category) {
			$category_ids[] = $category['value'];
		}

		$post_ids = [];

		foreach ($posts as $post) {
			$post_ids[] = $post['value'];
		}

		// echo "<pre>";
		// print_r($post_filter_type);
		// echo "</pre>";

		$args = [
			'post_type' => 'post',
		];

		if( $post_filter_type !== 'individual'){
			$args['posts_per_page'] = $number_of_posts;
		}

		if( $post_filter_type == 'category'){
			$args['category__in'] = $category_ids;
		}

		if( $post_filter_type == 'individual'){
			$args['post__in'] = $post_ids;
		}

		
	
		$post_query = new WP_Query($args);

		$content = '';
		$content .= '<div class="post-grid-main">';
		
		if($post_query->have_posts() ) {
			while($post_query->have_posts() ) {
				$post_query->the_post();
				

				$image = get_the_post_thumbnail();
				
				$content .= '<div class="post-single-item">';
				$content .= '<div class="header_section">';
				$content .= '<div class="featured-image">';
				$content .= $image;
				$content .= '<div class="categories"><div class="category-item">'.get_the_category_list().'</div></div>';
				$content .= '</div></div>';
				$content .= '<div class="content-section">';
				$content .= '<div class="post-title"><h4><a href="'. get_the_permalink().'">'. get_the_title().'</a></h4></div>';
				$content .= '<div class="post-excerpt">'.get_the_excerpt().'</div>';
				$content .= '<div class="content-hyperlink"><a href="'.get_the_permalink().'">Continue Reading &gt;&gt;</a></div>';
				$content .= '</div></div>';			
					
				}
			}

			$content .= '</div>';
		return $content;		
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
