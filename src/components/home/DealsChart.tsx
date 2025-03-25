/* eslint-disable @typescript-eslint/no-explicit-any */
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries';
import { DashboardDealsChartQuery } from '@/graphql/types';
import { mapDealsData } from '@/utils/helpers';
import { DollarOutlined } from '@ant-design/icons';
import { Area, AreaConfig } from '@ant-design/plots';
import { useList } from '@refinedev/core';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { Card } from 'antd';
import React from 'react';
import { Text } from '../shared/Text';

const DealsChart = () => {
  const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource: 'dealStages',
    filters: [
      {
        field: 'title',
        operator: 'in',
        value: ['WON', 'LOST'],
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
  });

  const dealData = React.useMemo(() => {
    return mapDealsData(data?.data);
  }, [data?.data]);

  const config: AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    stack: false,
    seriesField: 'state',
    // animation: true, // Removed to match the AreaConfig type
    // startOnZero: false, // Removed to match the AreaConfig type
    // meta: {
    //   value: { min: 0 },
    // },
    // smooth: true, // Removed to match the AreaConfig type
    line: { smooth: true },
    legend: {
      offsetY: -6,
    },
    // yAxis: {
    //   tickCount: 4,
    //   label: {
    //     formatter: (v: string) => `$${Number(v) / 1000}k`,
    //   },
    // },
    axis: {
      y: {
        tickCount: 4,
        label: {
          formatter: (v: string) => `$${Number(v) / 1000}k`,
        },
        // To force the axis to start at zero, you can set the minimum value:
        min: 0,
      },
    },
    tooltip: {
      formatter: (data: { state: any; value: any }) => ({
        name: data.state,
        value: `$${Number(data.value) / 1000}k`,
      }),
    },
  };

  return (
    <Card
      style={{ height: '100%' }}
      headStyle={{ padding: '8px 16px' }}
      bodyStyle={{ padding: '24px 24px 0 24px' }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <DollarOutlined />
          <Text size='sm' style={{ marginLeft: '0.5rem' }}>
            Deals
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};

export default DealsChart;
