import React from "react";
import { Link } from "react-router-dom";
import { getStringParam, setParamValue, t } from "../../utils";

function _list({
    title,
    items,
    dataField = "title",
    itemType,
    linkPattern = null,
    ...props
}) {
    return (
        <>
            <div
                style={{
                    textAlign: "start",
                    padding: "0.5rem",
                    fontWeight: "bold",
                    fontSize: "14px"
                }}
            >
                {title}
            </div>
            <div
                style={{
                    textAlign: "start",
                    padding: "0.5rem",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                {items.length == 0
                    ? t("expressions.noItemsSetFor", {
                          type: t("labels." + itemType)
                      })
                    : items.map((item, index) => {
                          return linkPattern != null ? (
                              <Link
                                  key={index}
                                  to={setParamValue(linkPattern, item)}
                              >
                                  {item[dataField]}
                              </Link>
                          ) : (
                              <p key={index}>{item[dataField]}</p>
                          );
                      })}
            </div>
        </>
    );
}

export default _list;
