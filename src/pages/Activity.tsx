// src/pages/Activity.tsx
import React, { useEffect, useState } from 'react';

const Activity: React.FC = () => {
  const [viewedItems, setViewedItems] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/profile/activity')
      .then((res) => res.json())
      .then((data) => setViewedItems(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-primary font-bold text-2xl mb-4">Your Activity</h2>
      <div>
        {viewedItems.map((item) => (
          <div
            key={item.id}
            className="border p-2 mb-2"
          >
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
