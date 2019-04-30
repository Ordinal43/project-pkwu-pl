<?php

use Illuminate\Http\Request;

Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::post('/upload-image', 'ProductController@uploadImage');
Route::post('/products/{product}', 'ProductController@update');



Route::get('/users','UserController@index');
Route::get('users/{user}','UserController@show');
Route::patch('users/{user}','UserController@update');
Route::get('/stands/random', 'StandController@random');
Route::get('/products/random', 'ProductController@random');
Route::get('/nota/{nota}', 'NotaController@show');
Route::get('/orders-all', 'OrderController@all');

Route::resource('/orders', 'OrderController')->except(['all']);
Route::resource('/nota', 'NotaController')->except(['show']);
Route::resource('/stands', 'StandController')->except(['random']);
Route::resource('/products', 'ProductController')->except(['random', 'uploadImage', 'update']);
