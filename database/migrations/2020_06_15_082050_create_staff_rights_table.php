<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffRightsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff_rights', function (Blueprint $table) {
            $table->unsignedInteger('staff_id');
            $table->unsignedInteger('right_id');

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('staff_id')->references('id')->on('staff')->onDelete('cascade');
            $table->foreign('right_id')->references('id')->on('rights')->onDelete('cascade');

            //SETTING THE PRIMARY KEYS
            $table->primary(['staff_id', 'right_id']);
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
        Schema::dropIfExists('staff_rights');
    }
}
