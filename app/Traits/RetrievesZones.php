<?php

namespace App\Traits;

/**
 * Retrieve Zone covered objects for an staff
 */
trait RetrievesZones
{
    public function staffZone($mode = 'all')
    {
        $targetCrew = collect([]);
        switch ($mode) {
            case 'all':
                $targetCrew = $this->holder()->deepCrew();
                // $targetCrew = $targetCrew->sortBy('idcert_no');
                break;

            case 'direct':
                $targetCrew = $this->holder()->directCrew();
                break;

            case 'subset':
                $targetCrew = $this->holder()->subsetCrew();
                break;
            default:
                # code...
                break;
        }
        // return $targetCrew;
        $staffZone = $targetCrew->filter(function ($value, $key) {
            return $value->position->joblevel->priority > $this->position->joblevel->priority;
        });


        return $staffZone;
    }

    public function positionsZone($mode = 'all')
    {
        $targetPositions = collect([]);

        switch ($mode) {

            case 'all':
                $targetPositions = $this->holder()->deepPositions();
                break;

            case 'direct':
                $targetPositions = $this->holder()->directPositions();
                break;

            case 'subset':
                $targetPositions = $this->holder()->subsetPositions();

                break;
            default:
                # code...
                break;
        }
        // return $targetPositions;
        $positionsZone = $targetPositions->filter(function ($value, $key) {
            return $value->joblevel->priority > $this->position->joblevel->priority;
        });

        return $positionsZone;
    }
}
