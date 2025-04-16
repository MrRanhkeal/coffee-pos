//import React from 'react'
import { Col, Row } from 'antd'
function HomeGride({ data = [] }) {
    <Row>
        {data?.map((item, index) => (
            <Col span={6} key={index}>
                <div style={{
                    backgroundColor: "#EEE",
                    padding: 15,
                    margin: 5,
                    borderRadius: 10,
                    minHeight: 100,
                }}
                >
                    <div style={{ fontSize: 26, fontWeight: "bold" }}>{item.name}</div>
                    {item.summary && Object.keys(item.summary).map((key, index) => (
                        <div key={index}>
                            <div>
                                {key} :{" "}
                                <label className="text-green-500 font-bold">
                                    {item.summary[key] || 0}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </Col>
        ))}
    </Row>
}

export default HomeGride