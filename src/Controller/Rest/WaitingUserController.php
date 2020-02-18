<?php

namespace App\Controller\Rest;

//Business
use App\Entity\WaitingUser;
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
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;


class WaitingUserController extends FOSRestController
{
    /**
     * Creates an WaitingUser resource
     * @Rest\Post("/waiting_user")
     * @param Request $request
     * @return View
     */
    public function postWaitingUser(Request $request): View
    {
        $mediaType = $request->attributes->get('media_type');

        //encode/decode 
        dump($mediaType);
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $waitingUser = new WaitingUser();
        $jsonContent =  $request->getContent();
        $waitingUser = $serializer->deserialize($jsonContent, WaitingUser::class, 'json');
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($waitingUser);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();
        return View::create($waitingUser, Response::HTTP_CREATED);
    }

    /**
     * Retrieves a collection of WaitingUser resource
     * @Rest\Get("/waiting_users")
     */
    public function getWaitingUsers(Request $request): View
    {
        $mediaType = $request->attributes->get('media_type');
        //encode/decode 
        dump($mediaType);
        $repository = $this->getDoctrine()->getRepository(WaitingUser::class);
        $waitingUsers =  $repository->findAll();

        // In case our GET was a success we need to return a 200 HTTP OK response with the collection of waitingUser object
        return View::create($waitingUsers, Response::HTTP_OK);
    }

    /**
     * Retrieves an WaitingUser resource
     * @Rest\Get("/waiting_users/{userId}")
     */
    public function getWaitingUser(int $userId): View
    {
        $repository = $this->getDoctrine()->getRepository(WaitingUser::class);
        $waitingUser = $repository->findById($userId);
        // In case our GET was a success we need to return a 200 HTTP OK response with the request object
        return View::create($waitingUser, Response::HTTP_OK);
    }

    /**
     * Replaces WaitingUser resource
     * @Rest\Put("/wating_user/{userId}")
     */
    public function putWaitingUser(int $userId, Request $request): View
    {
        $repository = $this->getDoctrine()->getRepository(WaitingUser::class);
        $waitingUser = $repository->findById($userId);
        if ($waitingUser) {
            //encode/decode 
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];
            $serializer = new Serializer($normalizers, $encoders);
            $jsonContent = $request->getContent();
            $waitingUser = $serializer->deserialize($jsonContent, WaitingUser::class, 'json');
 
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($waitingUser);
            $entityManager->flush();
        }
        // In case our PUT was a success we need to return a 200 HTTP OK response with the object as a result of PUT
        return View::create($waitingUser, Response::HTTP_OK);
    }

    /**
     * Removes the WaitingUser resource
     * @Rest\Delete("/waiting_user/{userId}")
     * @ParamConverter("waitingUser", options={"mapping": {"userId" : "id"}})
     */
    public function deleteWaitingUser(WaitingUser $waitingUser): View
    {
        $repository = $this->getDoctrine()->getRepository(WaitingUser::class);
        if ($waitingUser) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($waitingUser);
            $entityManager->flush();
        }
        // In case our DELETE was a success we need to return a 204 HTTP NO CONTENT response. The object is deleted.
        return View::create([], Response::HTTP_NO_CONTENT);
    }
}
