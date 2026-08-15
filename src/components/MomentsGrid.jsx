import React, { useState } from 'react';

const MOMENTS_DATA = [
  {
    id: 1,
    image: '/beach_walk.png',
    tag: 'TRAVEL',
    desc: 'Sunset walks and endless conversations.',
    tagColor: '#B76E79',
    tagBg: '#FFF2F4'
  },
  {
    id: 2,
    image: '/date_night.png',
    tag: 'DATE NIGHT',
    desc: 'Toast to us and many more to come.',
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
  {
    id: 4,
    image: '/cooking_together.png',
    tag: 'EVERYDAY LIFE',
    desc: 'Everyday joy in the quiet moments.',
    tagColor: '#4A4E69',
    tagBg: '#F0F2FA'
  }
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
