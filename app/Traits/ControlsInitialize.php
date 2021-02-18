<?php

namespace App\Traits;

use App\Traits\ControlsFeatures;
use App\Traits\ControlsPositions;
use App\Traits\ControlsRights;
use App\Traits\ControlsRoles;
use App\Traits\ControlsStaff;
use App\Traits\ControlsTools;

/**
 *
 */
trait ControlsInitialize
{
    use ControlsFeatures;
    use ControlsTools;
    use ControlsRights;
    use ControlsRoles;
    use ControlsPositions;
    use ControlsStaff;

    public function initializeSystemInfo($systemInfo)
    {
        // Add Features
        $this->createFeatures($systemInfo['Features']);

        // Add Tools
        $this->createTools($systemInfo['Tools']);

        // Define Rights
        $this->createRights($systemInfo['Rights']);

        // Define Roles
        $this->createRoles($systemInfo['Roles']);

        // Define Positions
        $this->createPositions($systemInfo['Positions']);

        // Define Staff
        $this->createStaff($systemInfo['Staff']);
    }

    public function updateInitializeStatus($status)
    {
        // $path = base_path() . '/public/data/systemInitialize.json';
        // $systemInitialize = file_get_contents($path);
        // $systemInitialize = json_decode($systemInitialize, true);

        $initializeContent = $this->getSystemInitializeContent();

        $systemInitialize = $initializeContent['file'];
        foreach ($status as $key => $value) {
            $systemInitialize[$key] = $value;
        }

        file_put_contents($initializeContent['path'], json_encode($systemInitialize));
    }

    public function getSystemInitializeContent()
    {
        $path = base_path() . '/public/data/systemInitialize.json';
        $systemInitialize = file_get_contents($path);
        $systemInitialize = json_decode($systemInitialize, true);

        return ['file' => $systemInitialize, 'path' => $path];
    }
}
