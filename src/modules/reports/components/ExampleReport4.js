import React, { PureComponent } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

const data = [
  {
    subject: 'Wraps',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Sushi',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Sandwiches',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Salad',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Snacks',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Candy',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/dpgb3xjq/';

  render() {
    return (
      <RadarChart
        cx={250}
        cy={250}
        outerRadius={150}
        width={500}
        height={500}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
          name="2018"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="2019"
          dataKey="B"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    );
  }
}
