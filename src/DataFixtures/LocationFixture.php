<?php

namespace App\DataFixtures;

use App\Entity\Location;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;


class AnnonceFixture extends BaseFixture  implements DependentFixtureInterface
{

    public function __construct()
    {
 }

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(10, Location::class, function(Location $location, $i) {

            $location->setName('Random'. $i);
            $location->setLatitude($i);
            $location->setLongitude($i);

            return $location;
        });

        $manager->flush();
    }


    public function getDependencies()
    {
        return array(
            /*
            MyClassFiscture::class,
            */
            
        );
    }
}
