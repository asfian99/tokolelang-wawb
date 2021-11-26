<?php

namespace app\models;

use Yii;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "{{%transactions}}".
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
class Transaction extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%transactions}}';
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
            [['account_id', 'item_id', 'bid_value', 'is_highest', 'created_at', 'updated_at'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'account_id' => Yii::t('app', 'User ID'),
            'item_id' => Yii::t('app', 'Item ID'),
            'bid_value' => Yii::t('app', 'Bid Value'),
            'is_highest' => Yii::t('app', 'Is Highest'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

    // public function getUserId()
    // {
    //     return $this->hasOne(User::class, ['id' => 'account_id']);
    // }

    /**
     * {@inheritdoc}
     * @return \app\models\query\TransactionQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\query\TransactionQuery(get_called_class());
    }
}
