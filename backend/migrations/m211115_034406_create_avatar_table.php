<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%avatar}}`.
 */
class m211115_034406_create_avatar_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%avatar}}', [
            'id' => $this->primaryKey(),
            'account_id' => $this->integer(),
            'link' => $this->string(),
            'created_at' => $this->integer(),
            'updated_at' => $this->integer(),
        ]);

        $this->createIndex(
            '{{%idx-avatar-account_id}}',
            '{{%avatar}}',
            'account_id'
        );

        // add foreign key for table `{{%userAccounts}}`
        $this->addForeignKey(
            '{{%fk-avatar-account_id}}',
            '{{%avatar}}',
            'account_id',
            '{{%userAccounts}}',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%avatar}}');
    }
}
