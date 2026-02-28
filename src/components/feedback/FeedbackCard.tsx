import React from 'react';
import { Card, Badge, Button, Space, Typography } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface FeedbackCardProps {
    feedback: {
        id: number;
        title: string;
        content: string;
        category: string;
        upvotes: number;
    };
    onUpvote: (id: number) => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, onUpvote }) => {
    const getBadgeColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'feature':
                return '#1890ff';
            case 'bug':
                return '#ff4d4f';
            case 'enhancement':
                return '#52c41a';
            default:
                return '#faad14';
        }
    };

    return (
        <Card
            hoverable
            style={{
                marginBottom: 20,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                border: '1px solid #f0f0f0'
            }}
            bodyStyle={{ padding: '24px' }}
            actions={[
                <Button
                    type="text"
                    icon={<LikeOutlined />}
                    onClick={() => onUpvote(feedback.id)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                >
                    <span style={{ fontWeight: 600, marginLeft: 4 }}>{feedback.upvotes}</span>
                    <span style={{ marginLeft: 4 }}>Upvotes</span>
                </Button>
            ]}
        >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <Title level={4} style={{ margin: 0, lineHeight: '1.4', flex: 1 }}>
                        {feedback.title}
                    </Title>
                    <Badge
                        count={`#${feedback.category}`}
                        style={{
                            backgroundColor: getBadgeColor(feedback.category),
                            borderRadius: '4px',
                            fontWeight: 500
                        }}
                    />
                </div>
                <Paragraph
                    style={{
                        color: '#595959',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        margin: 0,
                        whiteSpace: 'pre-wrap'
                    }}
                >
                    {feedback.content}
                </Paragraph>
            </Space>
        </Card>
    );
};

export default FeedbackCard;
