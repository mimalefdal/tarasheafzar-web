<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRightsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rights', function (Blueprint $table) {
            $table->id();

            $table->string('title')->unique(); // Display Name like Create User
            $table->string('title_fa')->unique();

            $table->string('slug')->unique(); // System-slug lige create-user
            $table->string('description')->nullable(); // Description for right
            $table->boolean('activation'); // activation state of right

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
        Schema::dropIfExists('rights');
    }
}
