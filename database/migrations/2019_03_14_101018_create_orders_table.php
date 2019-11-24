<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('product_id');
            $table->double('harga_satuan');
            $table->unsignedInteger('quantity');
            $table->boolean('is_ready')->nullable();
            $table->unsignedInteger('nota_id');

            $table->timestamps();
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
