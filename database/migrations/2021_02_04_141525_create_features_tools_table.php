<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeaturesToolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('features_tools', function (Blueprint $table) {
            $table->unsignedInteger('feature_id');
            $table->unsignedInteger('tool_id');

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('feature_id')->references('id')->on('features')->onDelete('cascade');
            $table->foreign('tool_id')->references('id')->on('tools')->onDelete('cascade');

            //SETTING THE PRIMARY KEYS
            $table->primary(['feature_id', 'tool_id']);

            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('features_tools');
    }
}
