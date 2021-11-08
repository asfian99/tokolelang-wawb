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
class Item extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%items}}';
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
            [['description', 'name'], 'string'],
            [['created_at', 'user_id', 'updated_at', 'closing_time'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'name' => Yii::t('app', 'Name'),
            'description' => Yii::t('app', 'Description'),
            'open_bid' => Yii::t('app', 'Open Bid'),
            'closing_time' => Yii::t('app', 'Closing Time'),
            'fundraising' => Yii::t('app', 'Fundraising'),
            'user_id' => Yii::t('app', 'User ID'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

    public function getUserId()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * {@inheritdoc}
     * @return \app\models\query\ItemQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\query\ItemQuery(get_called_class());
    }
}
