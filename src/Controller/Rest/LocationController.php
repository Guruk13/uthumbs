<?php

namespace App\Controller\Rest;
//Business
use App\Entity\Location;
//Technical 
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;
use Doctrine\ORM\EntityManagerInterface;



class LocationController  extends FOSRestController
{
    /**
     * Creates an Location resource
     * @Rest\Post("/locations")
     * @param Request $request
     * @return View
     */
    public function postLocation(Request $request): View
    {
        
        $location = new Location();
        $location->setLatitude($request->get('longitude'));
        $location->setLatitude($request->get('latitude'));
        $location->setLatitude($request->get('name'));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($location);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();
        return View::create($location, Response::HTTP_CREATED);
    }

    /**
     * Retrieves a collection of Location resource
     * @Rest\Get("/locations")
     */
    public function getLocations(): View
    {

        $repository = $this->getDoctrine()->getRepository(Location::class);
        $locations =  $repository->findAll();

        // In case our GET was a success we need to return a 200 HTTP OK response with the collection of article object
        return View::create($locations, Response::HTTP_OK);
    }
}
