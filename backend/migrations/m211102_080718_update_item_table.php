<?php

use yii\db\Migration;

/**
 * Class m211102_080718_update_item_table
 */
class m211102_080718_update_item_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%item}}', 'closing_time', $this->integer());
        $this->addColumn('{{%item}}', 'user_id', $this->integer());

        $this->createIndex('idx-item-user_id', 'item', 'user_id');
        $this->addForeignKey(
            'fk-item-user_id',
            'item',
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
        $this->dropForeignKey('fk-item-user_id', 'item');
        $this->dropIndex('idx-item-user_id', 'item');

        $this->dropColumn('item', 'closing_time');
        $this->dropColumn('item', 'user_id');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m211102_080718_update_item_table cannot be reverted.\n";

        return false;
    }
    */
}
