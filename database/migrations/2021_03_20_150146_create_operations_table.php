<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operations', function (Blueprint $table) {
            $table->id();

            $table->string('slug')->unique()->nullable();
            $table->json('title');
            $table->json('description')->nullable();
            $table->boolean('activation');
            $table->string('state')->default('not set');

            $table->bigInteger('tool_id')->unsigned()->nullable();
            $table->foreign('tool_id')->references('id')->on('tools')->onDelete('cascade');

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
        Schema::dropIfExists('operations');
    }
}
