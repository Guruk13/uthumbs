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

https://stackoverflow.com/questions/42799118/mysql-find-points-within-radius-from-database

    SELECT id, 
( 6371 * 
    ACOS( 
        COS( RADIANS( db_latitude ) ) * 
        COS( RADIANS( $user_latitude ) ) * 
        COS( RADIANS( $user_longitude ) - 
        RADIANS( db_longitude ) ) + 
        SIN( RADIANS( db_latitude ) ) * 
        SIN( RADIANS( $user_latitude) ) 
    ) 
) 
AS distance FROM the_table HAVING distance <= $the_radius ORDER BY distance ASC"


db_latitude = database latitude field
db_longitude = database longitude field
$user_latitude = browser latitude coördinate
$user_longitude = browser longitude coördinate
$the_radius = the radius that you want to search in
    * */


    //get the points within a kilometer radius  close to a point in ZA WARUDO
    public function ZA_WARUDO(float $givenLongitude ,float  $givenLatitude, float $radiusKm)
    {
        $conn = $this->getEntityManager()
            ->getConnection();
        $sql =
         'SELECT id, 
        ( 6371 * 
            ACOS( 
                COS( RADIANS( w.latitude ) ) * 
                COS( RADIANS( :latitude) ) * 
                COS( RADIANS( :longitude ) - 
                RADIANS( w.latitude ) ) + 
                SIN( RADIANS( w.latitude) ) * 
                SIN( RADIANS( :latitude) ) 
            ) 
        ) 
        AS distance FROM waiting_user as w  HAVING distance <= :radiusInKm ORDER BY distance ASC';

        $stmt = $conn->prepare($sql);
        $stmt->execute(array(
            'latitude' => $givenLatitude,
            'longitude' => $givenLongitude,
            'radiusInKm' => $radiusKm,
        ));
        var_dump($stmt->fetchAll());
        die;
    }




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
