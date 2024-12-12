import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import config from '../config';

interface PieChartData {
    name: string;
    value: number;
}

const PieCharts: React.FC = () => {
    const [data, setData] = useState<PieChartData[]>([]);

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/oDdashboardData`);

            // Transform the data to match the format expected by the Pie chart
            const pieData = [
                { name: 'Referrals Placed', value: response.data.referralsPlaced },
                { name: 'Referrals Completed', value: response.data.referralsCompleted },
                { name: 'MD Count', value: response.data.mdCount }
            ];
            setData(pieData);  
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    return (
        <Container className="dashboard">
            <Row className="mb-4 pt-0">
                <Col xs={12}>
                    <h5 className="text-center mb-3">Pie Chart Overview</h5>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col xs={12}>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Tooltip />
                            <Legend />
                            <Pie 
                                data={data} 
                                dataKey="value" 
                                nameKey="name" 
                                cx="50%" 
                                cy="50%" 
                                outerRadius={150} 
                                fill="#8884d8"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? "#ff6f61" : index === 1 ? "#4caf50" : "#2196f3"} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default PieCharts;
