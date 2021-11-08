<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%pictures}}`.
 */
class m211107_173525_create_pictures_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%pictures}}', [
            'id' => $this->primaryKey(),
            'link' => $this->string()->notNull(),
            'item_id' => $this->integer()->defaultValue(null),
            'user_id' => $this->integer()->defaultValue(null),
            'created_at' => $this->integer()->notNull()->defaultValue(time()),
            'updated_at' => $this->integer()->notNull()->defaultValue(time()),
        ]);

        $this->createIndex(
            '{{%idx-pictures-user_id}}',
            '{{%pictures}}',
            'user_id'
        );

        // add foreign key for table `{{%users}}`
        $this->addForeignKey(
            '{{%fk-pictures-user_id}}',
            '{{%pictures}}',
            'user_id',
            '{{%users}}',
            'id',
            'CASCADE'
        );

        $this->createIndex(
            '{{%idx-pictures-item_id}}',
            '{{%pictures}}',
            'item_id'
        );

        // add foreign key for table `{{%users}}`
        $this->addForeignKey(
            '{{%fk-pictures-item_id}}',
            '{{%pictures}}',
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
            '{{%fk-pictures-user_id}}',
            '{{%pictures}}'
        );

        $this->dropIndex(
            '{{%idx-pictures-user_id}}',
            '{{%pictures}}'
        );

        $this->dropForeignKey(
            '{{%fk-pictures-item_id}}',
            '{{%pictures}}'
        );

        $this->dropIndex(
            '{{%idx-pictures-item_id}}',
            '{{%pictures}}'
        );

        $this->dropTable('{{%pictures}}');
    }
}
