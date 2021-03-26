<?php

use Illuminate\Database\Seeder;
use App\Models\Joblevel;
use App\Traits\ControlsJoblevel;
use Illuminate\Support\Arr;

class JoblevelSeeder extends Seeder
{

    use ControlsJoblevel;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/public/data/system/Joblevels.json';
        $basicjoblevels = file_get_contents($path);
        $basicjoblevels = json_decode($basicjoblevels, true);

        $this->createJoblevels($basicjoblevels);
    }
}
