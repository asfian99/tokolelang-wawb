<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%transactions}}`.
 */
class m211108_173544_create_transactions_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%transactions}}', [
            'id' => $this->primaryKey(),
            'account_id' => $this->integer()->notNull(),
            'item_id' => $this->integer()->notNull(),
            'bid_value' => $this->bigInteger()->notNull(),
            'is_highest' => $this->integer()->defaultValue(0),
            'created_at' => $this->integer(),
            'updated_at' => $this->integer(),
        ]);

        $this->createIndex(
            '{{%idx-transactions-account_id}}',
            '{{%transactions}}',
            'account_id'
        );

        // add foreign key for table `{{%userAccounts}}`
        $this->addForeignKey(
            '{{%fk-transactions-account_id}}',
            '{{%transactions}}',
            'account_id',
            '{{%userAccounts}}',
            'id',
            'CASCADE'
        );

        $this->createIndex(
            '{{%idx-transactions-item_id}}',
            '{{%transactions}}',
            'item_id'
        );

        // add foreign key for table `{{%items}}`
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
            '{{%fk-transactions-account_id}}',
            '{{%transactions}}'
        );

        $this->dropIndex(
            '{{%idx-transactions-account_id}}',
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
