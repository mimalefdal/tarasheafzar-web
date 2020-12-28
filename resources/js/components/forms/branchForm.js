import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { t } from "../../utils";
import { useState } from "react";
import apiClient, { apiHeaders, getValues } from "../../services/api";
import { BilingualTextInput, DropDownSelect } from "../form-controls";
import "../../styles/forms.css";
import { SingleColumnFormBase } from ".";

const presets = {
    general: {
        url: "/branchs/define",
        fields: ["all"],
        inputProps: {}
    }
};

export default function Form({ preset = "general", ...props }) {
    // console.log("form", props);
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const [dropdowns, setDropdowns] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        apiClient
            .get("/valuelist", { params: { fields: ["branchtypes"] } })
            .then(response => {
                // console.log(response.data);
                setDropdowns(response.data);
                setReady(true);
            })
            .catch(error => {
                console.log(error.response);
                setReady(true);
            });
    }, []);

    return (
        <SingleColumnFormBase
            submitUrl={presets[preset].url}
            ready={ready}
            handleSubmit={handleSubmit}
            reset={reset}
        >
            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("type")) && (
                <DropDownSelect
                    name="type"
                    ref={register({ required: true })}
                    label={t("labels.branchType")}
                    errors={errors}
                    items={dropdowns.branchtypes}
                    {...presets[preset].inputProps["type"]}
                />
            )}

            {(presets[preset].fields.includes("all") ||
                presets[preset].fields.includes("title")) && (
                <BilingualTextInput
                    name="title"
                    ref={register({ required: true })}
                    errors={errors}
                    {...presets[preset].inputProps["title"]}
                />
            )}
        </SingleColumnFormBase>
    );
}
