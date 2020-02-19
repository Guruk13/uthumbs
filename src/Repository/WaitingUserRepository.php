<?php

namespace App\Repository;

use App\Entity\WaitingUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method WaitingUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method WaitingUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method WaitingUser[]    findAll()
 * @method WaitingUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WaitingUserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WaitingUser::class);
    }


    /**
     * @return WaitingUser[] Returns an array of WaitingUser objects
     */
    public function findByName($name)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.name = :name')
            ->setParameter('name', $name)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(100000)
            ->getQuery()
            ->getResult()
        ;
    }
    

    // /**
    //  * @return WaitingUser[] Returns an array of WaitingUser objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?WaitingUser
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
