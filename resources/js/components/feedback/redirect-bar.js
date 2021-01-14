import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DeterminateProgress } from ".";
import { t } from "../../utils";

const initialValue = type => {
    return type == "desc" ? 100 : 0;
};

function feedback({ delay, type = "desc", target, ...props }) {
    let history = useHistory();

    const barUpdateSteps = 100;
    const barUpdateScale = delay / barUpdateSteps;
    const progressStep = barUpdateSteps / barUpdateScale;

    const [progress, setProgress] = useState(initialValue(type));
    const [done, SetDone] = useState(false);

    useEffect(() => {
        // console.log({
        //     delay: delay,
        //     barUpdateSteps: barUpdateSteps,
        //     barUpdateScale: barUpdateScale,
        //     progressStep: progressStep
        // });
        let progressInterval = setInterval(() => {
            if (type == "desc") {
                setProgress(progress => progress - progressStep);
            } else {
                setProgress(progress => progress + progressStep);
            }
        }, barUpdateScale);

        return () => {
            clearInterval(progressInterval);
        };
    }, []);

    useEffect(() => {
        if (done) {
            setTimeout(() => {
                history.replace(target);
            }, 500);
        }
    }, [done]);

    useEffect(() => {
        // console.log(progress);
        if (type == "desc") {
            if (progress <= 0) SetDone(true);
        } else {
            if (progress >= 100) SetDone(true);
        }
    }, [progress]);

    return (
        <div className="redirect">
            <div className="redirect-text">{t("buttons.returnredirtect")}</div>
            <DeterminateProgress value={progress} />
        </div>
    );
}

export default feedback;
