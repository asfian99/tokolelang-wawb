<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%items}}`.
 */
class m211107_173516_create_items_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%items}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(180)->notNull(),
            'description' => $this->text()->notNull(),
            'open_bid' => $this->bigInteger()->notNull(),
            'closing_time' => $this->integer()->notNull(),
            'fundraising' => $this->boolean()->defaultValue(0),
            'user_id' => $this->integer()->notNull(),
            'created_at' => $this->integer()->notNull()->defaultValue(time()),
            'updated_at' => $this->integer()->notNull()->defaultValue(time()),
        ]);

        $this->createIndex(
            '{{%idx-items-user_id}}',
            '{{%items}}',
            'user_id'
        );

        // add foreign key for table `{{%users}}`
        $this->addForeignKey(
            '{{%fk-items-user_id}}',
            '{{%items}}',
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
            '{{%fk-items-user_id}}',
            '{{%items}}'
        );

        $this->dropIndex(
            '{{%idx-items-user_id}}',
            '{{%items}}'
        );

        $this->dropTable('{{%items}}');
    }
}
