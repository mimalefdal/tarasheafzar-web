<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->string('personnel_id')->unique();
            $table->string('username')->unique();

            $table->string('firstname');
            $table->string('nickname')->nullable();
            $table->string('lastname');
            $table->string('gender')->nullable();

            $table->string('national_id')->unique()->nullable();
            $table->string('idcert_no')->unique()->nullable();

            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->integer('verification_status')->nullable();

            $table->bigInteger('position_id')->unsigned()->nullable();
            $table->foreign('position_id')->references('id')->on('positions')->onDelete('set null');

            $table->string('password');
            $table->rememberToken();

            $table->boolean('suspended')->nullable();
            $table->timestamp('suspended_at')->nullable();
            $table->bigInteger('suspender_id')->unsigned()->nullable();
            $table->foreign('suspender_id')->references('id')->on('staff')->onDelete('set null');

            $table->softDeletes();
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
        Schema::dropIfExists('staff');
    }
}
