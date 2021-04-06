import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { Input, Form, FormGroup, Label, Button } from 'reactstrap'
import * as actions from "../actions/tickValue"

import Chart from "react-apexcharts";

import { mapHistoricalDataDict } from "../actions/mappers"

const Historical = ({ fetchHistorical, values, historicalHoursBack, updateInterval }) => {

    useEffect(() => {
        fetchHistorical();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historicalHoursBack])

    const mapped = mapHistoricalDataDict(values);

    return (
        <div>
            <h4>Closing price in the last {historicalHoursBack} hours</h4>

            <Chart
                options={{
                    chart: {
                        id: "line"
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 2
                    },
                    grid: {
                        xaxis: {
                            lines: {
                                show: true
                            }
                        }
                    },
                    xaxis: {
                        labels: {
                            show: false
                        }
                    }
                }}
                series={
                    mapped
                }
                type="line"
                height="480"

            />

            <div className="mt-4">
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    const value = e.target["hours"].value
                    if (!parseInt(value) || value < 2 || value > 744) {
                        window.alert("Input must be a number between 2 and 744")
                        return
                    }
                    updateInterval(value)
                }}>
                    <FormGroup>
                        <Label for="hours">Edit Interval:</Label>
                        <Input type="hours" name="hours" id="hours" placeholder={historicalHoursBack} />
                    </FormGroup>
                    <Button>Save</Button>
                </Form>

            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    values: state.tickValue.historical,
    historicalHoursBack: state.tickValue.historicalHoursBack
})


const mapActionToProps = {
    fetchHistorical: actions.fetchHistorical,
    updateInterval: actions.updateInterval
}


export default connect(mapStateToProps, mapActionToProps)(Historical);
