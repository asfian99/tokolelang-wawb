<?php

namespace app\controllers;

use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;

class PictureController extends \yii\rest\ActiveController
{
    public $modelClass = 'app\models\Picture';
    public $enableCsrfValidation = false;

    public function behaviors(): array
    {
        $behaviors = parent::behaviors();

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