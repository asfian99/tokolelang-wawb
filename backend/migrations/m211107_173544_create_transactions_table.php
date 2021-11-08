<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%transactions}}`.
 */
class m211107_173544_create_transactions_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%transactions}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'item_id' => $this->integer()->notNull(),
            'bid_value' => $this->bigInteger()->notNull(),
            'created_at' => $this->integer()->notNull()->defaultValue(time()),
            'updated_at' => $this->integer()->notNull()->defaultValue(time()),
        ]);

        $this->createIndex(
            '{{%idx-transactions-user_id}}',
            '{{%transactions}}',
            'user_id'
        );

        // add foreign key for table `{{%users}}`
        $this->addForeignKey(
            '{{%fk-transactions-user_id}}',
            '{{%transactions}}',
            'user_id',
            '{{%users}}',
            'id',
            'CASCADE'
        );

        $this->createIndex(
            '{{%idx-transactions-item_id}}',
            '{{%transactions}}',
            'item_id'
        );

        // add foreign key for table `{{%users}}`
        $this->addForeignKey(
            '{{%fk-transactions-item_id}}',
            '{{%transactions}}',
            'item_id',
            '{{%items}}',
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
            '{{%fk-transactions-user_id}}',
            '{{%transactions}}'
        );

        $this->dropIndex(
            '{{%idx-transactions-user_id}}',
            '{{%transactions}}'
        );

        $this->dropForeignKey(
            '{{%fk-transactions-item_id}}',
            '{{%transactions}}'
        );

        $this->dropIndex(
            '{{%idx-transactions-item_id}}',
            '{{%transactions}}'
        );

        $this->dropTable('{{%transactions}}');
    }
}
