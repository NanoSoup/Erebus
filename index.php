<?php

use Timber\Timber;
use {{ SITE_NAMESPACE }}\IndexController;

$page = IndexController::indexAction();

Timber::render($page['templates'], $page['context']);