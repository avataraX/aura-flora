
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface WaveformChartProps {
    data: { hour: number; freq: number }[];
    color: string;
}

export const WaveformChart: React.FC<WaveformChartProps> = ({ data, color }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <XAxis dataKey="hour" hide={true} />
                <YAxis domain={[0, 100]} hide={true} />
                <Tooltip
                    contentStyle={{
                        background: 'rgba(20, 20, 30, 0.8)',
                        border: '1px solid #4a5568',
                        borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: '#a0aec0' }}
                    itemStyle={{ color: color }}
                />
                <Line 
                    type="monotone" 
                    dataKey="freq" 
                    stroke={color} 
                    strokeWidth={3} 
                    dot={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
