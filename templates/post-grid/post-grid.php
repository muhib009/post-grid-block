<?php 
/**
 * Template For: Post Grid
 */

 function post_grid( $attributes ) {
  $handle = $attributes['id'];

  $css ='';

  $css .= ".$handle.post-grid-main{";
    if(!empty($attributes['containerBg'])) {
      $css .= "background-color: {$attributes['containerBg']};";
      $css .= "grid-template-columns: repeat({$attributes['numberofRows']}, 1fr);";
      $css .= "padding: {$attributes['conatainerPadding']}px";
    }    
  $css .= "}";

  
  $css .= ".$handle .post-single-item .content-section{";
        if(!empty($attributes['contentBg'])) {
        $css .= "background-color: {$attributes['contentBg']};";
        }
    $css .= "}";
    
    $css .= ".$handle .post-title h4 a{";
        if(!empty($attributes['headingColor'])) {
            $css .= "color: {$attributes['headingColor']}!important;";
        }    
    $css .= "}";
    
    $css .= ".$handle .post-excerpt{";
        if(!empty($attributes['excerptColor'])) {
            $css .= "color: {$attributes['excerptColor']};";
        }    
    $css .= "}";
    
    $css .= ".$handle .content-hyperlink a{";
        if(!empty($attributes['readMoreColor'])) {
            $css .= "color: {$attributes['readMoreColor']}!important;";
        }    
    $css .= "}";
    
 


  // Desktop
  $css .= "@media (min-width: 1025px) {";
    // grid 
    // $css .= ".$handle.wp-block-etb-grid{";
    //   $css .= "grid-template-columns: repeat({$attributes['gridCols']['desktop']}, 1fr);";
    //   $css .= "grid-gap: {$attributes['gridGap']['desktop']}px;";
    // $css .= "}";

  $css .= "}";

  // Tablet
  $css .= "@media (min-width: 768px) and (max-width: 1024px) {";
    // grid 
//     $css .= ".$handle.wp-block-etb-grid{";
//       $css .= "grid-template-columns: repeat({$attributes['gridCols']['tablet']}, 1fr);";
//       $css .= "grid-gap: {$attributes['gridGap']['tablet']}px;";
//     $css .= "}";
//   $css .= "}";

  // Mobile
  $css .= "@media (max-width: 767px) {";
    // grid 
    // $css .= ".$handle.wp-block-etb-grid{";
    //   $css .= "grid-template-columns: repeat({$attributes['gridCols']['mobile']}, 1fr);";
    //   $css .= "grid-gap: {$attributes['gridGap']['mobile']}px;";
    // $css .= "}";

  $css .= "}";

   return $css; 
 }