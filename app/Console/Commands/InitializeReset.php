<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class InitializeReset extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'init:reset';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset initialize files & tables';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $path = base_path() . '/public/data/initialize/systemInitialize.json';
        $systemInitialize = file_get_contents($path);
        $systemInitialize = json_decode($systemInitialize, true);
        foreach ($systemInitialize as $key => $value) {
            $systemInitialize[$key] = false;
        }
        file_put_contents($path, json_encode($systemInitialize));

        Artisan::call('migrate:fresh --force');
        $this->info(Artisan::output());
        Artisan::call('db:seed --force');
        $this->info(Artisan::output());

        $this->info('Initialization reset successfully!');
        return 0;
    }
}
