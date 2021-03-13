<?php

namespace App\Console\Commands;

use App\Traits\ControlsInitialize;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class InitializeAll extends Command
{

    use ControlsInitialize;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'init:all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Initialize System Information & Settings';

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
        Artisan::call('init:reset');
        $this->info('Database reset...');

        $path = base_path() . '/public/data/systemInfoTest.json';
        $systemInfo = file_get_contents($path);
        $systemInfo = json_decode($systemInfo, true);

        $this->initializeSystemInfo($systemInfo);

        $path = base_path() . '/public/data/systemInitialize.json';
        $systemInitialize = file_get_contents($path);
        $systemInitialize = json_decode($systemInitialize, true);
        foreach ($systemInitialize as $key => $value) {
            $systemInitialize[$key] = true;
        }
        file_put_contents($path, json_encode($systemInitialize));
        $this->info('Companue Initialized Successfuly!');

        return 0;
    }
}