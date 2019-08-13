

<?php
namespace backend\tests\functional;

use backend\tests\FunctionalTester;
use common\fixtures\AcvFixture;
use common\fixtures\UserFixture;

class VagaCest
{
    /**
     * Load fixtures before db transaction begin
     * Called in _before()
     * @return array
     * @see \Codeception\Module\Yii2::loadFixtures()
     * @see \Codeception\Module\Yii2::_before()
     */
    public function _fixtures()
    {
        return [
            'acv' => [
                'class' => AcvFixture::class,
            ],
            'user' => [
                'class' => UserFixture::class,
            ],
        ];
    }

    /**
     * @param FunctionalTester $I
     */
    public function visitIndex(FunctionalTester $I)
    {
        $I->amLoggedInAs(1);
        $I->amOnPage(['vaga/index']);
        $I->see('APs', 'h1');
    }

    public function visitCreate(FunctionalTester $I)
    {
        $I->amLoggedInAs(1);
        $I->amOnPage(['vaga/create', 'id' => 1]);
        $I->see('Cadastrar AP', 'h1');
    }

    public function visitUpdate(FunctionalTester $I)
    {
        $I->amLoggedInAs(1);
        $I->amOnPage(['vaga/update', 'id' => 1]);
        //$I->see('cargo', 'Vaga[cargo]');
        $I->seeInField('Vaga[cargo]', 'cargo');
    }

    public function visitDelete(FunctionalTester $I)
    {
        $I->amLoggedInAs(1);
        $I->sendAjaxPostRequest(['vaga/delete', 'id' => 1]);
    }
}

