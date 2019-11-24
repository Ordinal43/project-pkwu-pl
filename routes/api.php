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
Route::get('/orders-all', 'OrderController@all');
Route::patch('/cancel/{order}', 'OrderController@canceled');
Route::patch('/ready/{order}', 'OrderController@ready');
Route::get('/orders-true', 'OrderController@indexTrue');
Route::get('/orders-false', 'OrderController@indexFalse');
Route::get('/orders-null', 'OrderController@indexNull');

Route::resource('/orders', 'OrderController')->except(['all','indexTrue','indexFalse','indexNull','canceled', 'ready']);
Route::resource('/nota', 'NotaController')->except(['show']);
Route::resource('/stands', 'StandController')->except(['random']);
Route::resource('/products', 'ProductController')->except(['random', 'uploadImage', 'update']);
