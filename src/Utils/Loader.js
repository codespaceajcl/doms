import React from "react";
import { Grid } from "react-loader-spinner";

const Loader = ({color}) => {
    return (
        <div className="d-flex justify-content-center align-items-center my-3">
            <Grid
                height="40"
                width="40"
                color={color ? color : "#003A70"}
                ariaLabel="grid-loading"
                radius="12"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};
export default Loader;