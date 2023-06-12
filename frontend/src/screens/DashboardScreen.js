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

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/orders/summary', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
          params: {
            startDate: startDate, // Pass the selected start date as a query parameter
            endDate: endDate, // Pass the selected end date as a query parameter
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
    
      fetchData();
    
  }, [userInfo, startDate, endDate]);

  return (
    <div>
      
      <Row>
        <Col md={3}>
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" onChange={handleStartDateChange} />
        </Col>
        <Col md={3}>
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" onChange={handleEndDateChange} />
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
                        {summary.users && summary.users[0]
                          ? summary.users[0].numUsers
                          : 0}
                      </Card.Title>
                      <Card.Text> Users</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {summary.orders && summary.users[0]
                          ? summary.orders[0].numOrders
                          : 0}
                      </Card.Title>
                      <Card.Text> Orders</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        $
                        {summary.orders && summary.users[0]
                          ? summary.orders[0].totalSales.toFixed(2)
                          : 0}
                      </Card.Title>
                      <Card.Text> Total Sales</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        $
                        {summary.orders && summary.users[0]
                          ? summary.orders[0].totalSales.toFixed(2) / 2
                          : 0}
                      </Card.Title>
                      <Card.Text> Revenue</Card.Text>
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
                    data={[
                      ['Date', 'Sales'],
                      ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                    ]}
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
                      data={[
                       ['Date', 'Revenue'],
                       ...summary.dailyOrders.map((x) => [x._id, x.sales / 2]),
                      ]}
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

