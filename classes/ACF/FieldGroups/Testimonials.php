<?php

namespace {{ SITE_NAMESPACE }}\ACF\FieldGroups;

use NanoSoup\Nemesis\ACF\BaseFields;

/**
 * Class Testimonials
 * @package ACF\FieldGroups
 */
class Testimonials extends BaseFields
{
    /**
     *
     */
    public function init()
    {
        add_action('acf/init', [$this, 'registerFieldGroup']);
    }

    /**
     *
     */
    public function registerFieldGroup()
    {
        acf_add_local_field_group([
            'key' => 'group_block_testimonial',
            'title' => 'Block: Testimonial',
            'fields' => [
                $this->textarea('block_testimonial', 'Testimonial'),
                $this->text('block_testimonial', 'Author'),
                $this->image('block_testimonial', 'Avatar')
            ],
            'location' => [
                [
                    [
                        'param' => 'block',
                        'operator' => '==',
                        'value' => 'acf/testimonial',
                    ]
                ]
            ],
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
            'active' => 1,
            'description' => '',
        ]);
    }
}