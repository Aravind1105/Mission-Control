import React from 'react';
import { Segment, Header, Icon, Image } from 'semantic-ui-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const TopSellers = ({ data }) => (
  <Segment.Group>
    <Segment>
      <Header as="h3">
        <Icon name="user outline" size="mini" />
        Top Sellers
      </Header>
    </Segment>
    {data ? (
      <Segment className="report-content">
        <div className="report__sub-title">New accounts since 2018</div>
        <div className="report__short-stat">
          <Icon name="angle up" size="big" color="green" />
          <span className="short-stat__value">{data.newAccounts}</span>
          <span className="short-stat__sign">%</span>
          <span className="short-stat__sub-value" style={{ color: 'red' }}>
            {`+${data.failed}% failed`}
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
                  id="topSellersReport"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#7cb122" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7cb122" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#7cb122"
                fill="url(#topSellersReport)"
                fillOpacity={1}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="report__sub-title">Authors</div>
        <div className="authors-list">
          {data.list.map((el, i) => {
            const name = `${el.firstName || ''} ${el.lastName}`.trim();
            return (
              <div key={`${i}`} className="author-item">
                <div className="author__avatar">
                  <Image src={el.avatar} circular alt={name} />
                </div>
                <div className="author__data">
                  <div>{name}</div>
                  <div className="author__label">{`$ ${el.earnings1}`}</div>
                </div>
                <div className="author__value">
                  <Icon name="dollar sign" />
                  {el.earnings1}
                  <Icon
                    name={el.increase ? 'angle up' : 'angle down'}
                    color={el.increase ? 'green' : 'red'}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Segment>
    ) : null}
  </Segment.Group>
);

export default TopSellers;
