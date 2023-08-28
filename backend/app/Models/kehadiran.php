<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class kehadiran extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "kehadirans";

    protected $fillable = [
        'user_id',
        'lat',
        'lng',
        'provinsi',
        'images',
        'waktu_kehadiran',
    ];
}
