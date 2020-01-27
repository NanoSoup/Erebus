<?php

use {{ SITE_NAMESPACE }}\Kernel;
use {{ SITE_NAMESPACE }}\Wordpress\SingleController;
use Timber\Timber;

$action = Kernel::getAction(get_post_type());

try {
    $context = SingleController::$action();
    Timber::render($context['templates'], $context['context']);
} catch (Exception $e) {
    echo 'Caught exception: ', $e->getMessage(), "\n";
}
