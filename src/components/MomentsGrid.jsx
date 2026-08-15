import React, { useState } from 'react';

const MOMENTS_DATA = [
  {
    id: 1,
    image: '/mem1.png',
    tag: 'OUTING',
    desc: 'Exploring new places and creating memories together.',
    tagColor: '#B76E79',
    tagBg: '#FFF2F4'
  },
  {
    id: 2,
    image: '/mem2.png',
    tag: 'EVERYDAY LIFE',
    desc: 'Everyday joy in the quiet moments.',
    tagColor: '#8E733D',
    tagBg: '#FFFDF0'
  },
  {
    id: 3,
    image: '/cozy_surprise.png',
    tag: 'SURPRISE',
    desc: 'The little things that make us smile.',
    tagColor: '#B76E79',
    tagBg: '#FFF2F4'
  },
];

export default function MomentsGrid() {
  const [filter, setFilter] = useState('All memories');

  return (
    <section className="moments-section" id="moments">
      <div className="moments-header">
        <div className="moments-title-block">
          <h2>Cherished Moments</h2>
          <p>A glimpse into our beautiful journey</p>
        </div>
        <div>
          <select 
            className="moments-filter" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All memories</option>
            <option>Travel</option>
            <option>Date Night</option>
            <option>Surprises</option>
            <option>Everyday</option>
          </select>
        </div>
      </div>

      <div className="moments-grid">
        {MOMENTS_DATA.map((moment) => (
          <div key={moment.id} className="moment-card">
            <div className="moment-img-container">
              <img src={moment.image} alt={moment.desc} loading="lazy" />
              <span 
                className="moment-tag"
                style={{
                  color: moment.tagColor,
                  background: moment.tagBg,
                  border: `1px solid ${moment.tagColor}22`
                }}
              >
                {moment.tag}
              </span>
            </div>
            <div className="moment-info">
              <p className="moment-desc">{moment.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
