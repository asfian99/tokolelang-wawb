<?php

namespace app\helpers;

use Yii;
use yii\base\NotSupportedException;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;

/**
 * Class AuthMethodsFromParamsHelper provide useful method to create your compositeAuth authMethods from application parameter
 */
class AuthMethodsFromParamsHelper
{
    /**
     * Give array of authMethods from params.php
     * the result of AuthMethodsFromParamsHelper::authMethods would be like following
     * ```php
     * [
     *      Http:BasicAuth::class,
     *      HttpBearerAuth::class,
     *      QueryParamAuth::class,
     * ]
     * ```
     *
     * @return array the array representation of the object
     * @throws NotSupportedException
     */
    public static function authMethods(): array
    {
        $methods = new self();
        return $methods->getAuthMethods();
    }

    /**
     * Give array of authMethods from params.php
     * the result of $this->getAuthMethods would be like following
     * ```php
     * [
     *      Http:BasicAuth::class,
     *      HttpBearerAuth::class,
     *      QueryParamAuth::class,
     * ]
     * ```
     *
     * @return array the array representation of the object
     * @throws NotSupportedException
     */
    private function getAuthMethods(): array
    {
        $authMethodsArray = null;
//        if(Yii::$app->params['useHttpBasicAuth']) $authMethodsArray[] = HttpBasicAuth::class;
//        if(Yii::$app->params['useQueryParamAuth']) $authMethodsArray[] = QueryParamAuth::class;
        if(Yii::$app->params['useHttpBearerAuth']) $authMethodsArray[] = HttpBearerAuth::class;
        if($authMethodsArray == null) throw new NotSupportedException('You must choose at least one auth methods, configure your app\config\params.php for more options.');
        return $authMethodsArray;
    }
}