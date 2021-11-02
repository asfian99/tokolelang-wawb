<?php

namespace app\modules\v1\controllers;

use yii\rest\ActiveController;

class PostController extends ActiveController
{
    public $enableCsrfValidation = false;
    public $modelClass = 'app\models\Post';

    public function behaviors() {
        $behaviors = parent::behaviors();

        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
        ];

        return $behaviors;
    }
}