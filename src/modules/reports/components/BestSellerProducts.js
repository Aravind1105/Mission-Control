import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

import colorGenerator from 'lib/colorGenerator';
import CircleChart from 'modules/shared/components/CircleChart';

const colors = Array.from({ length: 5 }).map(() => colorGenerator());

const TopSellers = ({ data }) => (
  <Segment.Group>
    <Segment>
      <Header as="h3">
        <Icon name="laptop" size="mini" />
        Best Selling Products
      </Header>
    </Segment>

    {data ? (
      <Segment className="report-content">
        <div className="report__sub-title">{data.name}</div>
        <div className="report__short-stat">
          <Icon name="dot circle" size="big" color="orange" />
          <span className="short-stat__value">{`$${data.price}`}</span>
          <span className="short-stat__sign" />
          <span className="short-stat__sub-value" style={{ color: 'green' }}>
            {`+${data.quantity}`}
          </span>
        </div>

        <div style={{ height: '200px', margin: '0 -1rem' }}>
          <ResponsiveContainer>
            <AreaChart
              data={data.statistic}
              margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="bestSellingProd"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#F2711C" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F2711C" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#F2711C"
                fill="url(#bestSellingProd)"
                fillOpacity={1}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="report__sub-title">Top performing</div>
        <div className="authors-list">
          {data.list.map((el, i) => (
            <div key={`${i}`} className="author-item">
              <div className="author__avatar">
                <CircleChart
                  size={54}
                  percent={el.percent}
                  progressColor={colors[i % 5]}
                  textColor="black"
                />
              </div>
              <div className="author__data">
                <div>{el.name}</div>
                <div className="author__label">{`$ ${el.price1}`}</div>
              </div>
              <div className="author__value">
                <Icon name="dollar sign" />
                {el.price2}
                <Icon
                  name={el.increase ? 'angle up' : 'angle down'}
                  color={el.increase ? 'green' : 'red'}
                />
              </div>
            </div>
          ))}
        </div>
      </Segment>
    ) : null}
  </Segment.Group>
);

export default TopSellers;
