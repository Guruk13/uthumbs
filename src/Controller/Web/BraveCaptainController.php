<?php

namespace App\Controller\Web;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BraveCaptainController extends AbstractController
{
    /**
     * @Route("/", name="brave_captain")
     */
    public function index()
    {
        return $this->render('brave_captain/index.html.twig', [
            'controller_name' => 'BraveCaptainController',
        ]);
    }
}
