<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff_roles', function (Blueprint $table) {
            $table->unsignedInteger('staff_id');
            $table->unsignedInteger('role_id');

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('staff_id')->references('id')->on('staff')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');

            //SETTING THE PRIMARY KEYS
            $table->primary(['staff_id', 'role_id']);

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
        Schema::dropIfExists('staff_roles');
    }
}
