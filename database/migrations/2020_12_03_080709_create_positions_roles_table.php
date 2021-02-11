<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePositionsRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { {
            Schema::create('positions_roles', function (Blueprint $table) {
                $table->bigInteger('position_id')->unsigned()->index();
                $table->bigInteger('role_id')->unsigned()->index();

                //FOREIGN KEY CONSTRAINTS
                $table->foreign('position_id')->references('id')->on('positions')->onDelete('cascade');
                $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');

                //SETTING THE PRIMARY KEYS
                $table->primary(['position_id', 'role_id']);
                // $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    { {
            Schema::dropIfExists('positions_roles');
        }
    }
}
