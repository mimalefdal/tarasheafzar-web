import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { t } from "../../utils";
import { useState } from "react";
import apiClient, { apiHeaders, getValues } from "../../services/api";
import { BilingualTextInput, DropDownSelect } from "../form-controls";
import "../../styles/forms.css";
import { SingleColumnFormBase } from ".";

export default function Form({ preset = "general", ...props }) {
    // props.item && console.log("form", props);

    const presets = {
        general: {
            url: "/branch/define",
            submitValue: t("labels.submit-add"),
            fields: ["all"],
            inputProps: {}
        },
        edit: preset == "edit" && {
            url: "/branch/update",
            submitValue: t("labels.submit-update"),
            fields: ["all"],
            inputProps: {
                type: {
                    // readonly: true,
                    itemValue: props.item.type_object
                },
                title: {
                    itemValue: {
                        local: props.item.title,
                        en: props.item.title_en
                    }
                }
            }
        }
    };

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
            submitValue={presets[preset].submitValue}
            handleSubmit={handleSubmit}
            ready={ready}
            reset={reset}
            item={props.item}
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
