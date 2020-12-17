import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DeterminateProgress } from ".";
import { t } from "../../utils";

const initialValue = type => {
    return type == "desc" ? 100 : 0;
};

function component({ delay, type = "desc", target, ...props }) {
    let history = useHistory();

    const barUpdateStep = 100;
    const barUpdateScale = delay / barUpdateStep;
    const progressStep = 100 / barUpdateScale;
    const redirectDelay = type == "asc" ? delay : delay + 1000;
    const [progress, setProgress] = useState(initialValue(type));

    setTimeout(() => {
        history.push(target);
    }, redirectDelay);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            console.log(barUpdateStep + "ms");
            if (type == "desc") {
                setProgress(progress => progress - progressStep);
            } else {
                setProgress(progress => progress + progressStep);
            }
        }, barUpdateStep);

        return () => {
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className="redirect">
            <div className="redirect-text">{t("buttons.returnredirtect")}</div>
            <DeterminateProgress value={progress} />
        </div>
    );
}

export default component;
