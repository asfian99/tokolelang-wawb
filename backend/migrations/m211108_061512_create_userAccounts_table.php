<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%userAccounts}}`.
 */
class m211108_061512_create_userAccounts_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%userAccounts}}', [
            'id' => $this->primaryKey(),
            'first_name' => $this->string(180),
            'last_name' => $this->string(180),
            'email' => $this->string()->notNull()->unique(),
            'is_member' => $this->boolean()->defaultValue(1)->notNull(),
            'is_master' => $this->boolean()->defaultValue(0)->notNull(),
            'user_id' => $this->integer()->notNull(),
            'created_at' => $this->integer()->notNull()->defaultValue(time()),
            'updated_at' => $this->integer()->notNull()->defaultValue(time()),
        ]);

        $this->createIndex(
            '{{%idx-userAccounts-user_id}}',
            '{{%userAccounts}}',
            'user_id'
        );

        // add foreign key for table `{{%users}}`
        $this->addForeignKey(
            '{{%fk-userAccounts-user_id}}',
            '{{%userAccounts}}',
            'user_id',
            '{{%users}}',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey(
            '{{%fk-userAccounts-user_id}}',
            '{{%userAccounts}}'
        );

        $this->dropIndex(
            '{{%idx-userAccounts-user_id}}',
            '{{%userAccounts}}'
        );

        $this->dropTable('{{%userAccounts}}');
    }
}
