import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  Col, Container, Row } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import config from '../config';

interface BarChartData {
    referralsPlaced: number;
    referralsCompleted: number;
    mdCount: number;
}

const Charts: React.FC = () => {
    const [data, setData] = useState<BarChartData[]>([]);

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/oDdashboardData`);
            setData([response.data]);  
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    return (
        <Container className="dashboard">
            <Row className="mb-4 pt-0">
                <Col xs={12}>
                    <h5 className="text-center mb-3">Bar Chart Overview</h5>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col xs={12}>
                    
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />

                                    <Bar dataKey="referralsPlaced" fill="#ff6f61" />
                                    <Bar dataKey="referralsCompleted" fill="#4caf50" />
                                    <Bar dataKey="mdCount" fill="#2196f3" />
                                </BarChart>
                            </ResponsiveContainer>
                        
                </Col>
            </Row>
        </Container>
    );
};

export default Charts;
