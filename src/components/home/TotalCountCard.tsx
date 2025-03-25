import { totalCountVariants } from '@/constants';
import { Area, AreaConfig } from '@ant-design/plots';
import { Card, Skeleton } from 'antd';
import { Text } from '../shared/Text';

type Props = {
  resource: 'companies' | 'contacts' | 'deals';
  isLoading: boolean;
  totalCount?: number;
};

const DashboardTotalCountCard = ({
  resource,
  isLoading,
  totalCount,
}: Props) => {
  const { primaryColor, secondaryColor, icon, title } =
    totalCountVariants[resource];

  //   const config: AreaConfig = {
  //     data: totalCountVariants[resource].data,
  //     xField: 'index',
  //     yField: 'value',
  //     appendPadding: [1, 0, 0, 0],
  //     padding: 0,
  //     syncViewPadding: true,
  //     autoFit: true,
  //     tooltip: false,
  //     animation: false,
  //     xAxis: false,
  //     yAxis: {
  //       tickCount: 12,
  //       label: {
  //         style: {
  //           stroke: 'transparent'
  //         }
  //       },
  //       grid: {
  //         line: {
  //           style: {
  //             stroke: 'transparent'
  //           }
  //         }
  //       }
  //     },
  //     smooth: true,
  //     line: {
  //       color: primaryColor,
  //     },
  //     areaStyle: () => {
  //       return {
  //         fill: `l(270) 0:#fff 0.2${secondaryColor} 1:${primaryColor}`
  //       }
  //     }
  //   }

  const config: AreaConfig = {
    data: totalCountVariants[resource].data,
    xField: 'index',
    yField: 'value',
    // Use padding instead of appendPadding; adjust as needed.
    padding: 0,
    autoFit: true,
    tooltip: false,
    // Remove syncViewPadding and animation from the top level.
    // Replace xAxis and yAxis with a unified axis configuration:
    axis: {
      x: false,
      y: {
        tickCount: 12,
        label: {
          style: {
            stroke: 'transparent',
          },
        },
        grid: {
          line: {
            style: {
              stroke: 'transparent',
            },
          },
        },
      },
    },
    // Move smooth into the line configuration:
    line: {
      smooth: true,
      color: primaryColor,
      // If you need to disable animations on the line, check if adding
      // an animation option here is supported in your version.
      // animation: false, // Uncomment if supported.
    },
    // Replace areaStyle with the new area configuration:
    area: {
      style: () => ({
        fill: `l(270) 0:#fff 0.2${secondaryColor} 1:${primaryColor}`,
      }),
    },
  };

  return (
    <Card
      style={{ height: '96px', padding: 0 }}
      bodyStyle={{ padding: '8px 8px 8px 12px' }}
      size='small'
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
        }}
      >
        {icon}
        <Text size='md' className='secondary' style={{ marginLeft: '8px' }}>
          {title}
        </Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text
          size='xxxl'
          strong
          style={{
            flex: 1,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            textAlign: 'start',
            marginLeft: '48px',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {isLoading ? (
            <Skeleton.Button
              style={{
                marginTop: '8px',
                width: '74px',
              }}
            />
          ) : (
            totalCount
          )}
        </Text>
        <Area {...config} style={{ width: '50%' }} />
      </div>
    </Card>
  );
};

export default DashboardTotalCountCard;
