<?php

namespace app\models;

use Yii;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "{{%items}}".
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $description
 * @property int|null $created_at
 * @property int|null $updated_at
 * @property int|null $user_id
 *
 * @property User $userId
 */
class Account extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%userAccounts}}';
    }

    public function behaviors()
    {
        return [
            TimestampBehavior::class,
            // [
            //     'class' => BlameableBehavior::class,
            //     'updatedByAttribute' => false
            // ]
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['first_name', 'last_name', 'email'], 'string'],
            [['created_at', 'user_id', 'updated_at', 'is_master'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'first_name' => Yii::t('app', 'First Name'),
            'last_name' => Yii::t('app', 'Last Name'),
            'email' => Yii::t('app', 'Email'),
            'is_member' => Yii::t('app', 'Is Member'),
            'is_master' => Yii::t('app', 'Is Master'),
            'user_id' => Yii::t('app', 'User ID'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

    public function fields()
    {
        $fields = parent::fields();

        $fields['username'] = function ($model) {
            return $model->setOtherAttr($model->user_id);
        };
        return $fields;
    }

    public function setOtherAttr($user_id){
        $user = User::find()->where(['id'=>$user_id])->one();
//        $this->username = $user->other_attr1;
//        $this->other_attr2 = $user->other_attr2;
        return $user->username;
    }

    public function getUserId()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * {@inheritdoc}
     * @return \app\models\query\AccountQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\query\AccountQuery(get_called_class());
    }
}
