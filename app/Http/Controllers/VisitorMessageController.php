<?php

namespace App\Http\Controllers;

use App\Models\VisitorMessage as ModelsVisitorMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Throwable;

class VisitorMessageController extends Controller
{
    //

    public function store(Request $request)
    {

        //

        // sleep(1);

        if (is_numeric($request->get('contact'))) {
            $validatedMessage = $request->validate([
                'sender' => 'required',
                'contact' => 'required|digits:11',
                'message' => 'required'
            ]);
        } else {
            $validatedMessage = $request->validate([
                'sender' => 'required',
                'contact' => 'required|email',
                'message' => 'required'

            ]);
        }

        try {
            $sent = ModelsVisitorMessage::create($validatedMessage);
            return response()->json([
                'message' => Lang::get('terms.message-success'),
                'sender' => $request->sender
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'error' => $e,
                'message' => Lang::get('terms.unknown-response'),
                'request' => $request->all()
            ], 500);
        }
    }
}
