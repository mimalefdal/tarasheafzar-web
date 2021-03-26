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
    use ControlsOperations;
    use ControlsRights;
    use ControlsRoles;
    use ControlsPositions;
    use ControlsStaff;


    public function initializeSystemInfo($systemInfo)
    {
        // Define Rights
        if (isset($systemInfo['Rights']))
            $this->createRights($systemInfo['Rights']);

        // Define Roles
        if (isset($systemInfo['Roles']))
            $this->createRoles($systemInfo['Roles']);

        // Add Features
        if (isset($systemInfo['Features']))
            $this->createFeatures($systemInfo['Features']);

        // Add Tools
        if (isset($systemInfo['Tools']))
            $this->createTools($systemInfo['Tools']);

        // Add Operations
        if (isset($systemInfo['Operations']))
            foreach ($systemInfo['Operations'] as $operationSet) {
                $this->createOperations($operationSet['tool'], $operationSet['operations']);
            }

        // Define Positions
        if (isset($systemInfo['Positions']))
            $this->createPositions($systemInfo['Positions']);

        // Define Staff
        if (isset($systemInfo['Staff']))
            $this->createStaff($systemInfo['Staff']);
    }

    public function updateInitializeStatus($status)
    {
        // $path = base_path() . '/public/data/initialize/systemInitialize.json';
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
        $path = base_path() . '/public/data/initialize/systemInitialize.json';
        $systemInitialize = file_get_contents($path);
        $systemInitialize = json_decode($systemInitialize, true);

        return ['file' => $systemInitialize, 'path' => $path];
    }
}
