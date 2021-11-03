<?php

namespace app\controllers;

use app\models\AccessToken;
use app\models\Post;
use app\models\Item;
use app\models\User;
use app\models\Status;
use Yii;
use yii\base\Exception;
use yii\base\InvalidConfigException;
use yii\rest\Controller;
use yii\web\ErrorAction;

class UserController extends Controller
{
    protected function verbs(): array
    {
        return [
            'index' => ['GET', 'HEAD'],
            'view' => ['GET', 'HEAD'],
            'update' => ['PUT', 'PATCH'],
        ];
    }


    public function actionIndex(): array
    {
        $params = Yii::$app->request->queryParams;
        if (!empty($params['username'])) {
            $user = User::findByUsername($params['username']);
            Yii::$app->response->statusCode = Status::STATUS_FOUND;
            return [
                'status' => Status::STATUS_FOUND,
                'message' => 'Data Found',
                'data' => [
                    'id' => $user['id'],
                    'first_name' => $user['first_name'],
                    'last_name' => $user['last_name'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'is_member' => $user['is_member'],
                    'is_pelelang' => $user['is_pelelang'],
                ]
            ];
        } else {
            Yii::$app->response->statusCode = Status::STATUS_NOT_FOUND;
            return [
                'status' => Status::STATUS_NOT_FOUND,
                'message' => "Not Found.",
                'data' => ''
            ];
        }
    }


}
