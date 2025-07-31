import React, { useEffect, useState } from 'react';
import { FaLink, FaTrophy, FaCode } from 'react-icons/fa';

import leetcodeLogo from '../../assets/codingProfiles/leetcode.svg';
import codeforcesLogo from '../../assets/codingProfiles/cf.svg';
import gfgLogo from '../../assets/codingProfiles/gfg.svg';

const platformDetails = {
  leetcode: {
    color: 'from-yellow-400 via-orange-500 to-red-500',
    logo: leetcodeLogo,
    api: (username) => ({
      solvedUrl: `https://leetcode-stats-api.herokuapp.com/${username}`,
      contestUrl: `https://alfa-leetcode-api.onrender.com/${username}/contest`,
    }),
    extractData: async ({ solvedUrl, contestUrl }) => {
      try {
        const [solvedRes, contestRes] = await Promise.all([
          fetch(solvedUrl),
          fetch(contestUrl),
        ]);
        const solvedData = await solvedRes.json();
        const contestData = await contestRes.json();
        return {
          totalSolved: solvedData.totalSolved || 'N/A',
          rating: contestData.contestRating ? Math.round(contestData.contestRating) : 'N/A',
        };
      } catch {
        return { totalSolved: 'Error', rating: 'Error' };
      }
    },
  },
  codeforces: {
    color: 'from-blue-500 via-purple-600 to-indigo-700',
    logo: codeforcesLogo,
    getData: async (username) => {
      try {
        const [infoRes, statusRes] = await Promise.all([
          fetch(`https://codeforces.com/api/user.info?handles=${username}`),
          fetch(`https://codeforces.com/api/user.status?handle=${username}`),
        ]);
        const info = await infoRes.json();
        const status = await statusRes.json();
        const solvedSet = new Set();
        if (status.result) {
          status.result.forEach((sub) => {
            if (sub.verdict === 'OK') {
              solvedSet.add(sub.problem.contestId + '-' + sub.problem.index);
            }
          });
        }
        return {
          totalSolved: solvedSet.size,
          rating: info.result?.[0]?.rating || 'N/A',
        };
      } catch {
        return { totalSolved: 'N/A', rating: 'N/A' };
      }
    },
  },
  geeksforgeeks: {
    color: 'from-green-500 via-emerald-600 to-teal-600',
    logo: gfgLogo,
    getData: async (username) => {
      try {
        const res = await fetch(`/${username}`);
        const data = await res.json();
        return {
          totalSolved: data.totalProblemsSolved || 'N/A',
          rating: data.codingScore || 'N/A',
        };
      } catch {
        return { totalSolved: 'Error', rating: 'N/A' };
      }
    },
  },
};

const TechnicalProfileCard = ({
  platform,
  username,
  profileLink,
  fallbackStats = { totalSolved: 'N/A', rating: 'N/A' },
}) => {
  const [stats, setStats] = useState(fallbackStats);
  const [loading, setLoading] = useState(true);

  const normalizedPlatform = platform.toLowerCase();
  const platformData = platformDetails[normalizedPlatform];

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      if (!platformData) {
        if (isMounted) setLoading(false);
        return;
      }
      try {
        let data;
        if (platformData.getData) {
          data = await platformData.getData(username);
        } else if (platformData.api && platformData.extractData) {
          const urls = platformData.api(username);
          data = await platformData.extractData(urls);
        }
        if (isMounted && data && data.totalSolved !== 'Error') {
          setStats(data);
        }
      } catch {
        // fallback stays
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [username, platform]);

  if (!platformData) return null;

  const ratingLabel = normalizedPlatform === 'geeksforgeeks' ? 'Coding Score' : 'Contest Rating';

  const LoadingPlaceholder = () => (
    <div className="h-8 w-20 bg-white/20 rounded-lg animate-pulse" />
  );

  return (
    <div
      className={`relative bg-gradient-to-br ${platformData.color} p-6 rounded-3xl shadow-xl text-white w-full max-w-sm overflow-hidden group`}
    >

      <div className="cursor-pointer flex items-center justify-between mb-6">
        <div className=" flex items-center gap-3">
          <div className=" w-12 h-12 bg-white/90 rounded-2xl p-2 shadow-lg">
            <img src={platformData.logo} alt={`${platform} logo`} className="w-full h-full object-contain" />
          </div>
          <span className="capitalize text-xl font-bold">{platform}</span>
        </div>
        <a
          href={profileLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl hover:bg-white/30 transition border border-white/30"
        >
          <FaLink size={12} />
          <span>Profile</span>
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="cursor-pointer hover:bg-white/20 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className=" flex items-center gap-2 mb-2">
            <FaCode className="text-white/80" size={16} />
            <p className="md:text-sm text-xs font-medium text-white/80">Solved</p>
          </div>
          {loading ? <LoadingPlaceholder /> : <p className="text-2xl font-bold">{stats.totalSolved}</p>}
        </div>
        <div className="cursor-pointer hover:bg-white/20 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <FaTrophy className="text-yellow-300" size={16} />
            <p className="text-xs md:text-sm font-medium text-white/80">{ratingLabel}</p>
          </div>
          {loading ? <LoadingPlaceholder /> : <p className="text-2xl font-bold">{stats.rating}</p>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TechnicalProfileCard);
