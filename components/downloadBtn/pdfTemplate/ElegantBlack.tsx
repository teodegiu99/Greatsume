"use client"
import { useState, useEffect } from "react";
import { getPublicData, getDownloadData } from "@/data/getPublicData";
import { PublicSchema } from "@/schemas";
import * as z from "zod";
import { forwardRef, ForwardedRef } from "react";

const ElegantBlack = forwardRef(
  (
    props: { btnLocation: string; publicLink: string },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [object, setObject] = useState<Partial<z.infer<typeof PublicSchema>>>(
      {}
    );

    useEffect(() => {
      console.log(props.publicLink);
      const fetchData = async () => {
        try {
          if (props.btnLocation === "public" && props.publicLink) {
            const data = await getPublicData(props.publicLink);
            if (data) {
              setObject(data);
              console.log("datahhh", data);
            } else {
              console.log("Error retrieving public data");
            }
          }
          if (props.btnLocation === "nav") {
            const data = await getDownloadData();
            if (data) {
              setObject(data);
              console.log("nav", data);
            } else {
              console.log("Error retrieving nav data");
            }
          }
          
        } catch (error) {
          console.error("Error connecting to db ", error);
        }
      };

      fetchData();
      console.log("DOWNLOAD", object);
    }, [props.btnLocation, props.publicLink]);

    return (
      <div ref={ref}>
        <h1>Contenuto da stampare</h1>
        <h1>Sono negro</h1>
        <h5>{object?.bio}</h5>
      </div>
    );
  }
);

export default ElegantBlack;
