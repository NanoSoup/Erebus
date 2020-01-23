<?php

namespace {{ SITE_NAMESPACE }}\ACF\Blocks;

use NanoSoup\Nemesis\ACF\Blocks\Block;
use NanoSoup\Nemesis\ACF\Blocks\BlockInterface;
use Timber\Timber;

/**
 * Class Testimonials
 * @package ACF\Blocks
 */
class Testimonials extends Block implements BlockInterface
{
    /**
     * @return mixed|void
     */
    public function init(): void
    {
        add_action('acf/init', [$this, 'registerBlock']);
    }

    /**
     * @return mixed
     */
    public function registerBlock(): void
    {
        $this->setBlockName('testimonial')
            ->setBlockTitle('Testimonial')
            ->setBlockCallback([__CLASS__, 'renderBlock'])
            ->setBlockIcon('format-quote')
            ->setCat('generic', 'Generic Blocks')
            ->saveBlock();
    }

    /**
     * @param $block
     * @return mixed|void
     */
    public static function renderBlock($block): void
    {
        $vars['block'] = $block;
        $vars['fields'] = get_fields();

        $vars['fields']['avatar'] = new \Timber\Image($vars['fields']['avatar']);

        Timber::render( get_stylesheet_directory() . '/classes/ACF/Blocks/views/testimonials.twig', $vars );
    }
}