<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerYJ9200b\srcApp_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerYJ9200b/srcApp_KernelDevDebugContainer.php') {
    touch(__DIR__.'/ContainerYJ9200b.legacy');

    return;
}

if (!\class_exists(srcApp_KernelDevDebugContainer::class, false)) {
    \class_alias(\ContainerYJ9200b\srcApp_KernelDevDebugContainer::class, srcApp_KernelDevDebugContainer::class, false);
}

return new \ContainerYJ9200b\srcApp_KernelDevDebugContainer([
    'container.build_hash' => 'YJ9200b',
    'container.build_id' => '9ddc3e47',
    'container.build_time' => 1580913366,
], __DIR__.\DIRECTORY_SEPARATOR.'ContainerYJ9200b');
