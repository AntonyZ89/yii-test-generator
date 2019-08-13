
<?php
namespace common\fixtures;
use common\models\VagaCest;
use yii\test\ActiveFixture;

class VagaCestFixture extends ActiveFixture
{
    public function init()
    {
        $this->modelClass = VagaCest::class;
        $this->dataFile = __DIR__ . '/../tests/_data/vagacest.php';
        
        $this->depends = [
            VagaFixture::class,
			CargoFixture::class,
			CandidatoFixture::class
        ];
        
        parent::init();
    }
}