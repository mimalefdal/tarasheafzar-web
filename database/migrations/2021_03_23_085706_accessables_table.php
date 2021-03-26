<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AccessablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accessables', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('right_id')->unsigned()->index();
            $table->foreign('right_id')->references('id')->on('rights')->onDelete('cascade');

            $table->morphs('accessable');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
