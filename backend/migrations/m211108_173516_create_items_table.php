<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%items}}`.
 */
class m211108_173516_create_items_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%items}}', [
            'id' => $this->primaryKey(),
            'account_id' => $this->integer()->notNull(),
            'name' => $this->string(180)->notNull(),
            'description' => $this->text(),
            'open_bid' => $this->bigInteger()->notNull(),
            'bid_ratio' => $this->bigInteger(),
            'location' => $this->string(),
            'event' => $this->string(),
            'closing_time' => $this->integer()->notNull(),
            'fundraising' => $this->boolean()->defaultValue(0),
            'is_cancelled' => $this->integer()->notNull()->defaultValue(0),
            'created_at' => $this->integer(),
            'updated_at' => $this->integer(),
        ]);

        $this->createIndex(
            '{{%idx-items-account_id}}',
            '{{%items}}',
            'account_id'
        );

        $this->addForeignKey(
            '{{%fk-items-account_id}}',
            '{{%items}}',
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
        $this->dropForeignKey(
            '{{%fk-items-account_id}}',
            '{{%items}}'
        );

        $this->dropIndex(
            '{{%idx-items-account_id}}',
            '{{%items}}'
        );

        $this->dropTable('{{%items}}');
    }
}
