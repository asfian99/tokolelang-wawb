<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%picture}}`.
 */
class m211102_082710_create_picture_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%picture}}', [
            'id' => $this->primaryKey(),
            'link' => $this->string()->notNull(),
            'item_id' => $this->integer(),
            'user_id' => $this->integer(),
            'created_at' => $this->integer()->notNull()->defaultValue(time()),
            'updated_at' => $this->integer()->notNull()->defaultValue(time()),
        ]);

        $this->createIndex('idx-picture-item_id', 'picture', 'item_id');
        $this->addForeignKey(
            'fk-picture-item_id',
            'picture',
            'item_id',
            'item',
            'id',
            'CASCADE');

        $this->createIndex('idx-picture-user_id', 'picture', 'user_id');
        $this->addForeignKey(
            'fk-picture-user_id',
            'picture',
            'user_id',
            'user',
            'id',
            'CASCADE');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-picture-user_id', 'picture');
        $this->dropIndex('idx-picture-user_id', 'picture');

        $this->dropForeignKey('fk-picture-item_id', 'picture');
        $this->dropIndex('idx-picture-item_id', 'picture');

        $this->dropTable('{{%picture}}');
    }
}
