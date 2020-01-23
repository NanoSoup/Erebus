<?php

use Timber\Timber;
use Harwin\IndexController;

$page = IndexController::indexAction();

Timber::render($page['templates'], $page['context']);