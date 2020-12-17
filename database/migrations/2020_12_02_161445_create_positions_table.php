<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePositionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('positions', function (Blueprint $table) {
            $table->id();

            $table->string('title')->unique();
            $table->string('title_fa')->unique();
            $table->string('slug')->unique();
            $table->integer('recruit_capacity');

            $table->nullableMorphs('hasposition');

            $table->string('joblevel_id')->nullable();
            $table->foreign('joblevel_id')->references('id')->on('job_levels')->onDelete('cascade');

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
        Schema::dropIfExists('positions');
    }
}
