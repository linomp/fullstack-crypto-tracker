import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { Card, CardBody, CardTitle, Table } from 'reactstrap'
import * as actions from "../actions/tickValue"


const LatestTicks = ({ fetchLatest, values }) => {

    useEffect(() => {
        fetchLatest()
    }, [fetchLatest])

    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">Latest Values</CardTitle>
                <Table>
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
            </CardBody>
        </Card>
    )
}


const mapStateToProps = state => ({
    values: state.tickValue.latest
})


const mapActionToProps = {
    fetchLatest: actions.fetchLatest
}


export default connect(mapStateToProps, mapActionToProps)(LatestTicks);
