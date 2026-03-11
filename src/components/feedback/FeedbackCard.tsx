import React from 'react';
import { Card, Badge, Button, Space, Typography } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import styles from './FeedbackCard.module.scss';

const { Title, Paragraph } = Typography;

interface FeedbackCardProps {
    feedback: {
        id: number;
        title: string;
        content: string;
        category: any;
        upvotes: number;
    };
    onUpvote: (id: number) => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, onUpvote }) => {
    console.log("feedback ==>", feedback);

    // Safely get category name, handling missing category or object-based category
    const categoryName = typeof feedback.category === 'string'
        ? feedback.category
        : (feedback.category as any)?.name || 'Uncategorized';

    const getBadgeColor = (category: string) => {
        if (!category) return '#faad14';
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
            className={styles.card}
            actions={[
                <Button
                    type="text"
                    icon={<LikeOutlined />}
                    onClick={() => onUpvote(feedback.id)}
                    className={styles.upvoteButton}
                >
                    <span className={styles.upvoteCount}>{feedback.upvotes}</span>
                    <span className={styles.upvoteLabel}>Upvotes</span>
                </Button>
            ]}
        >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div className={styles.cardHeader}>
                    <Title level={4} className={styles.title}>
                        {feedback.title}
                    </Title>
                    <Badge
                        count={`#${categoryName}`}
                        className={styles.badge}
                        style={{
                            backgroundColor: getBadgeColor(categoryName),
                        }}
                    />
                </div>
                <Paragraph className={styles.content}>
                    {feedback.content}
                </Paragraph>
            </Space>
        </Card>
    );
};

export default FeedbackCard;
