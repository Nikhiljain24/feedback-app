import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, message, Spin, Empty, Button, Modal, Form, Input, Select } from 'antd';
import FeedbackCard from './FeedbackCard';
import FilterBar from './FilterBar';
import { useDispatch } from 'react-redux';
import { setTotalFeedback } from '../../redux/slices/counterSlice';

const { Content } = Layout;
const { Title } = Typography;

interface Feedback {
    id: number;
    title: string;
    content: string;
    category: string;
    upvotes: number;
}

const CATEGORIES = ['All', 'Feature', 'Bug', 'Enhancement'];

const FeedbackFeed: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const fetchFeedbacks = async () => {
        try {
            const response = await fetch('http://localhost:8000/feedbacks');
            const data = await response.json();
            dispatch(setTotalFeedback(data.length));
            setFeedbacks(data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
            message.error('Failed to load feedbacks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    useEffect(() => {
        dispatch(setTotalFeedback(feedbacks.length));
    }, [feedbacks]);

    const handleUpvote = async (id: number) => {
        try {
            await fetch(`http://localhost:8000/feedbacks/${id}/upvote`, { method: 'POST' });
            setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f));
        } catch (error) {
            message.error('Failed to upvote');
        }
    };

    const handleAddFeedback = async (values: any) => {
        try {
            const response = await fetch('http://localhost:8000/feedbacks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, upvotes: 0 }),
            });
            const newFeedback = await response.json();
            setFeedbacks([...feedbacks, newFeedback]);
            setIsModalVisible(false);
            form.resetFields();
            message.success('Feedback added!');
        } catch (error) {
            message.error('Failed to add feedback');
        }
    };

    const filteredFeedbacks = selectedCategory === 'All'
        ? feedbacks
        : feedbacks.filter(f => f.category === selectedCategory);

    return (
        <Content style={{ padding: '24px', maxWidth: 800, margin: '0 auto', width: '100%' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Title level={2}>Feedback Feed</Title>
                    <Button type="primary" onClick={() => setIsModalVisible(true)}>
                        Add Feedback
                    </Button>
                </Space>

                <FilterBar
                    categories={CATEGORIES}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
                ) : filteredFeedbacks.length > 0 ? (
                    filteredFeedbacks.map(f => (
                        <FeedbackCard key={f.id} feedback={f} onUpvote={handleUpvote} />
                    ))
                ) : (
                    <Empty description="No feedback found" />
                )}
            </Space>

            <Modal
                title="Share your feedback"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddFeedback}>
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input placeholder="E.g., Dark Mode" />
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                        <Select>
                            {CATEGORIES.filter(c => c !== 'All').map(c => (
                                <Select.Option key={c} value={c}>{c}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="content" label="Feedback" rules={[{ required: true }]}>
                        <Input.TextArea rows={4} placeholder="Describe your suggestion or bug report..." />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Content>
    );
};

export default FeedbackFeed;
