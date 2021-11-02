<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%transaction}}`.
 */
class m211102_014942_create_transaction_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%transaction}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'item_id' => $this->integer()->notNull(),
            'bid_value' => $this->bigInteger()->notNull(),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        $this->createIndex('idx-transaction-user_id', 'transaction', 'user_id');
        $this->addForeignKey(
            'fk-transaction-user_id',
            'transaction',
            'user_id',
            'user',
            'id',
            'CASCADE');

        $this->createIndex('idx-transaction-item_id', 'transaction', 'item_id');
        $this->addForeignKey(
            'fk-transaction-item_id',
            'transaction',
            'item_id',
            'item',
            'id',
            'CASCADE');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-transaction-user_id', 'transaction');
        $this->dropIndex('idx-transaction-user_id', 'transaction');

        $this->dropForeignKey('fk-transaction-item_id', 'transaction');
        $this->dropIndex('idx-transaction-item_id', 'transaction');

        $this->dropTable('{{%transaction}}');
    }
}
