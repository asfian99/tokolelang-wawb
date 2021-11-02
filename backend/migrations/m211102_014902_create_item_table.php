<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%item}}`.
 */
class m211102_014902_create_item_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%item}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(180)->notNull(),
            'description' => $this->text()->notNull(),
            'open_bid' => $this->bigInteger()->notNull(),
            'fundraising' => $this->boolean()->defaultValue(0),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%item}}');
    }
}
