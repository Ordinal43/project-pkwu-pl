<?php

use Illuminate\Http\Request;
//Register Login
Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');

//Upload Image
Route::post('/upload-image', 'ProductController@uploadImage');
//UpdateProduct
Route::post('/products/{product}', 'ProductController@update');


//Users
Route::get('/users','UserController@index');
Route::get('users/{user}','UserController@show');
Route::patch('users/{user}','UserController@update');
//Random API
Route::get('/stands/random', 'StandController@random');
Route::get('/products/random', 'ProductController@random');

//Nota&Order
Route::get('/nota/{nota}', 'NotaController@show');
Route::patch('/cancel/{order}', 'OrderController@canceled');
Route::patch('/ready/{order}', 'OrderController@ready');
Route::get('/orders-all', 'OrderController@all'); //Return All Statement (True/ False/ Null)
Route::get('/orders-all-true', 'OrderController@allTrue'); //Return All True
Route::get('/orders-all-false', 'OrderController@allFalse'); //Return All False
Route::get('/orders-all-null', 'OrderController@allNull'); //Return All Null
Route::get('/orders-true', 'OrderController@indexTrue'); //Return is_ready = True with stands param
Route::get('/orders-false', 'OrderController@indexFalse'); //Return is_ready = False with stands param
Route::get('/orders-null', 'OrderController@indexNull'); //Return is_ready = Null with stands param

Route::resource('/orders', 'OrderController')->except(['allNull','allFalse','allTrue','all','indexTrue','indexFalse','indexNull','canceled', 'ready']);
Route::resource('/nota', 'NotaController')->except(['show']);
Route::resource('/stands', 'StandController')->except(['random']);
Route::resource('/products', 'ProductController')->except(['random', 'uploadImage', 'update']);
