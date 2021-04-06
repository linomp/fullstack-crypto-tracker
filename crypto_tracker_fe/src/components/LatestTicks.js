import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { Card, CardBody, CardSubtitle, CardTitle, Table } from 'reactstrap'
import * as actions from "../actions/tickValue"

const updateInterval = 60; // in seconds

const LatestTicks = ({ fetchLatest, fetchHistorical, values }) => {

    const [timeLeft, setTimeLeft] = useState(updateInterval);

    useEffect(() => {
        fetchLatest()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const timer = setTimeout(async () => {

            if (timeLeft - 1 < 1) {
                fetchLatest();
                await fetchHistorical();
                setTimeLeft(updateInterval);
            } else {
                setTimeLeft(timeLeft - 1 > 0 ? timeLeft - 1 : 0);
            }

        }, 1000);
        return () => clearTimeout(timer);
    })

    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">Latest Values</CardTitle>
                <CardSubtitle className="mt-2">
                    {timeLeft} second{timeLeft > 1 ? 's' : ''} until next update
                </CardSubtitle>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Market Symbol</th>
                            <th>Trade Rate</th>
                        </tr>
                    </thead>

                    <tbody>
                        {values.map((market, i) =>
                            <tr key={i}>
                                <td>{market.symbol}</td>
                                <td>{market.lastTradeRate}</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
                {(values.length === 0) && <span>Retrieving data...</span>}
            </CardBody>
        </Card>
    )
}


const mapStateToProps = state => ({
    values: state.tickValue.latest
})


const mapActionToProps = {
    fetchLatest: actions.fetchLatest,
    fetchHistorical: actions.fetchHistorical,
}


export default connect(mapStateToProps, mapActionToProps)(LatestTicks);
