<?php

use yii\db\Migration;

/**
 * Class m211117_074550_seed_items_table_2
 */
class m211117_074550_seed_items_table_2 extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->updateFakeItems();
    }

    private function updateFakeItems()
    {
        for ($i = 1; $i < 11; $i++) {
            $this->update(
                'items',
                ['created_at' => time(), 'updated_at' => time()],
                ['id' => $i]
            );
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m211117_074550_seed_items_table_2 cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m211117_074550_seed_items_table_2 cannot be reverted.\n";

        return false;
    }
    */
}
