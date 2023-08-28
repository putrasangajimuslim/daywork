<?php

namespace App\Http\Controllers\Api\Application;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\kehadiran;

class KehadiranController extends Controller
{
    public function getJsonWaktuKehadiran(Request $request) {

        $lat = $request->input('lat');
        $lng = $request->input('lng');
        $provinsi = $request->input('provinsi');
        $imageData = $request->input('image');

        if (empty($imageData)) {
            return response()->json(['success' => false, 'message' => 'Tidak Ada hasil upload gambar']);
        }
        
        $imageParts = explode(';base64,', $imageData);
        $format = explode('/', $imageParts[0])[1];
        $base64Image = $imageParts[1];
        $subdirectory = 'kehadiran';
        $imageName = $subdirectory . '/' . uniqid() . '.' . $format;

        Storage::disk('public')->put($imageName, base64_decode($base64Image));

        kehadiran::create([
            'lat' => $lat,
            'lng' => $lng,
            'provinsi' => $provinsi,
            'waktu_kehadiran' => date('Y-m-d H:i:s'),
            'images' => $imageName
        ]);

        return response()->json(['success' => true, 'message' => 'Berhasil Rekam Waktu Kehadiran']);
    }
}
