+++
author = "admin"
categories = ["Coding"]
date = "2015-06-21T20:02:23+00:00"
tags = ["Cmder","Sage","WordPress"]
title = "Bundling resources from plug-ins in my WordPress theme"
type = "article"
url = "/bundling-resources-from-plug-ins-in-my-wordpress-theme/"

+++

Some time ago I got the idea to ramp up my skills in front-end web development and the tooling used outside my own world of SharePoint. I decided to create my own WordPress theme, but use as much of existing tooling and templates as I could.

[Sage][1] got my attention, so I downloaded that and started to look into its components. This was all new territory for me with Bower, Gulp, PHP, NodeJS and so on.

{{<post-image image="gulp.png" lightbox="true" alt="Console running Gulp" borderless="true" />}}

One thing I had noticed with my previous WordPress site was that the number of script and styling references (js and css files) grew as plug-ins were added. By having my own theme and taking control of the HTML being generated I hoped to be able to bundle the Javascript and CSS files to reduce the number of resources that visitors had to download.

One plug-in I was trying out was [Crayon Syntax Hightlighter][3], so let's look at what references it adds to my pages.

{{<highlight html>}}
<link rel='stylesheet' id='crayon-css' href='http://127.0.0.1/henrik.sommerfeld.nu/wp-content/plugins/crayon-syntax-highlighter/css/min/crayon.min.css?ver=2.7.1' type='text/css' media='all' />
<link rel='stylesheet' id='crayon-theme-classic-css' href='http://127.0.0.1/henrik.sommerfeld.nu/wp-content/plugins/crayon-syntax-highlighter/themes/classic/classic.css?ver=2.7.1' type='text/css' media='all' />
<link rel='stylesheet' id='crayon-font-consolas-css'  href='http://127.0.0.1/henrik.sommerfeld.nu/wp-content/plugins/crayon-syntax-highlighter/fonts/consolas.css?ver=2.7.1' type='text/css' media='all' />
<script type='text/javascript' src='http://127.0.0.1/henrik.sommerfeld.nu/wp-content/plugins/crayon-syntax-highlighter/js/min/crayon.min.js?ver=2.7.1'></script>
{{</highlight>}}

That's four additional files for the visitor to download right there. So let's first look at how to get rid of the styles (I leave the js file for now).

## Removing the CSS links

I learned that there was a queueing mechanism in WordPress that makes it possible to dequeue styles that I don't want. By hooking into that queue I should be able to get rid of the link style tags rendered on the page.

**Usage**
{{<highlight php>}}
<?php wp_dequeue_style( $handle ) ?>
{{</highlight>}}

[The function reference page for `wp_dequeue_style`][4] (quoted above) leaves me with two unanswered questions:

  * Where should I add this code?
  * What is this `$handle` thing?

Sage has an [extras.php][5] file that suits for this. If you're not using Sage, it's probably functions.php that suits best. We need to hook into the queueing pipeline right before the links are rendered. To avoid having to wade through the plug-in code to find the handle, instead I use the path from the rendered links above. This is what I added to my extras.php for removing the styles: 

First and last line is only added here fo my syntax highlighter to understand it's PHP, please ignore.

{{<highlight php>}}
<?php
function remove_plugin_styles() {
  global $wp_styles;
  $paths_to_remove = array(
    '/crayon-syntax-highlighter/',
    // Additional references here
  );

  foreach($wp_styles -&gt; registered as $registered) {
    foreach ($paths_to_remove as $path) {      
      if (strpos($registered-&gt;src,$path) !== false) {        
        wp_dequeue_style( $registered-&gt;handle );
        wp_deregister_style( $registered-&gt;handle );
        if (WP_ENV === 'development') {
          echo "\n&lt;!-- Removed style reference: " . $registered-&gt;src . " (" . $registered-&gt;handle . ") --&gt;";
        }
      }
    }
  }
}

add_action('wp_print_styles', __NAMESPACE__ . '\\remove_plugin_styles');
?>
{{</highlight>}}

If I reload the page source I can see that the links are gone and I can see my debug info instead:

{{<highlight html>}}
<!-- Removed style reference: http://127.0.0.1/henrik.sommerfeld.nu/wp-content/plugins/crayon-syntax-highlighter/css/min/crayon.min.css (crayon) -->
<!-- Removed style reference: http://127.0.0.1/henrik.sommerfeld.nu/wp-content/plugins/crayon-syntax-highlighter/themes/classic/classic.css (crayon-theme-classic) -->
<!-- Removed style reference: http://127.0.0.1/henrik.sommerfeld.nu/wp-content/plugins/crayon-syntax-highlighter/fonts/consolas.css (crayon-font-consolas) -->
{{</highlight>}}

## Adding the references to my bundle

Sage already provides me with a _manifest.json_ file where I can define the assets I want to be compiled and copied to a _dist_ folder that I later can push to my test and production environment. So I decided to use an extras.css file for all the additional resources that I could load at the end of the page (that are not essential to the first page rendering)

{{<highlight json>}}
{
   ...
   "extras.css": {
      "files": [
        "styles/extras.scss"
      ],
      "vendor": [
        "../../plugins/crayon-syntax-highlighter/themes/classic/classic.css",
        "../../plugins/crayon-syntax-highlighter/fonts/consolas.css",
        "../../plugins/crayon-syntax-highlighter/css/min/crayon.min.css"
      ]
    }, 
   ...
}
{{</highlight>}}

One thing to be aware of here is that the CSS files most likely contains references to images or font files that needs to be placed at the correct relative paths to the _dist_ (output) folder where the extras.css ends up. This could also be an issue when upgrading the plug-in later on. But from my perspective that's not really a problem since I'm the only user of the theme and when there's an update to a plug-in I use, I upgrade it in my development environment, rebuild my theme, test it and make adjustments if needed, before I upgrade the plug-in on the production site.

 [1]: https://roots.io/sage/
 [3]: https://wordpress.org/plugins/crayon-syntax-highlighter/
 [4]: https://codex.wordpress.org/Function_Reference/wp_dequeue_style
 [5]: https://github.com/roots/sage/blob/master/lib/extras.php