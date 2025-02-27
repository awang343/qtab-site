'use client';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/scripts/firestore'

export default function Sponsors() {
  const [sponsorLink, setLink] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'images'));
        const documents = querySnapshot.docs;
        const data = Object.fromEntries(documents.map(doc => [doc.id, doc.data()]));
        setLink(data.sponsors.link);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex-grow items-center relative py-20">
      {loading ? <p>Loading...</p> : <img src={sponsorLink} />}
    </div>
  );
}
