<?php

namespace app\modules\api\controllers;

use yii\data\ActiveDataProvider;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\rest\ActiveController;

/**
 * Class ItemController
 *
 * @package app\modules\api\controllers
 */
class ItemController extends ActiveController
{
    public $modelClass = '\app\models\Item';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        // Options 2: Remove authenticator, Add Cors and then Add authenticator
        $auth = $behaviors['authenticator'];
        $auth['authMethods'] = [
            HttpBearerAuth::class
        ];
        unset($behaviors['authenticator']);
        $behaviors['cors'] = [
            'class' => Cors::class
        ];
        $behaviors['authenticator'] = $auth;

        return $behaviors;
    }

}
