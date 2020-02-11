<?php
//https://www.thinktocode.com/2018/03/26/symfony-4-rest-api-part-1-fosrestbundle/
    namespace App\Controller\Rest;
//Business
use App\Entity\Ride;
//Technical 
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest ;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;


class RideController  extends FOSRestController
{
    /**
     * Creates an Ride resource
     * @Rest\Post("/rides")
     * @param Request $request
     * @return View
     */
    public function postArticle(Request $request): View
    {
        $article = new Ride();
        $article->setPassengerRoom($request->get('passengerVolume'));
        $this->articleRepository->save($article);
        // In case our POST was a success we need to return a 201 HTTP CREATED response
        return View::create($article, Response::HTTP_CREATED);
    }

    /**
     * Retrieves a collection of Ride resource
     * @Rest\Get("/articles")
     */
    public function getRides(): View
    {
        $articles = $this->rideRepository->findAll();
        // In case our GET was a success we need to return a 200 HTTP OK response with the collection of article object
        return View::create($articles, Response::HTTP_OK);
    }


}
