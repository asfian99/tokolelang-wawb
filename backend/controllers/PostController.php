<?php
namespace app\controllers;

use app\helpers\BehaviorsFromParamsHelper;
use yii\rest\ActiveController;

class PostController extends ActiveController
{
    public $modelClass = 'app\models\Post';

    /**
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        // $behaviors = BehaviorsFromParamsHelper::behaviors($behaviors);
        // if you need other behaviors' method use like this
        // $behaviors['otherMethods'] = $value;
        return $behaviors;
    } **/
}