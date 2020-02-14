<?php

namespace App\Controller\Rest;
//Business
use App\Entity\Ride;
//Technical 
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;





class RideController  extends FOSRestController
{
    /**
     * Creates an Ride resource
     * @Rest\Post("/rides")
     * @param Request $request
     * @return View 
     */
    public function postRide(Request $request): View
    {
        //encode/decode 
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);


        $ride = new Ride();
        $okaydumper =  $request->getContent();
        $ride = $serializer->deserialize($okaydumper, Ride::class, 'json');
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($ride);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();
        return View::create($ride, Response::HTTP_CREATED);
    }

    /**
     * Retrieves a collection of Ride resource
     * @Rest\Get("/rides")
     */
    public function getRides(): View
    {

        $repository = $this->getDoctrine()->getRepository(Ride::class);
        $rides =  $repository->findAll();

        // In case our GET was a success we need to return a 200 HTTP OK response with the collection of article object
        return View::create($rides, Response::HTTP_OK);
    }
}
