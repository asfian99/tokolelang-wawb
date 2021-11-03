<?php

namespace app\controllers;

use app\models\AccessToken;
use app\models\Item;
use app\models\User;
use app\models\Status;
use Yii;
use yii\base\Exception;
use yii\base\InvalidConfigException;
use yii\rest\Controller;
use yii\web\ErrorAction;

class SiteController extends Controller
{    
    protected function verbs(): array
    {
       return [
           'signup' => ['POST'],
           'login' => ['POST'],
       ];
    }

    public function actionIndex(): array
    {
        $post = Item::find()->all();
        return [
            'status' => Status::STATUS_OK,
            'message' => 'Success',
            'data' => $post
        ];
    }

    
    public function actionView($id): array
    {
        $post = Item::findOne($id);
        return [
            'status' => Status::STATUS_FOUND,
            'message' => 'Data Found',
            'data' => $post
        ];
    }

    /**
     * @throws Exception
     * @throws InvalidConfigException
     */
    public function actionSignup(): array
    {
        $model = new User();
        $params = Yii::$app->request->post();
        if(!$params) {
            Yii::$app->response->statusCode = Status::STATUS_BAD_REQUEST;
            return [
                'status' => Status::STATUS_BAD_REQUEST,
                'message' => "Need username, password, and email.",
                'data' => ''
            ];
        }


        $model->username = $params['username'];
        $model->email = $params['email'];
        $model->setPassword($params['password']);
        $model->generateAuthKey();
        $model->status = User::STATUS_ACTIVE;

        if ($model->save()) {
            Yii::$app->response->statusCode = Status::STATUS_CREATED;
            $response['isSuccess'] = 201;
            $response['message'] = 'You are now a member!';
            $response['user'] = \app\models\User::findByUsername($model->username);
            return [
                'status' => Status::STATUS_CREATED,
                'message' => 'You are now a member',
                'data' => User::findByUsername($model->username),
            ];
        } else {
            Yii::$app->response->statusCode = Status::STATUS_BAD_REQUEST;
            $model->getErrors();
            $response['hasErrors'] = $model->hasErrors();
            $response['errors'] = $model->getErrors();
            return [
                'status' => Status::STATUS_BAD_REQUEST,
                'message' => 'Error saving data!',
                'data' => [
                    'hasErrors' => $model->hasErrors(),
                    'getErrors' => $model->getErrors(),
                ]
            ];
        }
    }

    /**
     * @throws Exception
     * @throws InvalidConfigException
     */
    public function actionLogin(): array
    {
        $params = Yii::$app->request->post();
        if(empty($params['username']) || empty($params['password'])) return [
            'status' => Status::STATUS_BAD_REQUEST,
            'message' => "Need username and password.",
            'data' => ''
        ];

        $user = User::findByUsername($params['username']);

        if ($user->validatePassword($params['password'])) {
            if(isset($params['consumer'])) $user->consumer = $params['consumer'];
            if(isset($params['access_given'])) $user->access_given = $params['access_given'];

            Yii::$app->response->statusCode = Status::STATUS_FOUND;
            $user->generateAuthKey();
            $user->save();
            return [
                'status' => Status::STATUS_FOUND,
                'message' => 'Login Succeed, save your token',
                'data' => [
                    'id' => $user['id'],
                    'username' => $user->username,
                    'token' => $user->auth_key,
                    'email' => $user['email'],
                    'first_name' => $user['first_name'],
                    'last_name' => $user['last_name'],
                    'is_member' => $user['is_member'],
                    'is_pelelang' => $user['is_pelelang'],
                ]
            ];
        } else {
            Yii::$app->response->statusCode = Status::STATUS_UNAUTHORIZED;
            return [
                'status' => Status::STATUS_UNAUTHORIZED,
                'message' => 'Username and Password not found. Check Again!',
                'data' => ''
            ];
        }
    }

    public function actionLogout(): array
    {
        $params = Yii::$app->request->post();
        if(empty($params['username'])) return [
            'status' => Status::STATUS_BAD_REQUEST,
            'message' => "Need username.",
            'data' => ''
        ];

        $user = User::findByUsername($params['username']);

        if ($user) {
            AccessToken::makeAllUserTokenExpiredByUserId($user['id']);
            Yii::$app->response->statusCode = Status::STATUS_FOUND;
            return [
                'status' => Status::STATUS_FOUND,
                'message' => 'Logout Succeed',
                'data' => [
                    'username' => $user['username'],
                ]
            ];
        } else {
            Yii::$app->response->statusCode = Status::STATUS_UNAUTHORIZED;
            return [
                'status' => Status::STATUS_UNAUTHORIZED,
                'message' => 'Username not found. Check Again!',
                'data' => ''
            ];
        }
    }

    public function behaviors() {
        $behaviors = parent::behaviors();

        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
        ];

        return $behaviors;
    }
}