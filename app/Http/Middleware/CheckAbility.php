<?php

namespace App\Http\Middleware;

use Closure;

class CheckAbility
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $right)
    {
        if (!$request->user()->can($right)) return response(["message" => \Lang::get("messages.unathorized"), $request->all()], 403);
        return $next($request);
    }
}
