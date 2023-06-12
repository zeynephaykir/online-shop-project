import React, { useState, useContext, useEffect, useReducer } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleApplyButtonClick = () => {
    setIsDateRangeSelected(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/orders/summary', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };

    if (isDateRangeSelected) {
      fetchData();
      setIsDateRangeSelected(false);
    }
  }, [userInfo, startDate, endDate, isDateRangeSelected]);

  return (
    <div>
      <Row>
        <Col md={3}>
          <label htmlFor="startDate">Start Date: &nbsp; &nbsp;</label>
          <input type="date" id="startDate" onChange={handleStartDateChange} />
        </Col>
        <Col md={3}>
          <label htmlFor="endDate">End Date: &nbsp; &nbsp;</label>
          <input type="date" id="endDate" onChange={handleEndDateChange} />
        </Col>
        <Col md={2}>
          <Button variant="primary" onClick={handleApplyButtonClick} disabled={!startDate || !endDate}>
            Apply
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h1>Dashboard</h1>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {summary.users && summary.users[0] ? summary.users[0].numUsers : 0}
                      </Card.Title>
                      <Card.Text>Users</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {summary.orders && summary.users[0] ? summary.orders[0].numOrders : 0}
                      </Card.Title>
                      <Card.Text>Orders</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        ${summary.orders && summary.users[0] ? summary.orders[0].totalSales.toFixed(2) : 0}
                      </Card.Title>
                      <Card.Text>Total Sales</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        ${summary.orders && summary.users[0] ? (summary.orders[0].totalSales / 2).toFixed(2) : 0}
                      </Card.Title>
                      <Card.Text>Revenue</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div className="my-3">
                <h2>Sales</h2>
                {summary.dailyOrders.length === 0 ? (
                  <MessageBox>No Sale</MessageBox>
                ) : (
                  <Chart
                    width="100%"
                    height="400px"
                    chartType="AreaChart"
                    loader={<div>Loading Chart...</div>}
                    data={[['Date', 'Sales'], ...summary.dailyOrders.map((x) => [x._id, x.sales])]}
                  />
                )}
              </div>

              <div className="my-3">
                <h2>Revenue</h2>
                {summary.dailyOrders.length === 0 ? (
                  <MessageBox>No Sale</MessageBox>
                ) : (
                  <Chart
                    width="100%"
                    height="400px"
                    chartType="AreaChart"
                    loader={<div>Loading Chart...</div>}
                    data={[['Date', 'Revenue'], ...summary.dailyOrders.map((x) => [x._id, x.sales / 2])]}
                  />
                )}
              </div>

              <div className="my-3">
                <h2>Categories</h2>
                {summary.productCategories.length === 0 ? (
                  <MessageBox>No Category</MessageBox>
                ) : (
                  <Chart
                    width="100%"
                    height="400px"
                    chartType="PieChart"
                    loader={<div>Loading Chart...</div>}
                    data={[
                      ['Category', 'Products'],
                      ...summary.productCategories.map((x) => [x._id, x.count]),
                    ]}
                  />
                )}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
